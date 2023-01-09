export default function rook(board, from, to) {
    const aFile = from[0];
    const aRank = from[1];
    const bFile = to[0];
    const bRank = to[1];

    const dx = bFile - aFile
    const dy = bRank - aRank

    // Check if movement pattern matches
    if((dx != 0 && dy != 0) || (dx == 0 && dy == 0))
        return false;

    // Check if path is blocked
    const max = (Math.abs(dy) > Math.abs(dx));
    const dir = (max) ? [0,1] : [1,0];

    for(let i = 1; i < dx + dy; i++) {
        const square = getSquare(board, aFile + i*dir[0], aRank + i*dir[1]); 
        if(square & 0b111) {
            return false;
        }
    }

    return true;
}