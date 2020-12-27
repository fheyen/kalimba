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
                midi: true,
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
        // TODO: move to state
        this.notes = [];
        // Player
        this.player = new Player()
            .onTimeChange(time => this.setState({ currentPlayerTime: time }))
            .setVolume(3);
    }

    componentDidMount() {
        // Look for notes in the URL
        const sharedNotes = this.parseShareUrl();
        if (sharedNotes && sharedNotes.length) {
            console.log(sharedNotes);
            this.notes = sharedNotes;
        }

        let source = document.getElementById('filereader');
        console.log(source);

        const _this = this;
        MidiParser.parse(source, function (obj) {
            try {
                const parsed = preprocessMidiFileData(obj);
                const parts = parsed.parts.map(d => d.noteObjs);
                console.log(parts);

                _this.setState({ input: { ..._this.state.input, midiFileData: parts } });
            } catch (e) {
                alert('Invalid MIDI file or wrong format!');
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.input !== prevState.input) {
            console.log('input update');
            // TODO: update notes
            const notes = this.getNotes();
            this.setState({ notes });
        }
        // if (this.state.output !== prevState.output) {
        //     console.log('output update');
        //     // TODO: update output
        //     this.updateTab();
        // }
    }


    getNotes = () => {
        const { input } = this.state;
        const { midi, midiFileData, track, transpose, textInput } = input;
        let notes = [];
        if (midi) {
            if (midiFileData.length - 1 >= track) {
                notes = midiFileData[track];
                if (transpose !== 0) {
                    notes = new NoteArray(notes).transpose(transpose * 12).getNotes();
                }
            }
        } else {
            const letterFormat = Lamellophone.convertNumbersToLetters(textInput, this.numberLetterMap);
            notes = Lamellophone.convertTabToNotes(letterFormat, this.tuning, 120);
        }
        // console.log(notes);
        this.notes = notes;
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

    parseShareUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('notes');
        if (!param) {
            return [];
        }
        const uri = param.split('=');
        if (uri.length < 2) {
            return [];
        }
        let parsed;
        try {
            parsed = JSON.parse(uri[1]);
            if (!parsed) {
                return [];
            }
        } catch (e) {
            console.log(e);
            return [];
        }
        return new NoteArray(parsed).getNotes();
    }

    copyShareUrl = () => {
        const uri = encodeURI(JSON.stringify(this.notes));
        const url = `${window.location.href}?notes=${uri}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('Text copied to clipboard');
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
        const { viewWidth, viewHeight, input, output, notes } = this.state;
        const { midi, midiFileData, track, transpose } = input;
        const { useHtml, letter } = output;
        if (this.mounted) {
            this.updateTab();
        } else {
            this.mounted = true;
        }
        console.log(this.state);

        // HTML
        return (
            <div
                className='View KalimbaTab'
                style={{ gridArea: `span ${this.state.rowSpan} / span ${this.state.columnSpan}` }}
            >
                <div className='control'>
                    <div>
                        <label>
                            Input:
                            <button onClick={() => this.setState({ notes: [], input: { ...input, midi: !midi } })}>
                                {midi ? 'MIDI' : 'Text'}
                            </button>
                        </label>
                        {midi &&
                            <div>
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
                                        onChange={e => this.setState({ input: { ...input, track: +e.target.value } })}
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
                                        min='-4'
                                        max='4'
                                        step='1'
                                        onChange={e => this.setState({ input: { ...input, transpose: +e.target.value } })}
                                        disabled={midiFileData.length === 0}
                                    />
                                </label>
                            </div>
                        }
                        <textarea
                            ref={n => this.textArea = n}
                            style={{
                                width: viewWidth - 60,
                                height: viewHeight / 6,
                                display: midi ? 'none' : 'block'
                            }}
                            placeholder='Write or paste a kalimba tab in letter or number notation here'
                            onChange={e => this.setState({ input: { ...input, textInput: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label>
                            Output:
                            <button onClick={() => this.setState({ output: { ...output, useHtml: !useHtml } })}>
                                {useHtml ? 'HTML' : 'Text'}
                            </button>
                        </label>
                        <label>
                            Note symbols:
                            <button onClick={() => this.setState({ output: { ...output, letter: !letter } })}>
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
                        <button onClick={this.copyShareUrl}>
                            Copy share URL
                        </button>
                    </div>
                </div>
                <div
                    className='tab'
                    ref={n => this.tab = n}
                    style={{
                        width: '100%',
                        height: viewHeight / 3,
                    }}
                />
                <KalimbaRoll
                    name='Kalimba Roll'
                    viewSize={{
                        outerWidth: this.props.viewSize.outerWidth - 60,
                        outerHeight: viewHeight / 2
                    }}
                    tuning={this.tuning}
                    data={notes}
                    currentPlayerTime={this.state.currentPlayerTime}
                />
            </div>
        );
    }
}
