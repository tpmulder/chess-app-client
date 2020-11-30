import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";

const NotFoundPage = () => {
    return (
        <Grid item xs={6}>
            <Paper className='text-center'>
                <Typography variant='h1'>
                    Niet gevonden
                </Typography>
            </Paper>
        </Grid>
    )
}

export default NotFoundPage;