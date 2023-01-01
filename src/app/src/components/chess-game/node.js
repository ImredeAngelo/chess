/**
 * Linked list node for moves
 */
export class Node {
    constructor(last, notation, turn, player, variation=0) {
        this.notation = notation;
        this.last = last;
        this.turn = turn;
        this.player = player;
        this.children = [];
        this.variation = variation;
    }

    insert(node) {
        this.children.push(node);
    }

    read() {
        return this.notation;
    }

    readTree() {
        if(this.children[0])
            return this.read() + ' ' + this.children[0];
    }
}
