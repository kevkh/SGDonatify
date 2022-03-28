import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Reset from "./Reset/Reset";
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'

// Donatees 
import DonateeAuth from "./components/Auth/DonateeAuth";
import DonateeProfile from "./components/Pages/DonateeProfile";
import EditDonateeProfile from "./components/Pages/EditDonateeProfile";
import CreateRequests from "./components/DonationListing/CreateDonationListing";
import ViewMyRequests from "./components/DonationListing/ViewMyRequests"

//donor
import DonorAuth from "./components/Auth/DonorAuth";
import Profile from "./components/Pages/Profile";
import EditProfile from "./components/Pages/EditProfile";
import ViewMyDonations from "./components/DonationListing/ViewMyDonations"

//donation Listing
import IndividualDonationDetails from "./components/DonationListing/IndividualDonationDetails";
import LocateCC from "./components/Pages/LocateCC";
import DisplayListings from './components/DisplayListings/DisplayListings'

//admin
import ViewRequests from "./components/Admin/ViewRequests";
import ViewDonateeProfile from "./components/DonationListing/ViewDonateeProfile";

function App () {

const [text,setText] = useState("")

return (
  <Router>
    <Box sx={{width:'100%'}}>
      <Navbar setText={setText} />

      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/reset" component={Reset} />
        
       {/* Donatee List */}
        <Route path="/donateeProfile" exact component={DonateeProfile} />
        <Route path="/donateeProfile/:id" children={<EditDonateeProfile />}></Route>
        <Route path="/donatee" exact component={DonateeAuth} />
        <Route exact path="/CreateRequests"> <CreateRequests/></Route>
        <Route exact path="/ViewMyRequests"> <ViewMyRequests/></Route>

      {/* Donor List */}
        <Route exact path="/donor"> <DonorAuth /></Route>
        <Route path="/profile" exact component={Profile} />       
        <Route path="/profile/:id" children={<EditProfile />}></Route>
        <Route exact path="/ViewMyDonations"> <ViewMyDonations/></Route>

      {/* Donation Listings */}
        <Route exact path="/DisplayListings"> <DisplayListings text={text}/></Route>
        <Route exact path="/DisplayListings/:donationId"> <IndividualDonationDetails/></Route>
        <Route exact path="/LocateCC"> <LocateCC/></Route>

      {/* Admin */}
        <Route exact path="/ViewRequests"> <ViewRequests/></Route>
        <Route exact path="/Donatee/:donateeId/:donationId"> <ViewDonateeProfile/></Route>
      </Switch>
    </Box>
  </Router>
);
}
export default App;