import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import StatusBadge from "./ProfileBadge";

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {

  }
}))

export const ProfileAvatar: React.FC<{ isOnline: boolean, name: string, imageUrl: string, height: number }> = (props) => {
  const classes = useStyles();

  return (
    <StatusBadge isOnline>
      <Avatar className={classes.avatar} alt={props.name} src={props.imageUrl} style={{height: props.height, width: props.height}} />
    </StatusBadge>
  )
}