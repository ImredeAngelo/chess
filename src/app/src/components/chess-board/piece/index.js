import React, { Component } from 'react'
import Hammer, { DIRECTION_ALL } from 'hammerjs'

const COLOR_WHITE = 'w';
const COLOR_BLACK = 'b';

export default class Piece extends Component {
    constructor(props) {
        super(props);

        this.size = 0;
        this.color = props.black ? COLOR_BLACK : COLOR_WHITE;
        this.ref = React.createRef();

        this.state = {
            position: props.position || [0,0],
            offset: [0,0],
            start: [0,0]
        }
    }

    componentDidMount() {
        // Set up hammer
        const hammer = new Hammer(this.ref.current);
        const eventT = new Hammer.Pan({
            direction: DIRECTION_ALL, 
            threshold: 0  
        })
        
        hammer.add(eventT)
        hammer.on('pan', this.onDrag.bind(this))

        // Set up cursor
        const elem = this.ref.current;
        const rect = elem.getBoundingClientRect();
        this.size = rect.bottom - rect.top;
    }


    // ===== Helpers


    // Get square from relative position
    getSquare() {
        const x0 = this.state.position[0] * this.size;
        const y0 = this.state.position[1] * this.size;

        const x1 = x0 + this.state.offset[0] + this.state.start[0];
        const y1 = y0 - this.state.offset[1] + this.state.start[0];

        return [Math.round(x1/100), Math.round(y1/100)];
    }

    // Set relative offset
    setOffset(dx, dy) {
        this.setState({
            ...this.state,
            offset: [dx, dy]
        })
    }

    // Get style
    getTransform() {
        const x = (this.state.position[0] - 1) * 100;
        const y = (8 - this.state.position[1]) * 100;
        return `translate(${x}%, ${y}%)`;
    }

    // Get relative offset
    getOffset(i) {
        return (this.state.start[i] + this.state.offset[i])+'px';
    }


    // ===== Dragging


    /**
     * Handle dragging
     * @todo Let user move without dragging
     * @bug Function is called twice after (first) onDragStop()
     */
    onDrag(e) {        
        // console.log(this.isDragging, e, e.isFirst, e.isFinal)
        if(!this.state.isDragging) {
            this.onDragStart(e);
        } else {
            // Else statement because of bug
            this.setOffset(e.deltaX, e.deltaY);
        }

        if(e.isFinal) {
            this.onDragStop();
        }
    }

    /**
     * Moves the center of the piece to the cursor
     */
    onDragStart(e) {
        // Offset to cursor
        const offC = this.size/2;
        const offX = e.srcEvent.offsetX - offC;
        const offY = e.srcEvent.offsetY - offC;

        this.setState({
            ...this.state,
            start: [offX, offY],
            isDragging: true
        })

        // console.log("Started drag");
    }

    /**
     * Perform move if legal
     */
    onDragStop() {
        const square = this.getSquare();
        this.move(square);

        // TODO: Check if legal move
        // if(Game.registerMove(from, to)) {
        //     Move(to)
        // }

        // console.log("ended drag")
    }
    

    // ===== Click Move


    onClick(e) {

    }


    // ===== Game

    
    cancelDrag() {
        console.log("Illegal move", this.state)
        this.setState({
            ...this.state,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })
    }

    move(to) {
        // Check if move is pseudo-legal
        // Check if king is not left in check
        if(!this.isPseudoLegalMove(to)) {
            this.cancelDrag();
            return;
        }

        const from = this.state.position;
        console.log("Moved", from, to);
        // this.game.move(to);

        this.setState({
            position: to,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })
    }

    /**
     * Checks if piece moves that way (and on board)
     * Must be overridden by subclass
     */
    isPseudoLegalMove(square) {
        console.log("super")

        // Check on board
        if(square[0] < 1 || square[1] < 1 || square[0] > 8 || square[1] > 8) return false;
        
        // Check if square is occupied by same color

        // https://www.chessprogramming.org/Legal_Move
    }
}
