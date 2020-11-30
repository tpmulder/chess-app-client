import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { Chessboard } from '../chessGame/board/Chessboard'

const useStyles = makeStyles((theme: Theme) => createStyles({
    chatBox: {
        flexGrow: 1
    }
}))

const Room = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item>
            <Chessboard boardWidth={40} />
            </Grid>
            <Grid item className={classes.chatBox}>
            <h1>Chat</h1>
            </Grid>
        </Grid>
    )
}

export default Room

