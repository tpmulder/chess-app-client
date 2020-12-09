import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react'
import NavBar from '../components/navigation/NavBar';
import clsx from 'clsx';
import ChatBox from '../components/chat/ChatBox';
import { useAuth0 } from '@auth0/auth0-react';
import User from '../models/User';

const useStyles = (props: { drawerWidth: number, barHeight: number }) => makeStyles((theme: Theme) => createStyles({
        layoutContainer: {
            maxHeight: '100vh',
            background: theme.palette.background.default,
            overflow: 'hidden'
        },
        content: {
            marginTop: props.barHeight,
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            height: `calc(100vh - ${props.barHeight}px)`,
            overflowY: 'auto'
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: props.drawerWidth,
        }
    })
)()

const AppLayout: React.FC = (props) => {
    const auth0User = useAuth0().user;

    const drawerWidth = 200;
    const chatboxWidth = 200;
    const chatboxHeight = 600;
    const navbarHeight = 65;

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const classes = useStyles({ drawerWidth: drawerWidth, barHeight: navbarHeight });

    return (
        <div className={classes.layoutContainer}>
            <NavBar barHeight={navbarHeight} drawerIsOpen={drawerIsOpen} drawerWidth={drawerWidth} setDrawerIsOpen={setDrawerIsOpen} />
            <main className={clsx(classes.content, { [classes.contentShift]: drawerIsOpen })}>  
                <Grid container justify='center'>
                    {props.children}            
                </Grid>
            </main>
            {/* <ChatBox height={chatboxHeight} width={chatboxWidth} currentUser={user} /> */}
        </div>
    );
}

export default AppLayout;