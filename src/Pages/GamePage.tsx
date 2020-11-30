import { Grid, Paper } from '@material-ui/core';
import React from 'react'
import Room from '../components/game/Room';

const GamePage = () => {
    return (
        <Grid container>
            <Grid item xs={10}>
                <Paper elevation={5} square className="text-center">
                    <Room />
                </Paper>
            </Grid>
            <Grid item xs={2}>
                <Paper>
                    Friends
                </Paper>
            </Grid>
        </Grid>
    )
}

export default GamePage;