import GameContext from './stateContext'

import React, { Component } from 'react';
import FEN from './load';
import Piece from './piece';
import STATE, { getCharFromState } from './bitboard';
import bishopMove from './piece/bishop';
import pawnMove from './piece/pawn';
import knight from './piece/knight';
import rook from './piece/rook';
import queen from './piece/queen';
import king from './piece/king';

/**
 * Handles the main logic for chess, except movement
 */
export default class Chess extends Component {
    constructor(props) {
        super(props)

        const position = props.position || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

        this.state = {
            game: FEN(position)
        }
    }


    // ===== Helpers


    getStateOf(square) {
        return this.state.game.board[square[1]*8 + square[0]]
    }

    /**
     * Checks what team is on the given square
     * @param {Move} square 
     */
    isSameTeam(team, square) {
        const a = this.getStateOf(square);
        const b = (a & STATE.black);
        return (a != STATE.EMPTY) && (b == team);
    }


    // ===== Moving


    /**
     * 
     * @param {Move} from 
     * @param {Move} to 
     */
    move(from, to) {
        if(from == to) return false;
        
        let game = this.state.game;

        // Check if correct player turn
        const currentPlayer = game.player;
        if (this.isSameTeam(currentPlayer, from)) {
            console.error("Not your turn", currentPlayer)
            return false;
        }
        
        // Check if to square is on board

        const a = from[1]*8 + from[0];
        const b = to[1]*8 + to[0];

        const mover = game.board[a];
        const other = game.board[b];

        // Check if square is occupied by same player

        // Check if pseudo-legal
        // TODO: Refactor into array
        switch(mover & 0b111) {
            case STATE.pawn:    if(!pawnMove(game.board, from, to)) return false; break;
            case STATE.knight:  if(!knight(game.board, from, to)) return false; break;
            case STATE.bishop:  if(!bishopMove(game.board, from, to)) return false; break;
            case STATE.rook:    if(!rook(game.board, from, to)) return false; break;
            case STATE.queen:   if(!queen(game.board, from, to)) return false; break;
            case STATE.king:    if(!king(game.board, from, to)) return false; break;
            default: return false;
        }

        // Move pieces
        game.board[a] = 0;
        game.board[b] = mover;

        // Commit move -> Update player
        game.player ^= 1;
        this.commitMove(game);

        // Debugging
        const alph = "abcdefgh";
        console.log(`Moved ${getCharFromState(mover)} on ${alph[from[0]]}${from[1] + 1} to ${alph[to[0]]}${to[1] + 1}`)

        return true;
    }

    /**
     * Update state
     * @param {Game} game 
     */
    commitMove(game) {
        // TODO: Castles & first pawn move & en passant
        this.setState({
            ...this.state,
            game: game
        })
    }
    

    // ===== Rendering
    
    /**
     * @TODO Maybe pool pieces for performance
     * @returns All pieces to be rendered in no particular order
     */
    getPieces() {
        const b = this.state.game.board;
        let pieces = [];

        for(let i = 0; i < b.length; i++) {
            if(b[i]) {
                const pos = [(i % 8), Math.floor(i/8)]
                const type = (b[i] & 0b1111)

                pieces.push(<Piece key={i} manager={this} type={type} position={pos}/>);
            }
        }

        return pieces;
    }

    render() {
        return (
            <GameContext.Provider value={{
                getPieces: this.getPieces.bind(this)
            }}>
                {this.props.children}
            </GameContext.Provider>
        )
    }
}



// class Turn {
//     constructor(white, black = '') {
//         this.white = white;
//         this.black = black;
//     }

//     // Make new move
//     move(move) {
//         if(this.black != '') {
//             console.warn('New variations not implemented yet');
//             return;
//         }

//         this.black = move;
//     }
// }
