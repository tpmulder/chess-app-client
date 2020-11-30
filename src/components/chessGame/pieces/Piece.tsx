import React from "react";
import { piece_names } from "../ChessEnums";
import classic_pieces from '../../../assets/images/classic_pieces.svg';

export default class Piece {
    image: string;
    name: piece_names;
    position: string;

    constructor(image: string, name: piece_names, position: string) {
        this.image = image;
        this.name = name;
        this.position = position;
    }
}

interface PieceInfo {
    variant: piece_names;
    position: string;
}

export const ChessPiece = (pieceInfo: PieceInfo) => {
    let piece = getPiece(pieceInfo);



    return (
        <div id={`${piece.name}/${piece.position}`} style={{width: '100%', height: '100%'}}>
            <img style={{width: '100%', height: '100%'}} src={`${piece.image}#${piece.name}`} alt={piece.name} />
        </div>
    );
}

const getPiece = (pieceInfo: PieceInfo): Piece => {
    return new Piece(
        classic_pieces, 
        pieceInfo.variant,
        pieceInfo.position
    );
}