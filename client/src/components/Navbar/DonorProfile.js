import useStyles from "./styles";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import {  Link, useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
const DonorPanel = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();
    const history = useHistory();
    const [donorProfile, setDonorProfile] = useState('')

   
    async function fetchDonorData() {
        let response = await axios.get(`http://localhost:5000/donor/${user?.result._id}`)
        setDonorProfile(response.data)
        console.log(response.data.name)
    }
    fetchDonorData()
    
    const logout = () => {
        dispatch({ type: actionType.LOGOUT }); // logout
        history.push("/auth"); // redirect back to auth
        setUser(null);
    };
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    return(
        <Stack direction="row" spacing={2}>
            
                <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                variant="outlined"
                color = "primary"
                height ="380px"
                endIcon={<KeyboardArrowDownIcon />}
                >
                Donor
                </Button>
        
                <Popper open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>
           
        </Stack>
    );
}
export default DonorPanel;