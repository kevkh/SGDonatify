import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import DonorProfile from "./DonorProfile";
import DonateeProfile from "./DonateeProfile";
import AdminProfile from "./AdminProfile";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import {  Link, useHistory, useLocation } from "react-router-dom";

const ProfilePanel = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const token = user?.token; // check if token exists
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const anchorRef = React.useRef(null);
    const anchorRef2 = React.useRef(null);
    const location = useLocation(); // when location change, set the user

    // JSON web token (Manual login)
    // if (token) {
    //     const decodedToken = decode(token); // check when the token expires

    //     if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logout once token expired
    // }

    // Auto-refresh
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
      }, [location]);

    const logout = (event) => {
        dispatch({ type: actionType.LOGOUT }); // logout
        if (user?.result.type === "donor" ){
            history.push("/donor");
        }
        else if(user?.result.type === "donatee" ){
            history.push("/donatee");
        }
        else if(user?.result.type === "admin" ){
            history.push("/donor");
        }
        setUser(null);
        handleClose(event);
    };
    // For right button
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

    // For left button
    const handleToggle2 = () => {
        setOpen2((prevOpen) => !prevOpen);
    };
    
    const handleClose2 = (event) => {
        if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
            return;
        }   
        setOpen2(false);
    };
    
    function handleListKeyDown2(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen2(false);
        } else if (event.key === 'Escape') {
            setOpen2(false);
        }
    }

    if (user?.result.type === "donor" ){
        return(   
            <DonorProfile user={user}  logout={logout} anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown}/>
        );
    }
    if (user?.result.type === "donatee" ){
        return(   
            <DonateeProfile user={user} logout={logout}  anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown}/>
        );
    }
    if (user?.result.type === "admin" ){
        return(   
            <AdminProfile user={user} logout={logout}  anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown}/>
        );
    }
    // if not login
    return(   
        <UserProfile anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown} anchorRef2={anchorRef2} open2={open2} handleToggle2={handleToggle2} handleClose2={handleClose2} handleListKeyDown2={handleListKeyDown2}/>
    );
}

export default ProfilePanel;