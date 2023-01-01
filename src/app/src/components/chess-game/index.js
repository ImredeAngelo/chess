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

    getTeam(file, rank) {
        
    }

    /**
     * 
     */
    move(from, to) {
        
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
