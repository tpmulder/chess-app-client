import { Badge, createStyles, Theme, withStyles } from "@material-ui/core";
import React from "react";

const OfflineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#BEBEBE',
      color: '#BEBEBE',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }),
)(Badge);

const OnlineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const StatusBadge: React.FC<{ isOnline: boolean }> = props => {
  return (props.isOnline ? (
    <OnlineBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
      {props.children}
    </OnlineBadge> ) : (
    <OfflineBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
      {props.children}
    </OfflineBadge> )
  );
}

export default StatusBadge;