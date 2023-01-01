import React, { Component } from 'react';
import Board from './board';
import Bishop from './piece/bishop';
import King from './piece/king';
import Knight from './piece/knight';
import Pawn from './piece/pawn';
import Queen from './piece/queen';
import Rook from './piece/rook';
import chess from './style/chess.scss';

export const COLOR_WHITE = 'w';
export const COLOR_BLACK = 'b';

export default class ChessBoard extends Component {
    constructor(props) {
        super(props);

        let pieces = this.setup();

        this.state = {
            last: null,         // Last clicked square
            selected: null,     // Selected square
            pieces: pieces
        };
    }

    /**
     * Set up standard board
     */
    setup(position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR') { // w KQkq - 0 1
        let pieces = [];
        let rank = 1;

        for(let i = 0; i < position.length; i++) {
            const col = (i % 8) + 1;
            const c = position[i];
            let piece = null;

            switch(c.toLowerCase()) {
                case 'p': piece = <Pawn black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case 'b': piece = <Bishop black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case 'n': piece = <Knight black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case 'r': piece = <Rook black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case 'q': piece = <Queen black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case 'k': piece = <King black={c == c.toUpperCase()} position={[col,rank]}/>; break;
                case '/': rank++;
                default: continue;
            }

            pieces.push(piece);
        }

        return pieces;
    }

    /**
     * @todo - Load from PGN
     */
    load(file) {
        console.warn("Not implemented");
    }

    // TODO: Context pass style and update position

    render() {
        return (
            <div id={chess.board}>
                <Board style={chess} color={COLOR_WHITE}/>
                <div className={chess.pieces}>
                    { this.state.pieces }
                </div>
            </div>
        )
    }
}
