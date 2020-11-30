import { chess_colours, piece_names } from "./ChessEnums";

export default interface Move {
    turn: chess_colours;
    piece: piece_names;
    from: number;
    to: number;
    capturedPiece?: piece_names;
    promotion?: piece_names;
}