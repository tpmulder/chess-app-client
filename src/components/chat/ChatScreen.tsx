import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core'
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Message from '../../models/Message';

const useStyles = makeStyles((theme: Theme) => createStyles({
    chatContainer: {
        height: '100%',
        padding: theme.spacing(1),
        overflowY: 'scroll'
    },    
    message: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 50,
        padding: theme.spacing(1),
        margin: theme.spacing(1)
    },
    messageSelf: {
        backgroundColor: theme.palette.secondary.main
    }
}))

const ChatScreen: React.FC<{ messages: Message[] | null }> = (props) => {
    const classes = useStyles();
    const endRef = useRef<HTMLDivElement>(null);
    const self = true;

    useEffect(() => {
        if (endRef !== null)
            endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [ props.messages ]);

    return (
        <Grid container className={classes.chatContainer} alignItems='flex-end'>
        {props.messages === null ? <div>Loading...</div> : props.messages?.map((e) => 
            <Grid key={e.sentOn.toString()} item xs={12}>
                <Grid container justify={self ? 'flex-start' : 'flex-end'}>
                    <Grid item>
                        <Paper className={clsx(classes.message, self && classes.messageSelf)}>{e}</Paper>
                    </Grid>
                </Grid>
            </Grid>)}
            <div ref={endRef} />
        </Grid>
    )
}

export default ChatScreen;
