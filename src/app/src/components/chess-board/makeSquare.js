import React from "react";

/**
 * Create a single square div
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export default function makeSquare(style, row, column) {
    const alph = "ABCDEFGH";
    const col = alph[column];
    const stl = ((column % 2) ^ (row % 2)) ? 'dark' : 'light';

    const el = (<div className={style[stl]}>{`${col}${row}`}</div>);
    // el.addEventListener('contextmenu')

    return el;
}
