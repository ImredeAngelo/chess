import React from "react";
import makeSquare from "./makeSquare";

/**
 * Create the chessboard squares
 * @returns The squares (div) of a chessboard
 * @todo Return full board div
 */
export default function Board(props) {
    const {style, color} = props;

    let squares = [];
    let i = 0;

    for(let r = 0; r < 8; r++) {
        for(let c = 0; c < 8; c++) {
            squares[i++] = makeSquare(style, (color == 'white') ? 8 - r : r + 1, c);
        }
    }

    return (<div className={style.squares}>{squares}</div>);
}
