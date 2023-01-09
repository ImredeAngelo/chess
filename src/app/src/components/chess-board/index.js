import React from 'react';
import StyleContext from '@components/chess-game/styleContext';
import useGame from '@components/chess-game/useGame';
import chess from './style/chess.scss';
import square from './square';

// /**
//  * @todo - Load from PGN
//  */
// load(file) {
//     console.warn("Not implemented");
// }

export default function ChessBoard(props) {
    const game = useGame();
    const {color} = props;

    let squares = [];
    let i = 0;

    for(let r = 0; r < 8; r++) {
        for(let c = 0; c < 8; c++) {
            squares[i++] = square(chess, (color == 'w') ? 8 - r : r + 1, c);
        }
    }

    return (
        <StyleContext.Provider value={chess}>
            <div id={chess.board}>
                <div className={chess.squares}>
                    {squares}
                </div>
                <div className={chess.pieces}>
                    { game.getPieces() }
                </div>
            </div>
        </StyleContext.Provider>
    )
}
