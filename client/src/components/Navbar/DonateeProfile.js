import useStyles from "./styles";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {  Link, useHistory, useLocation } from "react-router-dom";
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from '@mui/material'
const DonateeProfile = ({anchorRef, logout, user, open, handleToggle, handleClose, handleListKeyDown}) => {
    const classes = useStyles();
    return(
      <div className={classes.verticalCenter}>
      <Box sx={{display:'flex'}}>
      <Button 
      sx={{ml:1,my:2}}
      variant ='contained' 
      component={Link} to="/CreateRequests"

      >
       Create Requests
      </Button>
      
      <Button 
        variant="contained"
        color = "primary"
        sx={{ml:1,my:2}}
       component={Link} to="/ViewMyRequests">
       View My Requests
      </Button>
      </Box>
     
     
      <Stack direction="row">
            
            <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  variant="outlined"
                  color = "primary"
                  startIcon = {<Avatar alt="Travis Howard" src={user.result.profile_pic} />}
                  className={classes.logonProfileButton}
                  endIcon={<KeyboardArrowDownIcon />}>
                  {user.result.name}
                  </Button>
                  
                  
             
              <Popper open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
             
              transition>
              {({ TransitionProps, placement }) => (
              <Grow
                  {...TransitionProps}
                  style={{
                  transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
              >
                      <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          >
                            <MenuItem  onClick={handleClose} component={Link} to="/donateeProfile">MY PROFILE</MenuItem>
                            <MenuItem  onClick={handleClose} component={Link} to="/reset">RESET PASSWORD</MenuItem>
                            <MenuItem  onClick={logout}>LOGOUT</MenuItem>
                          </MenuList>
                      </ClickAwayListener>
                      </Paper>
                  </Grow>
                  )}
              </Popper>
         
      </Stack>
      </div>
  );
}
export default DonateeProfile;