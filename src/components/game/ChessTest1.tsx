import React, { useState } from 'react'
import ChessGame, { Square } from 'chess.js';
import Chessboard from 'chessboardjs';

const Chess = () => {
    const [game, setGame] = useState(ChessGame.Chess);
    const [fen, setFen] = useState("start");
    const [dropSquareStyle, setDropSquareStyle] = useState<any>({});
    const [squareStyles, setSquareStyles] = useState<any>({});
    const [pieceSquare, setPieceSquare] = useState<Square>('a8');
    const [square, setSquare] = useState<Square>('a8');
    const [history, setHistory] = useState<any[]>([]);

    var x = Chessboard.ChessBoard;

    const squareStyling = ({ pieceSquare, history }: any) => {
        const sourceSquare = history.length && history[history.length - 1].from;
        const targetSquare = history.length && history[history.length - 1].to;
      
        return {
            [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            ...(history.length && {
                [sourceSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            }),
            ...(history.length && {
                [targetSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            })
        };
    };

    return(
        // <Chessboard
        //     id="humanVsHuman"
        //     width={750}
        //     position={'start'}
        //     onSquareClick={(square: Square) => {
        //         setSquareStyles(squareStyling({ pieceSquare: square, history: history }));

        //         console.log(game);
            
        //         let move = game.move({
        //             from: pieceSquare,
        //             to: square,
        //             promotion: "q" // always promote to a queen for example simplicity
        //         });
            
        //         // illegal move
        //         if (move === null) 
        //             return;
        
        //         setFen(game.fen());
        //         setHistory(game.history({ verbose: true}));
        //         setPieceSquare('a8')
        //     }}
        //     boardStyle={{
        //     borderRadius: "5px",
        //     boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        //     }}
        // />
        <div></div>
    );
}

export default Chess
