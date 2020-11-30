import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react'
import NavBar from '../components/navigation/NavBar';
import clsx from 'clsx';

const useStyles = (props: { drawerWidth: number }) => makeStyles((theme: Theme) => createStyles({
        layoutContainer: {
            minHeight: '100vh',
            background: theme.palette.background.default
        },
        layout: {
            paddingTop: 70
        },
        content: {
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
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
    const drawerWidth = 200;
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const classes = useStyles({ drawerWidth: drawerWidth });

    return (
        <div className={classes.layoutContainer}>
            <NavBar drawerIsOpen={drawerIsOpen} drawerWidth={drawerWidth} setDrawerIsOpen={setDrawerIsOpen} />
            <main className={clsx(classes.content, { [classes.contentShift]: drawerIsOpen })}>  
                <Grid container justify='center' className={classes.layout}>
                    {props.children}            
                </Grid>
            </main>
        </div>
    );
}

export default AppLayout;