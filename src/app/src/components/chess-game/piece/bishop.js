import getSquare from "../getSquare";

function isClamped(a, b, ...params) {
    for(let p in params) {
        if(p < a || p > b)
            return false;
    }

    return true;
}

export default function bishopMove(board, from, to) {
    const aFile = from[0];
    const aRank = from[1];

    const bFile = to[0];
    const bRank = to[1];

    // Check if on board -> TODO: Check in chess-game
    if(!isClamped(0, 7, from[0], from[1], to[0], to[1]))
        return false;

    const dx = bFile - aFile
    const dy = bRank - aRank
    const DX = Math.abs(dx);
    const DY = Math.abs(dy);

    // Check if movement pattern matches
    if(DX != DY || (dx == 0 && dy == 0))
        return false;

    // Check if path is blocked
    for(let i = 1; i < DX; i++) {
        const square = getSquare(board, aFile + i*(dx/DX), aRank + i*(dy/DY)); 
        if(square & 0b111) {
            // console.log("Blocked at", [aFile + i*(dx/DX), aRank + i*(dy/DY)])
            return false;
        }
    }

    return true;
}