import React from 'react'
import Piece from './index.js'
import s from '../style/chess.scss'

const symbol = 'b'

export default class Bishop extends Piece {
    isPseudoLegalMove(move) {
        const p = this.state.position;
        const dx = Math.abs(move[0] - p[0]);
        const dy = Math.abs(move[1] - p[1]);
        
        return dx == dy && dx > 0;
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
