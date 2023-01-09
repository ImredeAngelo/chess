import bishopMove from "./bishop";
import rook from "./rook";

export default function queen(board, from, to) {
    return rook(board, from, to) || bishopMove(board, from, to);
}