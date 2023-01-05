import React from 'react';
import Board from './board';
import StyleContext from '@components/chess-game/styleContext';
import useGame from '@components/chess-game/useGame';
import chess from './style/chess.scss';

// /**
//  * @todo - Load from PGN
//  */
// load(file) {
//     console.warn("Not implemented");
// }

export default function ChessBoard() {
    const game = useGame();

    return (
        <StyleContext.Provider value={chess}>
            <div id={chess.board}>
                <Board style={chess} color={'w'}/>
                <div className={chess.pieces}>
                    { game.getPieces() }
                </div>
            </div>
        </StyleContext.Provider>
    )
}
