import React from 'react'
import Piece from './index.js'
import s from '../style/chess.scss'

export default class Rook extends Piece {
    isPseudoLegalMove(move) {
        const p = this.state.position;
        const dx = Math.abs(move[0] - p[0]);
        const dy = Math.abs(move[1] - p[1]);
        
        return (dx == 0 || dy == 0) && (dx != dy);
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
            className: s[this.color + 'r'],
        }

        return React.createElement('div', opts)
    }
}
