import GameContext from './stateContext'

import React, { Component } from 'react';
import FEN from './load';
import Piece from './piece';
import STATE from './bitboardState';

/**
 * Handles the main logic for chess, except movement
 */
export default class Chess extends Component {
    constructor(props) {
        super(props)

        const position = props.position || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

        this.state = {
            game: FEN(position),
            pieces: 32
        }
    }


    // ===== Helpers


    /**
     * Checks what team is on the given square
     * @param {Move} square 
     */
    isSameTeam(team, square) {
        const a = this.state.game.board[square[1]*8 + square[0]];
        const b = (a & STATE.black) >> 3;
        return (a != 0) && (b == team);
    }


    // ===== Moving


    /**
     * 
     * @param {Move} from 
     * @param {Move} to 
     */
    move(from, to) {
        // console.log("Moving", from, " -> ", to);
        
        let game = this.state.game;

        // Check if correct player turn
        const currentPlayer = game.player;
        if (this.isSameTeam(currentPlayer, from)) {
            // console.error("Not your turn", currentPlayer)
            return false;
        }

        game.player ^= 1;

        // Check if square is occupied by same player
        //  - Remove captured piece
        // Update board

        const a = from[1]*8 + from[0];
        const b = to[1]*8 + to[0];

        const mover = game.board[a];
        const other = game.board[b];

        game.board[b] = mover;
        game.board[a] = 0;
        
        if(other) {
            console.log("TODO: Capture")
        }

        this.setState({
            ...this.state,
            game: game
        })

        return true;
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

                pieces.push(<Piece manager={this} type={type} position={pos}/>);
            }
        }

        return pieces;
    }

    render() {
        return (
            <GameContext.Provider value={{
                getPieces: this.getPieces.bind(this),
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
