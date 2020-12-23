import React from 'react';
import View from '../lib/ui/View';
import { Lamellophone, Utils } from '../../node_modules/musicvis-lib/dist/musicvislib';
import '../style/KalimbaTab.css';



export default class PitchTimeChart extends View {

    constructor(props) {
        const margin = { top: 35, right: 20, bottom: 40, left: 55 };
        super(props, margin);
        this.state = {
            ...this.state,
            useHtml: true,
            letter: true,
            midi: false,
            track: 0
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
    }

    componentDidUpdate() {
        this.updateTab();
    }

    updateTab = () => {
        const { midi, track, useHtml, letter } = this.state;
        const { midiFileData } = this.props;

        let notes = [];

        if (midi) {
            notes = midiFileData[track];
        } else {
            const text = this.textArea.value;
            const letterFormat = Lamellophone.convertNumbersToLetters(text, this.numberLetterMap);
            notes = Lamellophone.convertTabToNotes(letterFormat, this.tuning, 120);
        }

        console.log(notes);

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
        const { viewWidth, viewHeight, midi, useHtml, letter } = this.state;
        const { midiFileData } = this.props;
        // HTML
        return (
            <div
                className='View KalimbaTab'
                style={{ gridArea: `span ${this.state.rowSpan} / span ${this.state.columnSpan}` }}
            >
                <textarea
                    ref={n => this.textArea = n}
                    style={{
                        width: viewWidth - 60,
                        height: viewHeight / 2,
                    }}
                    placeholder='Write or paste a kalimba tab in letter notation here'
                    onChange={this.updateTab}
                />
                <div className='control'>
                    <button onClick={() => this.setState({ midi: !midi })}>
                        {midi ? 'MIDI' : 'Text'}
                    </button>
                    {midi &&
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
                    }
                    <button onClick={() => this.setState({ useHtml: !useHtml })}>
                        {useHtml ? 'HTML' : 'Text'}
                    </button>
                    <button onClick={() => this.setState({ letter: !letter })}>
                        {letter ? 'Letter' : 'Number'}
                    </button>
                </div>
                <div
                    className='tab'
                    ref={n => this.tab = n}
                    style={{
                        width: '100%',
                        height: viewHeight / 2,
                    }}
                />
            </div>
        );
    }
}
