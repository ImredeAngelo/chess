import React, { useState } from 'react'
import GameContext from './context'

// TODO: Prerender with authentication disabled
export default function Chess(props) {
    const [moves, setMoves] = useState([]);
    
    const makeMove = (move) => {
        setMoves([
            ...moves,
            move
        ])

        console.log(moves);
    }

    const val = {
        move: makeMove,
        moves: moves,
        getPlayer: () => (moves.length % 2), // white = 0, black = 1
    }

    return (
        <GameContext.Provider value={val}>
            {props.children}
        </GameContext.Provider>
    )
}