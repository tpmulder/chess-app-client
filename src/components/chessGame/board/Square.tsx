import React from "react";
import { chess_colours, piece_names } from "../ChessEnums";
import { ChessPiece } from "../pieces/Piece";
import { createStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Grid } from "@material-ui/core";

export default interface Square {
    position: string;
    piece?: piece_names;
    colour: chess_colours;
}

// const useStyles = makeStyles((theme: Theme) => createStyles({
//     square: {

//     }
// }))

export const BoardSquare = (square: Square) => {
    let theme = useTheme();

    return (
        <Grid item 
            id={'sq' + square.position}
            style={{width: '12.5%', height: '12.5%', backgroundColor: square.colour === 'b' ? theme.palette.primary.main : theme.palette.secondary.main}}
        >
            {square.piece ? <ChessPiece variant={square.piece} position={square.position} /> : <div></div>}
        </Grid>
    );
}