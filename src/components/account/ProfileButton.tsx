import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Auth0Client from '../../clients/Auth0Client';
import { Button, Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { ProfileAvatar } from "./ProfileAvatar";

const ProfileButton = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

  const profileMenuId = 'profile-menu';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const renderProfileMenu = (
    <Menu
      id={profileMenuId}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
    </Menu>
  )

  useEffect(() => {
    (async () => {
      if (isAuthenticated){
        Auth0Client.getAccessToken(getAccessTokenSilently);
      }
    })()
  }, [ getAccessTokenSilently, isAuthenticated ]);
  
  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <Grid container alignItems='center' className='pl-2'>
      { isAuthenticated ? (
          <IconButton
          className="p-2"
          edge="end"
          aria-label="account of current user"
          aria-controls={profileMenuId}
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <ProfileAvatar isOnline height={40} imageUrl={user.picture} name={user.username} />
        </IconButton>
      ) : (
        <Grid item >
          <Button color='secondary' variant='contained' onClick={loginWithRedirect} style={{height: 30}}>Login</Button>
        </Grid>
      )
    }
    {renderProfileMenu}
    </Grid>
  );
};

export default ProfileButton;