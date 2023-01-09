/**
 * Bit 1-3  Piece \n
 * Bit 7    Team (black is set)
 * Bit 8    Has moved (TODO)
 */
const STATE = {
    EMPTY:  0x0,
    pawn:   0x1,
    knight: 0x2,
    bishop: 0x3,
    rook:   0x4,
    queen:  0x5,
    king:   0x6,
    black:  0x8,    // Black if bit is set
    moved:  0x10,   // Used for castling & first pawn move
}

// export function getStateFromChar(char) {}

export function getCharFromState(state) {
    switch(state & 0b111) {
        case STATE.pawn:    return (state & STATE.black) ? 'p' : 'P';
        case STATE.knight:  return (state & STATE.black) ? 'n' : 'N';
        case STATE.bishop:  return (state & STATE.black) ? 'b' : 'B';
        case STATE.rook:    return (state & STATE.black) ? 'r' : 'R';
        case STATE.queen:   return (state & STATE.black) ? 'q' : 'Q';
        case STATE.king:    return (state & STATE.black) ? 'k' : 'K';
        default: return null;
    }
}

export default STATE;