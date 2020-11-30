import { Button, createStyles, Grid, makeStyles, Paper, TextField, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import apiClient from '../../clients/ApiClient';
import ChatScreen from './ChatScreen';
import Message from '../../models/Message';
import User from '../../models/User';
import Room from '../../models/Room';

const useStyles = (props: { boxWidth: string, boxHeight: string }) => makeStyles((theme: Theme) => createStyles({
    chatScreen: {
        height: '60%',
        marginBottom: theme.spacing(3)
    },
    box: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: props.boxWidth,
        height: props.boxHeight,
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(3)
    },
    chatField: {
        width: '100%'
    },
    chatContainer: {
        height: '40%',
        padding: theme.spacing(1),
        overflowY: 'scroll'
    },
    chatButton: {
        margin: theme.spacing(3, 2, 0, 0)
    }
}))

const ChatBox: React.FC<{ currentUser: User, room: Room }> = (props) => {
    const classes = useStyles({ boxWidth: '20%', boxHeight: '800px' })();

    const [messages, setMessages] = useState<Message[] | null>(null)
    const [chat, setChat] = React.useState('');

    const hasRecievedNewMessages = false;

    useEffect(() => {(async () => {
        const lastMsg = messages !== null ? messages[messages.length - 1] : null;

        const query = lastMsg !== null ? `?p=${lastMsg.sentOn.toString()}` : '';

        setMessages(await apiClient.get<Message>(`/rooms/${props.room.id}/messages${query}`));

    })()}, [ hasRecievedNewMessages, messages ]);

    const onChatChange = (event: React.ChangeEvent<HTMLInputElement>) => setChat(event.target.value);

    const onSend = () => {
        if (chat.trim() !== '')
        console.log(chat);

        apiClient.create(`/rooms/${props.room.id}/messages`, { text: chat, sentOn: new Date(), senderId: props.currentUser.id });

        setChat('');
    }

    return (
        <Paper className={classes.box}>
            <Paper className={classes.chatScreen}>
                <ChatScreen messages={messages} />
            </Paper>
            <Grid container>
                <TextField onChange={onChatChange} value={chat} multiline className={classes.chatField} rows={2} variant='outlined' id="chat-input" label="Chat" />
                <Button onClick={onSend} className={classes.chatButton} color='secondary' variant='contained'>Send</Button>
                <Button className={classes.chatButton} color='primary' variant='contained'>clear</Button>
            </Grid>
        </Paper>
    )
}

export default ChatBox
