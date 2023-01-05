import React from 'react'
import Piece from './index.js'
import s from '../style/chess.scss'

const symbol = 'p';

export default class Pawn extends Piece {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            moved: props.moved || false
        }
    }

    isPseudoLegalMove(move) {
        const p = this.state.position;
        const dx = move[0] - p[0];
        const dy = Math.abs(move[1] - p[1]);

        // TODO: Black pawns move negative dy
        // TODO: Extra checks for en passant
        // TODO: Allow attacks (dx == +/- && dy == 1)

        // TODO: Only update moved when move has commited
        // this.setState({
        //     ...this.state,
        //     moved: true
        // })

        // TODO: Promotion

        const attacking = false;
        const regular = (dx == 0 && dy == 1);
        const first = (!this.state.moved && dx == 0 && dy == 2);

        // console.log("Pawn move", p, '->', move, first, regular)
        
        return attacking || regular || first;
    }

    // TODO: Same render function across pieces
    render() {
        return (
            <div 
                className={s[this.color + symbol]}
                ref={this.ref}
                style={{ 
                    transform:this.getTransform(), 
                    left:this.getOffset(0), 
                    top:this.getOffset(1), 
                }}
            />
        )
    }
}
