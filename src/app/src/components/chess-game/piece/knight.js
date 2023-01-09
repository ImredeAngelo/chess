export default function knight(board, from, to) {
    const dx = Math.abs(to[0] - from[0]);
    const dy = Math.abs(to[1] - from[1]);
    
    return Math.max(dx, dy) == 2 && Math.min(dx, dy) == 1;
}