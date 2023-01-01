import useGame from '@components/chess-game/useGame';
import React, { Component, useState } from 'react';
import Board from './board';
import chess from './style/chess.scss';

export const COLOR_WHITE = 'w';
export const COLOR_BLACK = 'b';

// /**
//  * @todo - Load from PGN
//  */
// load(file) {
//     console.warn("Not implemented");
// }

export default function ChessBoard() {
    const [selected, select] = useState([-1,-1]);
    const game = useGame();

    return (
        <div id={chess.board}>
            <Board style={chess} color={COLOR_WHITE}/>
            <div className={chess.pieces}>
                { game.getPieces() }
            </div>
        </div>
    )
}
