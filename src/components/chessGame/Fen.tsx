import { chess_colours } from "./ChessEnums";
import Piece from "./pieces/Piece";

export default class Fen {
    position: string;
    colorToMove: chess_colours;
    castlingRights: string;
    enPassantTargets: Piece[];
    halfmove: number;
    fullmove: number;

    constructor(fenString?: string) {
        if (fenString) {
            const fen = fenString.split(' ');

            this.position = fen[0];
            this.colorToMove = fen[1] as chess_colours;
            this.castlingRights = fen[2];
            this.enPassantTargets = this.seperate(fen[3], 2);
            this.halfmove = Number(fen[4]);
            this.fullmove = Number(fen[5]);
        }
        else {
            this.position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
            this.colorToMove = chess_colours.white;
            this.castlingRights = 'KQkq';
            this.enPassantTargets = [];
            this.halfmove = 0;
            this.fullmove = 0;
        }
    }

    toString() {    
        return `${this.position} 
            ${this.colorToMove} 
            ${this.castlingRights} 
            ${this.enPassantTargets.length < 1 ? '-' : this.enPassantTargets.join('')} 
            ${this.halfmove} 
            ${this.fullmove}`;
    }

    private seperate(str: string, charCount: number) {
        const chArr = Array.from(str);
        const strArr: Piece[] = [];

        for (let i = 0; i < chArr.length; i++) {
            let target: string = '';

            target += chArr[i];

            if(i % charCount == 0) {
                strArr.push(target as any);

                target = '';
            }
        }

        return strArr;
    }
}