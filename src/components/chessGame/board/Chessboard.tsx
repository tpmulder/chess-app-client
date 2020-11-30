import React, { useState } from "react";
import { chess_colours, piece_names } from "../ChessEnums";
import ChessGame from "../ChessGame";
import Fen from "../Fen";
import Move from "../Move";
import { BoardSquare } from "./Square";
import { createStyles, Grid, GridList, makeStyles, Theme } from "@material-ui/core";

export default interface BoardSettings {
    fen?: Fen;
    history?: Move[];
    boardWidth: number;
}

const bw1 = `40vw`;
const bw2 = `2.5vw`;

const useStyles = makeStyles((theme: Theme) => createStyles({
    chessBoard: {
        width: bw1, 
        height: bw1,
        boxShadow: `${theme.spacing(0, 0, 0, 1)} ${theme.palette.primary.dark}, 
            ${theme.spacing(0, 0, 0, 2)} ${theme.palette.secondary.dark}, 
            ${theme.spacing(0, 0, 0, 3)} ${theme.palette.primary.dark}`,
        margin: theme.spacing(5)
    }
}))

export const Chessboard = (settings: BoardSettings) => {
    const classes = useStyles();

    const [game, setGame] = useState(new ChessGame(settings.fen, settings.history));

    const boardWidth = `${settings.boardWidth}vw`;
    const borderWidth = `${settings.boardWidth / 16}vw`;
    let board: JSX.Element[] = [];

    let darkToggle = true;

    let borderX:JSX.Element[] = [];
    let borderY:JSX.Element[] = [];

    // Array.from('87654321').forEach(elem => {
    //     borderY.push(
    //         <Grid container style={{height: `calc((${boardWidth} - ${borderWidth}) / 8)`}}>
    //             {elem}
    //         </Grid>
    //     );
    // });

    // Array.from('abcdefgh').forEach(elem => {
    //     borderX.push(
    //         <Grid className='border' style={{width: `calc((${boardWidth} - ${borderWidth}) / 8)`}}>
    //             <Grid className='justify-content-center align-items-center'>
    //                 {elem}
    //             </Grid>
    //         </Grid>
    //     );
    // });

    game.getBoard().forEach((row, i) => {
        row.forEach((field, j) => {
            if (j % 8 === 0) darkToggle = !darkToggle;

            board.push(
                <BoardSquare 
                    key={`${i}${j}`} 
                    piece={field !== '.' ? 
                    field as piece_names : undefined} 
                    colour={darkToggle ? chess_colours.black : chess_colours.white} 
                    position={`${i}${j}`} 
                />
            );

            darkToggle = !darkToggle;
        });        
    });

    return (
        <Grid container className={classes.chessBoard}>
            {board}
        </Grid>
        // <Grid container style={{width: boardWidth}}>
        //     <Grid item style={{height: 25}}>
        //         <Grid item className='border' style={{width: `calc(${borderWidth} / 2)`}}></Grid>
        //         {borderX}
        //         <Grid item className='border' style={{width: `calc(${borderWidth} / 2)`}}></Grid>
        //     </Grid>
        //     <Grid>
        //         <Grid style={{width: `calc(${borderWidth} / 2)`}}>
        //             {borderY}
        //         </Grid>
        //         <Grid style={{width: `calc(${boardWidth} - ${borderWidth})`}}>
        //             <Grid style={{height: `calc(${boardWidth} - ${borderWidth})`}}>
        //                 {board}
        //             </Grid>
        //         </Grid>
        //         <Grid style={{width: `calc(${borderWidth} / 2)`}}>
        //             {borderY}
        //         </Grid>
        //     </Grid>
        //     <Grid style={{height: `calc(${borderWidth} / 2)`}}>
        //         <Grid className='border' style={{width: `calc(${borderWidth} / 2)`}}></Grid>
        //         {borderX}
        //         <Grid className='border' style={{width: `calc(${borderWidth} / 2)`}}></Grid>
        //     </Grid>
        // </Grid>
    );
}