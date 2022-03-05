import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import DonorProfile from "./DonorProfile";
import DonateeProfile from "./DonateeProfile";
import AdminProfile from "./AdminProfile";

const ProfilePanel = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    if (user?.result.type === "donor" ){
        return(   
            <DonorProfile />
        );
    }
    if (user?.result.type === "donatee" ){
        return(   
            <DonateeProfile />
        );
    }
    if (user?.result.type === "admin" ){
        return(   
            <AdminProfile />
        );
    }
    // if not login
    return(   
        <UserProfile />
    );
}

export default ProfilePanel;