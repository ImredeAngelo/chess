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
    setup() {
        let p = [];
        let i = 0;

        while(i < 8) {
            p[i++] = <Pawn white position={[i,2]} key={i-1}/>
            p[i+7] = <Pawn black position={[i,7]} key={i+7}/>
        }

        i += 8;
        p[i++] = <Rook white position={[1,1]} key={i}/>
        p[i++] = <Rook black position={[1,8]} key={i}/>
        p[i++] = <Rook white position={[8,1]} key={i}/>
        p[i++] = <Rook black position={[8,8]} key={i}/>
        
        p[i++] = <Knight white position={[2,1]} key={i}/>
        p[i++] = <Knight black position={[2,8]} key={i}/>
        p[i++] = <Knight white position={[7,1]} key={i}/>
        p[i++] = <Knight black position={[7,8]} key={i}/>

        p[i++] = <Bishop white position={[3,1]} key={i}/>
        p[i++] = <Bishop black position={[3,8]} key={i}/>
        p[i++] = <Bishop white position={[6,1]} key={i}/>
        p[i++] = <Bishop black position={[6,8]} key={i}/>
        
        p[i++] = <Queen white position={[4,1]} key={i}/>
        p[i++] = <Queen black position={[4,8]} key={i}/>

        p[i++] = <King white position={[5,1]} key={i}/>
        p[i++] = <King black position={[5,8]} key={i}/>

        return p;
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
