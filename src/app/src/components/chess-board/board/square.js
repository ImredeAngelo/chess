import React from "react";

/**
 * Create a single square div
 * @param {*} row 
 * @param {*} column 
 * @returns 
 */
export default function square(style, row, column) {
    const alph = "ABCDEFGH";
    const col = alph[column];
    const stl = ((column % 2) ^ (row % 2)) ? 'dark' : 'light';
    // const text = (col == 1 || row == 1) ? `${col}${row}` : '';
    const text = `${col}${row}`;

    const el = (<div className={style[stl]}>{text}</div>);
    // el.addEventListener('contextmenu')

    return el;
}
