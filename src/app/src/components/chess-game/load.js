import STATE from "./bitboardState";

export default function FEN(position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
    const FEN = position.split(' ');

    // Game state
    const player = (FEN[1] == 'w' ? 1 : 0); // Player to move
    const passant = FEN[3];                 // TODO: En passant
    const halfs = parseInt(FEN[4]);         // Half-moves since last capture
    const fulls = parseInt(FEN[5]);         // Turn number
    
    // Load position
    let board = Array(64).fill(0);
    let file = 0;
    let rank = 0;

    for(let i = 0; i < FEN[0].length; i++) {
        const c = position[i];

        if(c == '/') {
            file = 0;
            rank++;
            continue;
        }

        if(Number.isInteger(c)) {
            file += c;
            file %= 8;
            continue;
        }

        let lower = c.toLowerCase();
        let state = 0;

        switch(lower) {
            case 'p': state = STATE.pawn; break;
            case 'n': state = STATE.knight; break;
            case 'b': state = STATE.bishop; break;
            case 'r': state = STATE.rook; break;
            case 'q': state = STATE.queen; break;
            case 'k': state = STATE.king; break;
            default: file++; continue;
        }

        if(c != lower) {
            state |= STATE.black;
        }

        board[rank*8 + file] = state;
        file++;
    }

    return {
        board:board, 
        player:player, 
        castles:'-', 
        enpassant:passant, 
        halfmoves:halfs, 
        turn:fulls
    };
}
