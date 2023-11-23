import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, MenuIcon, Typography, Popover } from '../imports/MaterialUI';
import MainMenuButton from './MainMenuButton';
import ProfileMenu from './ProfileMenu';

export default function MainMenuBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MainMenuButton />
          </Popover>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Controle de Estoque
          </Typography>
            <ProfileMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
