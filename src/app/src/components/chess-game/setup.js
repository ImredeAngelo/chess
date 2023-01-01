import Bishop from "@components/chess-board/piece/bishop";
import King from "@components/chess-board/piece/king";
import Knight from "@components/chess-board/piece/knight";
import Pawn from "@components/chess-board/piece/pawn";
import Queen from "@components/chess-board/piece/queen";
import Rook from "@components/chess-board/piece/rook";
import React from "react";

/**
 * Set up standard board
 * @param {string} position FEN starting position 
 * @returns {Piece[][]} Grid of each 
 */
export default function setup(position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    const isUppercase = (char) => (char == char.toUpperCase());

    let board = [];
    let file = 1;
    let rank = 1;

    for(let i = 0; i < position.length; i++, file++) {
        const c = position[i];
        let piece = null;

        if(!board[file-1])
            board[file-1] = []

        switch(c.toLowerCase()) {
            case 'p': piece = <Pawn   black={isUppercase(c)} position={[file,rank]}/>; break;
            case 'b': piece = <Bishop black={isUppercase(c)} position={[file,rank]}/>; break;
            case 'n': piece = <Knight black={isUppercase(c)} position={[file,rank]}/>; break;
            case 'r': piece = <Rook   black={isUppercase(c)} position={[file,rank]}/>; break;
            case 'q': piece = <Queen  black={isUppercase(c)} position={[file,rank]}/>; break;
            case 'k': piece = <King   black={isUppercase(c)} position={[file,rank]}/>; break;
            case '/': rank++; file = 0; continue;
            case ' ': return board; // TODO - Castles & en passant
            default: continue;
        }

        board[file - 1][rank - 1] = piece;
    }

    return board;
}
