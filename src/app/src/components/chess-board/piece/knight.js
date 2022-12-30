import React from 'react'
import Piece from './index.js'
import s from '../style/chess.scss'

const symbol = 'n';

const max = Math.max;
const min = Math.min;
const abs = Math.abs;

export default class Knight extends Piece {
    isPseudoLegalMove(move) {
        const p = this.state.position;
        const dx = abs(move[0] - p[0]);
        const dy = abs(move[1] - p[1]);
        
        return max(dx, dy) == 2 && min(dx, dy) == 1;
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
