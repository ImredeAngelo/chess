import React, { Component } from 'react'
import Hammer, { DIRECTION_ALL } from 'hammerjs'
import { getCharFromState } from '../bitboard'
import StyleContext from '../styleContext'

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

export default class Piece extends Component {
    constructor(props) {
        super(props);

        this.size = 0;
        this.ref = React.createRef();
        
        // TODO: Decouple (Use context in chess-board)
        this.game = this.props.manager;

        // TODO: Don't use state -> No need to re-render        
        this.state = {
            position: props.position || [-1,-1],
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
        const x0 = (this.state.position[0]) * this.size;
        const y0 = (this.state.position[1]) * this.size;

        const x1 = x0 + this.state.offset[0] + this.state.start[0];
        const y1 = y0 - this.state.offset[1] + this.state.start[0];

        const file = Math.round(x1/100).clamp(0,7);
        const rank = Math.round(y1/100).clamp(0,7);

        return [file, rank];
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
        const x = (this.state.position[0]) * 100;
        const y = (7 - this.state.position[1]) * 100;
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
        // Select this 
    }

    onClickSquareCallback(target) {
        // Listen for click -> If square is clicked, try to move there
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

        // Check if the king is left in check
        if(!this.game.move(from, to)) {
            console.log("Illegal move", from, to)
            this.cancelDrag();
            return;
        }

        // Update visual position
        this.setState({
            position: to,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })
    }

    /**
     * Checks if piece moves that way (and on board)
     */
    isPseudoLegalMove(square) {
        // Check on board
        if(square[0] < 1 || square[1] < 1 || square[0] > 8 || square[1] > 8) return false;
        
        // Check if square is occupied by same color

        // https://www.chessprogramming.org/Legal_Move
        return true;
    }


    // ===== Render


    select() {

    }

    render() {
        return (
            <StyleContext.Consumer>
                { style => {
                    const symbol = getCharFromState(this.props.type);
                    const dragstl = this.state.isDragging ? style['dragging'] : '';
                    const opts = {
                        className: `${style['piece']} ${style[symbol]} ${dragstl}`.trim(),
                        ref: this.ref,
                        style: {
                            transform:this.getTransform(), 
                            left:this.getOffset(0), 
                            top:this.getOffset(1), 
                        }
                    }

                    return React.createElement('div', opts)
                }}
            </StyleContext.Consumer>
        )
    }
}
