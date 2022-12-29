import React, { Component } from 'react'
import Board from './makeBoard';
import chess from './style/chess.scss'

const PIECE_PAWN    = 'pawn';
const PIECE_KNIGHT  = 'knight';
const PIECE_BISHOP  = 'bishop';
const PIECE_ROOK    = 'rook';
const PIECE_QUEEN   = 'q';
const PIECE_KING    = 'k';

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
            p[i++] = this.makePiece(PIECE_PAWN, COLOR_WHITE, i, 2);
            p[i+7] = this.makePiece(PIECE_PAWN, COLOR_BLACK, i, 7);
        }

        i += 8;
        p[i++] = this.makePiece(PIECE_ROOK, COLOR_WHITE, 1, 1);
        p[i++] = this.makePiece(PIECE_ROOK, COLOR_BLACK, 1, 8);
        p[i++] = this.makePiece(PIECE_ROOK, COLOR_WHITE, 8, 1);
        p[i++] = this.makePiece(PIECE_ROOK, COLOR_BLACK, 8, 8);
        
        p[i++] = this.makePiece(PIECE_BISHOP, COLOR_WHITE, 2, 1);
        p[i++] = this.makePiece(PIECE_BISHOP, COLOR_BLACK, 2, 8);
        p[i++] = this.makePiece(PIECE_BISHOP, COLOR_WHITE, 7, 1);
        p[i++] = this.makePiece(PIECE_BISHOP, COLOR_BLACK, 7, 8);

        p[i++] = this.makePiece(PIECE_KNIGHT, COLOR_WHITE, 3, 1);
        p[i++] = this.makePiece(PIECE_KNIGHT, COLOR_BLACK, 3, 8);
        p[i++] = this.makePiece(PIECE_KNIGHT, COLOR_WHITE, 6, 1);
        p[i++] = this.makePiece(PIECE_KNIGHT, COLOR_BLACK, 6, 8);
        
        p[i++] = this.makePiece(PIECE_QUEEN, COLOR_WHITE, 4, 1);
        p[i++] = this.makePiece(PIECE_QUEEN, COLOR_BLACK, 4, 8);
        p[i++] = this.makePiece(PIECE_KING, COLOR_WHITE, 5, 1);
        p[i++] = this.makePiece(PIECE_KING, COLOR_BLACK, 5, 8);

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

    // TODO: Context pass style
    makePiece(type, color, column=1, row=1) {
        const y = (8 - row)*100;
        const x = (column - 1)*100;

        return (
            <div 
                key={`${type}-${column}${row}`} 
                className={`${chess[color]} ${chess[type]}`} 
                style={{transform:`translate(${x}%,${y}%)`}}
            />
        )
    }

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
