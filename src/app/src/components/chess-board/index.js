import React, { Component } from 'react';
import Board from './makeBoard';
import Bishop from './piece/bishop';
import King from './piece/king';
import Knight from './piece/knight';
import Pawn from './piece/pawn';
import Queen from './piece/queen';
import Rook from './piece/rook';
import chess from './style/chess.scss';

const COLOR_WHITE = 'white';
const COLOR_BLACK = 'black';

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
            p[i++] = <Pawn white position={[i,2]}/>
            p[i+7] = <Pawn black position={[i,7]}/>
        }

        i += 8;
        p[i++] = <Rook white position={[1,1]}/>
        p[i++] = <Rook black position={[1,8]}/>
        p[i++] = <Rook white position={[8,1]}/>
        p[i++] = <Rook black position={[8,8]}/>
        
        p[i++] = <Knight white position={[2,1]}/>
        p[i++] = <Knight black position={[2,8]}/>
        p[i++] = <Knight white position={[7,1]}/>
        p[i++] = <Knight black position={[7,8]}/>

        p[i++] = <Bishop white position={[3,1]}/>
        p[i++] = <Bishop black position={[3,8]}/>
        p[i++] = <Bishop white position={[6,1]}/>
        p[i++] = <Bishop black position={[6,8]}/>
        
        p[i++] = <Queen white position={[4,1]}/>
        p[i++] = <Queen black position={[4,8]}/>

        p[i++] = <King white position={[5,1]}/>
        p[i++] = <King black position={[5,8]}/>

        return p;
    }

    setClickHandler(el, col, row) {
        // this.setState({
        //     ...this.state,
        //     selected:[col,row]
        // })
        // e.preventDefault();

        // if (document.addEventListener) {
        //     document.addEventListener('contextmenu', function(e) {
        //       alert("You've tried to open context menu"); //here you draw your own menu
        //       e.preventDefault();
        //     }, false);
        //   } else {
        //     document.attachEvent('oncontextmenu', function() {
        //       alert("You've tried to open context menu");
        //       window.event.returnValue = false;
        //     });
        //   }

        
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
