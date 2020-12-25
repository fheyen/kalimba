import React from 'react';
import View from '../lib/ui/View';
import { Lamellophone, Utils, NoteArray } from 'musicvis-lib';
import '../style/KalimbaTab.css';
import KalimbaRoll from './KalimbaRoll';



export default class KalimbaTab extends View {

    constructor(props) {
        const margin = { top: 35, right: 20, bottom: 40, left: 55 };
        super(props, margin);
        this.state = {
            ...this.state,
            useHtml: true,
            letter: true,
            midi: false,
            track: 0,
            transpose: 0,
            notes: []
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
    }


    getNotes = () => {
        const { midi, track, transpose } = this.state;
        const { midiFileData } = this.props;

        let notes = [];

        if (midi) {
            if (midiFileData.length - 1 >= track) {
                notes = midiFileData[track];
                if (transpose !== 0) {
                    notes = new NoteArray(notes).transpose(transpose * 12).getNotes();
                }
            }
        } else {
            const text = this.textArea ? this.textArea.value : '';
            const letterFormat = Lamellophone.convertNumbersToLetters(text, this.numberLetterMap);
            notes = Lamellophone.convertTabToNotes(letterFormat, this.tuning, 120);
        }

        console.log(notes);
        return notes;
    }

    updateTab = () => {

        if (!this.tab) { return; }
        const notes = this.getNotes();


        const { useHtml, letter } = this.state;
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


    render() {
        const { viewWidth, viewHeight, midi, track, transpose, useHtml, letter } = this.state;
        const { midiFileData } = this.props;
        let notes = [];
        if (this.mounted) {
            notes = this.getNotes();
            this.updateTab();
        } else {
            this.mounted = true;
        }
        console.log(this.textArea?.value);

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
                            <button onClick={() => this.setState({ midi: !midi })}>
                                {midi ? 'MIDI' : 'Text'}
                            </button>
                        </label>
                        {midi &&
                            <label>
                                Track:
                                <select onChange={e => this.setState({ track: +e.target.value })}>
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
                        }
                        {midi &&
                            <label>
                                Transpose:
                                <input
                                    type='number'
                                    defaultValue={transpose}
                                    min='-4'
                                    max='4'
                                    step='1'
                                    onChange={e => this.setState({ transpose: +e.target.value })}
                                />
                            </label>
                        }
                    </div>
                    <div>
                        <label>
                            Output:
                            <button onClick={() => this.setState({ useHtml: !useHtml })}>
                                {useHtml ? 'HTML' : 'Text'}
                            </button>
                        </label>
                        <label>
                            Note symbols:
                            <button onClick={() => this.setState({ letter: !letter })}>
                                {letter ? 'Letter' : 'Number'}
                            </button>
                        </label>
                    </div>
                </div>
                <input
                    className='fileInput'
                    type='file'
                    id='filereader'
                    style={{ display: midi ? 'block' : 'none' }}
                />
                <textarea
                    ref={n => this.textArea = n}
                    style={{
                        width: viewWidth - 60,
                        height: viewHeight / 4,
                        display: midi ? 'none' : 'block'
                    }}
                    placeholder='Write or paste a kalimba tab in letter or number notation here'
                    onChange={this.updateTab}
                />
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
                    data={[notes]}
                    selectedTrack={track}
                    currentPlayerTime={0}
                />
            </div>
        );
    }
}
