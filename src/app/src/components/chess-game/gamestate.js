export default class Gamestate {
    /**
     * Set up board
     * @param {String} position   
     */
    constructor(position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        this.board = [8][8];

        let rank = 1;
        for(let i = 0; i < position.length; i++) {
            const char = position[i];
            const col = (i % 8) + 1;

            switch(char) {
                case '/': rank++; continue;
                case ' ': return; // TODO   
            }

            // this.addPiece(char, col, rank);
        }
    }

    /**
     * Make a new piece on the given square
     * @param {*} char 
     * @param {*} file 
     * @param {*} rank 
     * @returns {void}
     */
    addPiece(char, file, rank) {
        if(this.board[--file][--rank]) {
            const alph = "ABCDEFGH";
            console.error(`Tried to place a piece (${char}) on ${alph[file]}${rank + 1}, but square is occupied:`, this.board[file][rank]);
            return;
        }

        let piece = null;
        switch(char.toLowerCase()) {
            case 'p': piece = <Pawn black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            case 'b': piece = <Bishop black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            case 'n': piece = <Knight black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            case 'r': piece = <Rook black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            case 'q': piece = <Queen black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            case 'k': piece = <King black={char == char.toUpperCase()} position={[file,rank]}/>; break;
            default: return;
        }

        this.board[file][rank] = piece;
    }

    isOccupied(file, rank) {
        return this.board[file - 1][rank - 1];
    }

    move(fromFile, fromRank, toFile, toRank) {
        const mover = this.board[--fromFile, --fromRank];
        this.board[--toFile, --toRank] = mover;
        this.board[fromFile, fromRank] = null;
    }
}