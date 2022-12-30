import React from 'react'
import Piece from './index.js'
import s from '../style/chess.scss'

const symbol = 'p';

export default class Pawn extends Piece {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            moved: props.moved
        }
    }

    isPseudoLegalMove(move) {
        const p = this.state.position;
        const dx = move[0] - p[0];
        const dy = Math.abs(move[1] - p[1]);

        // TODO: Black pawns move negative dy
        // TODO: Extra checks for en passant
        // TODO: Allow attacks (dx == +/- && dy == 1)

        // TODO: Only update moved when move has comitted
        this.setState({
            ...this.state,
            moved: true
        })
        
        return (dx == 0 && dy == 1) || (!this.state.moved && dx == 0 && dy == 2);
    }

    // TODO: Same render function across pieces
    render() {
        const opts = {
            ref: this.ref,
            style: { 
                transform:this.getTransform(), 
                left:this.getOffset(0), 
                top:this.getOffset(1), 
            },
            className: s[this.color + symbol],
        }

        return React.createElement('div', opts)
    }
}
