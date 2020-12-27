import React from 'react';
import { schemeCategory10, select, scaleLinear, extent, max } from 'd3';
import View from '../lib/ui/View';
import { Utils, Midi, Canvas, Lamellophone } from 'musicvis-lib';


export default class KalimbaRoll extends View {

    constructor(props) {
        const margin = { top: 30, right: 20, bottom: 20, left: 20 };
        super(props, margin);
        this.state = {
            ...this.state,
            overviewWidth: 80,
            // For checking if there are new notes
            lastData: [],
            notes: []
        };
    }

    componentDidMount = () => this.initialize();

    onResize = () => {
        this.initialize();
    };

    componentDidUpdate() {
        this.resizeComponent();
        const { data, selectedTrack } = this.props;
        if (data !== this.state.lastData) {
            // Update state, cache notes
            this.setState(
                {
                    lastData: data,
                    lastTrack: selectedTrack,
                    notes: data
                },
                this.updateBackground
            );
        }
    }

    initialize = () => {
        const { width, height, margin, overviewWidth } = this.state;
        const svg = select(this.svg);
        svg.selectAll('*').remove();
        // Scales
        const overviewX1 = margin.left + width - overviewWidth;
        const x = scaleLinear().range([margin.left, overviewX1 - 20]);
        const xOv = scaleLinear().range([overviewX1, overviewX1 + overviewWidth]);
        const y = scaleLinear().range([height, 0]);
        const yOv = scaleLinear().range([height, 0]);
        // Setup canvas rescaled to device pixel ratio
        Canvas.setupCanvas(this.canvas);
        Canvas.setupCanvas(this.highlightCanvas);
        this.setState(
            { initialized: true, svg, x, xOv, y, yOv },
            this.updateBackground
        );
    }

    updateBackground = () => {
        const { viewWidth, viewHeight, x, xOv, yOv, notes } = this.state;
        if (!notes || notes.length === 0) { return; }

        // Set x scale domain
        const [low, high] = extent(notes, d => d.pitch);
        x.domain([low - 1, high + 2]);
        xOv.domain([low, high + 1]);
        // Set y scale domain
        const maxTime = +max(notes, d => d.end);
        yOv.domain([0, maxTime]);

        // Draw background (only changes on new data or resize)
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, viewWidth, viewHeight);
        // Draw piano keys in background
        this.drawPianoKeys(ctx, low, high);
        // Draw overview notes
        this.drawNotes(ctx, notes, xOv, yOv);

        this.draw();
    }

    /**
     * Main draw function, sets scale domains and controls drawing of each
     * component
     */
    draw = () => {
        const { viewWidth, viewHeight, rowSpan, margin, x, y, notes } = this.state;
        const { currentPlayerTime } = this.props;
        if (!notes || notes.length === 0) { return; }

        // Update y scale for currentPlayerTime
        const t = currentPlayerTime !== null ? currentPlayerTime : 0;
        const limit = t + 2 * rowSpan;
        y.domain([t, limit]);

        // Draw foreground (changes all the time)
        const ctx2 = this.highlightCanvas.getContext('2d');
        ctx2.clearRect(0, 0, viewWidth, viewHeight);
        // Draw notes onto canvas
        this.drawNotes(ctx2, notes, x, y);
        // Draw current player time
        this.drawCurrentPlayerTime(ctx2, t, limit);
        ctx2.clearRect(0, 0, viewWidth, margin.top);
    }

    /**
     * Draws horizontal bands with alternating color to better distinguish rows.
     * @param {CanvasRenderingContext2D} ctx canvas rendering context
     */
    drawPianoKeys = (ctx, low, high,) => {
        const { height, margin, x } = this.state;
        const w = x(1) - x(0) - 4;
        const yPos = margin.top;
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        for (let pitch = low - 1; pitch <= high + 1; pitch++) {
            // Only draw for sharps
            const xPos = x(pitch);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(xPos + 2, yPos, w, height);
            const note = Midi.getMidiNoteByNr(pitch);
            ctx.fillStyle = 'steelblue';
            const label = pitch % 12 === 0 ? note.label : note.name;
            ctx.fillText(label, xPos + w / 2, yPos + height + 15);
        }
    }

    /**
     * Draws the note retangles.
     * @param {CanvasRenderingContext2D} ctx canvas rendering context
     * @param {Notes[]} data notes with start, end, pitch
     * @param {number} boxHeight height of each pitch-line
     * @param {Function} x D3 linearScale x scale
     * @param {Function} y D3 linearScale y scale
     */
    drawNotes = (ctx, data, x, y) => {
        const { height, margin } = this.state;
        const w = x(1) - x(0);
        const w2 = w / 2;
        // Colorize by channel
        const cols = schemeCategory10;
        for (let note of data) {
            const startPos = y(note.start);
            const endPos = y(note.end);
            // Do not draw invisible notes
            if (startPos < 0 || endPos > height) {
                continue;
            }
            ctx.fillStyle = startPos <= height ? cols[note.channel % cols.length] : 'gray';
            const yPos = margin.top + endPos;
            const h = Math.max(startPos - endPos, 1);
            const xPos = x(note.pitch);
            Canvas.drawNoteTrapezoidUpwards(ctx, xPos, yPos, w, h, w2);
        }
    }

    /**
     * Draws the current player time in the overview.
     */
    drawCurrentPlayerTime(ctx, currentTime, viewLimit) {
        const { margin, overviewWidth, xOv, yOv } = this.state;
        ctx.fillStyle = 'rgba(70, 130, 180, 0.4)';
        const yPos = yOv(viewLimit);
        const h = yOv(currentTime) - yPos;
        const [x1] = xOv.range();
        ctx.fillRect(x1, margin.top + yPos, overviewWidth, h);
    }

    render() {
        const { viewWidth, viewHeight, margin } = this.state;
        // Only draw data after chart has been initialized
        if (this.canvas && this.state.initialized) {
            this.draw();
        }
        // HTML
        return (
            <div
                className='View KalimbaRoll'
                style={{ gridArea: `span ${this.state.rowSpan} / span ${this.state.columnSpan}` }}
            >
                <canvas
                    className='ViewCanvas'
                    ref={n => this.canvas = n}
                    style={{ width: viewWidth, height: viewHeight }}
                />
                <canvas
                    className='ViewCanvas HighlightCanvas'
                    ref={n => this.highlightCanvas = n}
                    style={{ width: viewWidth, height: viewHeight }}
                />
                <svg
                    width={viewWidth}
                    height={viewHeight}
                >
                    <text
                        className='heading'
                        x={viewWidth / 2}
                        y={20}
                    >
                        Kalimba Roll
                    </text>
                    <g
                        ref={n => this.svg = n}
                        transform={`translate(${margin.left}, ${margin.top})`}
                    />
                </svg>
            </div>
        );
    }
}
