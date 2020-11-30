import { createStyles, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Link, makeStyles, Theme, useTheme } from '@material-ui/core'
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';
import React from 'react'
import ChevronLeftIcon from'@material-ui/icons/ChevronLeft';
import ChevronRightIcon from'@material-ui/icons/ChevronRight';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
})
)

const NavDrawer: React.FC<{ isOpen: boolean, onClose: () => void }> = props => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer anchor='left' variant='persistent' open={props.isOpen} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.onClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Drawer>
    )
}

export default NavDrawer
