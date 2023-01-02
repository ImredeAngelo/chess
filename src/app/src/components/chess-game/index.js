import GameContext from './context'

class Turn {
    constructor(white, black = '') {
        this.white = white;
        this.black = black;
    }

    // Make new move
    move(move) {
        if(this.black != '') {
            console.warn('New variations not implemented yet');
            return;
        }

        this.black = move;
    }
} 

/**
 * @TODO  
 */
// export default function Chess(props) {
//     const state = new Gamestate();

//     // All move pairs, i.e. both blacks & whites move (or just white if mid-turn) 
//     // const [turns, setTurns] = useState([]);
//     // const turn = Math.floor(turns.length) + 1;

//     // const [moves, setMoves] = useState([]);
    
//     // const makeMove = (move) => {
//     //     // const 
//     //     const node = new Node(turn, move, turn, 0);

//     //     setMoves([
//     //         ...moves,
//     //         move
//     //     ])

//     //     console.log(moves);
//     // }

// }

export class Move {
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
}

import React, { Component } from 'react'
import setup from './setup';

/**
 * Handles the main logic for chess, except movement
 */
export default class Chess extends Component {
    constructor(props) {
        super(props)

        const position = props.position || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

        this.state = {
            board: setup(position)
        }
    }

    /**
     * @TODO Pool pieces for performance
     * @returns All pieces to be rendered in no particular order
     */
    getPieces() {
        // console.log("Board", this.state.board)
        return this.state.board.flatMap(piece => {
            if(piece) return piece;
        })
    }

    /**
     * Checks what team is on the given square
     * @param {Move} square 
     */
    getTeam(square) {
        const p = this.state.board[square.file, square.rank];
        if(p) {
            console.log('Occupied!', p);
            return 1;
        }

        return 0;
    }

    /**
     * 
     * @param {Move} from 
     * @param {Move} to 
     */
    move(from, to) {
        console.log("Moving", from, " -> ", to);

        const playerA = this.getTeam(from);
        const playerB = this.getTeam(to);
        // Check if correct player turn
        // Check if square is occupied by same player
        //  - Remove captured piece
        // Update board

        let board = this.state.board;
        let piece = board[from.file][file.rank];
        board[to.file][to.rank] = piece;
        board[from.file][from.rank] = null;

        this.setState({
            ...this.state,
            board: board,
        })
    }
    
    render() {
        return (
            <GameContext.Provider value={{
                // state: this.gamestate
                getPieces: this.getPieces.bind(this),
            }}>
                {this.props.children}
            </GameContext.Provider>
        )
    }
}
