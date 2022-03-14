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
    const history = useHistory();
    const dispatch = useDispatch();
    const anchorRef = React.useRef(null);
    const location = useLocation(); // when location change, set the user

    // JSON web token (Manual login)
    // if (token) {
    //     const decodedToken = decode(token); // check when the token expires

    //     if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logout once token expired
    // }

    const logout = (event) => {
        dispatch({ type: actionType.LOGOUT }); // logout
        history.push("/displaylistings"); // redirect back to displaylistings
        setUser(null);
        handleClose(event);
    };

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

    if (user?.result.type === "donor" ){
        return(   
            <DonorProfile user={user} setUser={setUser} logout={logout} location={location} anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown}/>
        );
    }
    // if (user?.result.type === "donatee" ){
    //     return(   
    //         <DonateeProfile />
    //     );
    // }
    // if (user?.result.type === "admin" ){
    //     return(   
    //         <AdminProfile />
    //     );
    // }
    // if not login
    return(   
        <UserProfile anchorRef={anchorRef} open={open} handleToggle={handleToggle} handleClose={handleClose} handleListKeyDown={handleListKeyDown}/>
    );
}

export default ProfilePanel;