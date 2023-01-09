// TODO: Check from != to in chess-game
export default function king(board, from, to) {
    const dx = Math.abs(from[0] - to[0]);
    const dy = Math.abs(from[1] - to[1]);
    return (dx <= 1) && (dy <= 1) && (from != to);
}