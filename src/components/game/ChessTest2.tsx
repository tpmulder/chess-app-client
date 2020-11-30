import { Component, useState } from "react";
import Chess, { Square } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from "chessboardjsx";

import React from 'react'

const PersonVsPerson = () => {
    const [game, setGame] = useState(Chess.Chess);
    const [fen, setFen] = useState("start");
    const [dropSquareStyle, setDropSquareStyle] = useState<any>({});
    const [squareStyles, setSquareStyles] = useState<any>({});
    const [pieceSquare, setPieceSquare] = useState<Square>('a8');
    const [square, setSquare] = useState<Square>('a8');
    const [history, setHistory] = useState<any[]>([]);

    // keep clicked square style and remove hint squares
    const removeHighlightSquare = (pieceSquare: Square) => setSquareStyles(squareStyling({ pieceSquare: pieceSquare, history: history }));

      // show possible moves
    const highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
              return {
                ...a,
                ...{
                  [c]: {
                    background:
                      "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                    borderRadius: "50%"
                  }
                },
                ...squareStyling({
                  history: history,
                  pieceSquare: pieceSquare
                })
              };
            }, {}
        );

        setSquareStyles({ ...squareStyles, ...highlightStyles });
    };

    const onDrop = ({ sourceSquare, targetSquare }: any) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
          }
        );

        // illegal move
        if (move === null) 
            return;

        setFen(game.fen());
        setHistory(game.history({ verbose: true }));

        setSquareStyles(squareStyling({ pieceSquare: pieceSquare, history: history }));
    };

    const onMouseOverSquare = (square: Square) => {
        const moves = game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) 
            return;

        const squaresToHighlight: Square[] = [];

        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        highlightSquare(square, squaresToHighlight);
    };

    const onMouseOutSquare = (square: Square) => removeHighlightSquare(square);

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

    // central squares get diff dropSquareStyles
    const onDragOverSquare = (square: Square) => setDropSquareStyle({ boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" });

    const onSquareClick = (square: Square) => {
        setSquareStyles(squareStyling({ pieceSquare: square, history: history }));
    
        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: "q" // always promote to a queen for example simplicity
        });
    
        // illegal move
        if (move === null) 
            return;

        setFen(game.fen());
        setHistory(game.history({ verbose: true}));
        setPieceSquare('a8')
    };

    const onSquareRightClick = (square: Square) => setSquareStyles({ [square]: { backgroundColor: "deepPink" } });

    return(
        <Chessboard
            id="humanVsHuman"
            width={320}
            position={fen}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
        />
    );
}

export default PersonVsPerson;