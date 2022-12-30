import React, { Component } from 'react'
import Hammer, { DIRECTION_ALL } from 'hammerjs'
import s from './style/chess.scss'

export default class Piece extends Component {
    constructor(props) {
        super(props);

        this.size = 0;
        this.ref = React.createRef();

        this.state = {
            position: [props.column, props.row],
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


    // ===== Functionality


    // From screen position
    getSquare() {
        const x0 = this.state.position[0] * this.size;
        const y0 = this.state.position[1] * this.size;

        const x1 = x0 + this.state.offset[0] + this.state.start[0];
        const y1 = y0 - this.state.offset[1] + this.state.start[0];

        return [Math.round(x1/100), Math.round(y1/100)];
    }

    setOffset(dx, dy) {
        this.setState({
            ...this.state,
            offset: [dx, dy]
        })
    }


    // ===== Style


    getTransform() {
        const x = (this.state.position[0] - 1) * 100;
        const y = (8 - this.state.position[1]) * 100;
        return `translate(${x}%, ${y}%)`;
    }

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
        // TODO: Update position (quantized)

        const square = this.getSquare();

        this.setState({
            position: square,
            offset: [0,0],
            start: [0,0],
            isDragging: false
        })

        // TODO: Check if legal move
        // if(Game.registerMove(from, to)) {
        //     Move(to)
        // }

        // console.log("ended drag")
    }
    

    // ===== Game


    /**
     * Checks if piece moves that way (and on board)
     */
    isPseudoLegalMove(square) {
        if(square[0] < 1 || square[1] < 1 || square[0] > 8 || square[1] > 8) return false;

        switch(this.props.type) {
            case 'p':
                
                break;
        }
    }

    knightMove() {

    }


    // ===== Render


    render() {
        const opts = {
            ref: this.ref,
            style: { 
                transform:this.getTransform(), 
                left:this.getOffset(0), 
                top:this.getOffset(1), 
            },
            className: s[this.props.type] + ' ' + s[this.props.color],
        }

        return React.createElement('div', opts)
    }
}
