import React from 'react';
import View from '../lib/ui/View';
import { Lamellophone, Utils, NoteArray } from 'musicvis-lib';
import '../style/KalimbaTab.css';
import KalimbaRoll from './KalimbaRoll';
import Player from '../lib/Player';
import MidiParser from 'midi-parser-js';
import { preprocessMidiFileData } from 'musicvis-lib';

export default class KalimbaTab extends View {

    constructor(props) {
        const margin = { top: 35, right: 20, bottom: 40, left: 55 };
        super(props, margin);
        this.state = {
            ...this.state,
            input: {
                midi: false,
                track: 0,
                transpose: 0,
                midiFileData: [],
                textInput: ''
            },
            output: {
                useHtml: true,
                letter: true,
            },
            notes: [],
            playerSpeed: 1,
            currentPlayerTime: 0
        };
        this.tuning = Lamellophone.lamellophoneTunings.get('Kalimba').get('17 C Major');
        this.numberLetterMap = new Map([
            [1, 'C'],
            [2, 'D'],
            [3, 'E'],
            [4, 'F'],
            [5, 'G'],
            [6, 'A'],
            [7, 'B'],
        ]);
        this.mounted = false;
        // Player
        this.player = new Player()
            .onTimeChange(time => this.setState({ currentPlayerTime: time }))
            .setVolume(3);
        this.example = `A B C a b c abc \n1 2 3 \nC° C' C* \n(C E G) \n(C° E G)`;
    }

    componentDidMount() {
        // Look for notes in the URL
        const sharedNotes = this.parseShareUrl();
        if (sharedNotes && sharedNotes.length) {
            console.log(sharedNotes);
            this.setState({ notes: sharedNotes })
        }
        const source = document.getElementById('filereader');
        MidiParser.parse(source, (obj) => {
            try {
                const parsed = preprocessMidiFileData(obj);
                const parts = parsed.parts.map(d => d.noteObjs);
                this.setState({
                    input: {
                        ...this.state.input,
                        midiFileData: parts
                    }
                });
            } catch (e) {
                alert('Invalid MIDI file or wrong format!');
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.input !== prevState.input) {
            const notes = this.getNotes();
            this.setState({ notes });
        }
    }

    showExample = () => {
        this.textArea.value = this.example;
        this.setState({
            input: {
                ...this.state.input,
                textInput: this.example
            }
        });
    }


    getNotes = () => {
        const { input } = this.state;
        const { midi, midiFileData, track, transpose, textInput } = input;
        let notes = [];
        if (midi) {
            if (midiFileData.length - 1 >= track) {
                notes = midiFileData[track];
                if (transpose !== 0) {
                    notes = new NoteArray(notes).transpose(transpose).getNotes();
                }
            }
        } else {
            const letterFormat = Lamellophone.convertNumbersToLetters(textInput, this.numberLetterMap);
            notes = Lamellophone.convertTabToNotes(letterFormat, this.tuning, 120);
        }
        return notes;
    }

    updateTab = () => {
        const { output, notes } = this.state;
        const { useHtml, letter } = output;
        if (!this.tab) { return; }
        if (useHtml) {
            this.tab.innerHTML = Lamellophone.convertNotesToHtmlTab(
                notes,
                this.tuning,
                letter ? 'letter' : 'number',
                0.1,
                Utils.noteColorFromPitch
            );
        } else {
            this.tab.innerText = Lamellophone.convertNotesToTab(
                notes,
                this.tuning,
                letter ? 'letter' : 'number',
                0.1
            );
        }
    }

    /**
     * @todo broken for some cases
     */
    parseShareUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('notes');
        if (!param) {
            return [];
        }
        let parsed;
        try {
            parsed = JSON.parse(param);
            if (!parsed) {
                return [];
            }
        } catch (e) {
            console.warn(e);
            console.log(param);
            return [];
        }
        return new NoteArray(parsed).getNotes();
    }

    copyShareUrl = () => {
        const { notes } = this.state;
        const uri = encodeURI(JSON.stringify(notes));
        const location = window.location.href.split('?')[0];
        const url = `${location}?notes=${uri}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Share URL copied to clipboard!');
            })
            .catch(err => {
                alert('Error in copying text: ', err);
            });
    }

    play = () => {
        const { playerSpeed, notes } = this.state;
        this.player.playNotes(notes, 'kalimba', 0, undefined, playerSpeed);
    }
    pauseOrResume = () => {
        this.player.pauseOrResume();
    }
    stop = () => {
        this.player.stop();
    }


    render() {
        const { input, output, notes } = this.state;
        const { midi, midiFileData, transpose } = input;
        const { useHtml, letter } = output;
        if (this.mounted) {
            this.updateTab();
        } else {
            this.mounted = true;
        }

        // HTML
        return (
            <div className='View KalimbaTab'>
                <div className='control'>
                    <div>
                        <label>
                            Input:
                            <button onClick={() => this.setState({ notes: [], input: { ...input, midi: !midi } })}>
                                {midi ? 'MIDI' : 'Text'}
                            </button>
                        </label>
                        {!midi &&
                            <label>
                                <button onClick={this.showExample}>
                                    Show example
                                </button>
                            </label>
                        }
                        <div
                            style={{ display: midi ? 'block' : 'none' }}
                        >
                            <label>
                                Open a MIDI file
                                    <input
                                    className='fileInput'
                                    type='file'
                                    id='filereader'
                                    accept='.midi,.mid'
                                    style={{ display: midi ? 'inline-block' : 'none' }}
                                />
                            </label>
                            <label>
                                Track:
                                    <select
                                    onChange={e => this.setState({
                                        input: { ...input, track: +e.target.value }
                                    })}
                                    disabled={midiFileData.length === 0}
                                >
                                    {midiFileData.map((d, i) => (
                                        <option
                                            key={i}
                                            value={i}
                                        >
                                            Track {i} ({d.length} notes)
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Transpose:
                                    <input
                                    type='number'
                                    defaultValue={transpose}
                                    min='-127'
                                    max='127'
                                    step='1'
                                    onChange={e => this.setState({
                                        input: { ...input, transpose: +e.target.value }
                                    })}
                                    disabled={midiFileData.length === 0}
                                />
                            </label>
                        </div>
                        <textarea
                            ref={n => this.textArea = n}
                            style={{ display: midi ? 'none' : 'block' }}
                            placeholder='Write or paste a kalimba tab in letter or number notation here'
                            onChange={e => this.setState({
                                input: { ...input, textInput: e.target.value }
                            })}
                        />
                    </div>
                    <div>
                        <label>
                            Output:
                            <button onClick={() => this.setState({
                            output: { ...output, useHtml: !useHtml }
                        })}>
                                {useHtml ? 'Fancy' : 'Text'}
                            </button>
                        </label>
                        <label>
                            Note symbols:
                            <button onClick={() => this.setState({
                            output: { ...output, letter: !letter }
                        })}>
                                {letter ? 'Letter' : 'Number'}
                            </button>
                        </label>
                    </div>
                    <div>
                        Player:
                        <button onClick={this.play}>play</button>
                        <button onClick={this.pauseOrResume}>pause</button>
                        <button onClick={this.stop}>stop</button>
                        <input
                            type='number'
                            min='0.1'
                            max='2'
                            defaultValue='1'
                            step='0.1'
                            onChange={e => this.setState({ playerSpeed: +e.target.value })}
                        />
                    </div>
                    <div>
                        <button
                            title='Copies the share URL to your clipboard'
                            onClick={this.copyShareUrl}
                        >
                            Share
                        </button>
                    </div>
                </div>
                <div
                    className='tab'
                    ref={n => this.tab = n}
                />
                <KalimbaRoll
                    name='Kalimba Roll'
                    viewSize={{
                        outerWidth: this.props.viewSize.outerWidth - 60,
                        outerHeight: 800
                    }}
                    tuning={this.tuning}
                    data={notes}
                    currentPlayerTime={this.state.currentPlayerTime}
                />
            </div>
        );
    }
}
