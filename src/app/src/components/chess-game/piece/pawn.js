import STATE from "../bitboard";

export default function pawnMove(state, from, to) {
    const moved = (state & STATE.moved) == STATE.moved;
    const dx = to[0] - from[0];
    const dy = Math.abs(to[1] - from[1]);

    // TODO: Black pawns move negative dy
    // TODO: Extra checks for en passant
    // TODO: Allow attacks (dx == +/- && dy == 1)
    // TODO: Promotion

    const attacking = false;
    const regular = (dx == 0 && dy == 1);
    const first = (!moved && dx == 0 && dy == 2);

    console.log("Pawn move", from, '->', to, first, regular)
    
    return attacking || regular || first;
}