import Fen from "./Fen";
import Move from "./Move";

export default class ChessGame {
    fen: Fen;
    history: Move[];

    constructor(fen?: Fen, history?: Move[]) {
        if (fen) this.fen = fen;
        else this.fen = new Fen();

        if (history) this.history = history;
        else this.history = [];
    }

    getBoard() {
        let arr: string[][] = new Array(8).fill(0).map(() => new Array(8).fill(0));

        this.fen.position.split('/').forEach((row, i) => {
            Array.from(row).forEach((field, j) => {
                if (!isNaN(+field)) {
                    for (let k = j; k < +field; k++) {
                        arr[i][k] = '.';
                    }
                } else {
                    arr[i][j] = field;
                }
            })
        });

        return arr;
    }

    positionToString() {
        const fenArr = Array.from(this.fen.position);
        let str = '';

        for (let i = 0; i < fenArr.length; i++) {
            if (fenArr[i] === '/') str += '</br>';
            else if (!isNaN(+fenArr[i])) str += '. '.repeat(+fenArr[i]);
            else str += fenArr[i];
        }

        return str;
    }
}