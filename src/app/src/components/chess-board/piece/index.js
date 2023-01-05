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
        
        // TODO: Decouple (Use context?)
        this.game = this.props.manager;

        this.state = {
            position: props.position || [0,0],
            offset: [0,0],
            start: [0,0]
        }
    }

    componentDidMount() {
        this.initHammer();
        this.initDragging();
    }

    initHammer() {
        const hammer = new Hammer(this.ref.current);
        const eventT = new Hammer.Pan({
            direction: DIRECTION_ALL, 
            threshold: 0  
        })
        
        hammer.add(eventT)
        hammer.on('pan', this.onDrag.bind(this))
    }

    initDragging() {
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

    // Get relative offset for styling
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
    }

    /**
     * Try to move piece
     */
    onDragStop() {
        const square = this.getSquare();
        this.move(square);
    }
     
    /**
     * Reset the position of the piece
     */
    cancelDrag() {
        this.setState({
            ...this.state,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })
    }
    

    // ===== Click Move


    onClick(e) {

    }

    onClickSquareCallback(target) {

    }


    // ===== Game

    
    // Check if move is pseudo-legal
    // Check if king is not left in check        
    move(to) {
        const from = this.state.position;
        
        // Anti-Bug Hotfix (Dragging calls move twice)
        if(from[0] == to[0] && from[1] == to[1]) {
            this.cancelDrag();
            return;
        }

        // Check if the piece moves in that way
        if(!this.isPseudoLegalMove(to)) {
            console.log("Illegal move (move pattern)", from, to)
            this.cancelDrag();
            return;
        }

        // Check if the king is left in check
        if(!this.game.move(from, to)) {
            console.log("Illegal move (king checked)", from, to)
            this.cancelDrag();
            return;
        }

        // Update position
        console.log("Moved", from, to);
        this.setState({
            position: to,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })

        // TODO: Promotion
    }

    /**
     * Checks if piece moves that way (and on board)
     * Must be overridden by subclass
     */
    // isPseudoLegalMove(square) {
    //     console.log("super")

    //     // Check on board
    //     if(square[0] < 1 || square[1] < 1 || square[0] > 8 || square[1] > 8) return false;
        
    //     // Check if square is occupied by same color

    //     // https://www.chessprogramming.org/Legal_Move
    //     return true;
    // }
}
