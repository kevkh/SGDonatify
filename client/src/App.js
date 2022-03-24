import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayListings from './components/DisplayListings/DisplayListings'
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import DonorAuth from "./components/Auth/DonorAuth";
import Profile from "./components/Pages/Profile";
import Description from "./components/Pages/Description";
import Reset from "./Reset/Reset";
import DonorHub from "./components/Pages/DonorHub";
import DonorDetail from "./components/Pages/DonorDetail";
import SearchBar from './components/Search/SearchBar'
import PropertyListing from './components/Property/PropertyListing'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DonorUpdate from "./components/Admin/DonorUpdate";
import UserList from "./components/Admin/UserList";
import DonorList from "./components/Admin/DonorList";
import UserUpdate from "./components/Admin/UserUpdate";
import Blacklist from "./components/Admin/Blacklist";
import EditProfile from "./components/Pages/EditProfile";
import ApprovedList from "./components/Admin/ApprovedList";
import ViewReviews from "./components/Admin/ViewReviews";

// Thinking of removing 
import EditUserProfile from "./components/Pages/EditUserProfile";
import UserProfile from "./components/Pages/UserProfile";

// Donatees 
import DonateeAuth from "./components/Auth/DonateeAuth";
import DonateeHub from "./components/Pages/DonateeHub";
import DonateeDetail from "./components/Pages/DonateeDetail";
import DonateeUpdate from "./components/Admin/DonateeUpdate";
import DonateeList from "./components/Admin/DonateeList";
import DonateeProfile from "./components/Pages/DonateeProfile";
import EditDonateeProfile from "./components/Pages/EditDonateeProfile";

//donation Listing
import IndividualDonationDetails from "./components/DonationListing/IndividualDonationDetails";
import LocateCC from "./components/Pages/LocateCC";

//admin
import ViewRequests from "./components/Admin/ViewRequests";
import CreateRequests from "./components/DonationListing/CreateDonationListing";
import ViewMyRequests from "./components/DonationListing/ViewMyRequests";
import ViewMyDonations from "./components/DonationListing/ViewMyDonations";
import ViewDonateeProfile from "./components/DonationListing/ViewDonateeProfile";

function App () {

const [text,setText] = useState("")

return (
  <Router>
    <Box sx={{width:'100%'}}>
      <Navbar setText={setText} />

      <Switch>
        <Route path="/createForm" exact component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/donorHub" exact component={DonorHub} />
        <Route path="/donorHub/:id" children={<DonorDetail />}></Route>
        <Route path="/reset" component={Reset} />
        <Route exact path="/donor"> <DonorAuth /></Route>
        <Route path="/donorList" exact component={DonorList} />
        <Route path="/blacklist" exact component={Blacklist} />
        <Route path="/approvedList" exact component={ApprovedList} />
        <Route path="/donorList/:id" children={<DonorUpdate />}></Route>
        <Route path="/viewReviews/:id" children={<ViewReviews />}></Route>
        <Route path="/userList" exact component={UserList} />
        <Route path="/userList/:id" children={<UserUpdate />}></Route>
        <Route path="/profile" exact component={Profile} />       
        <Route path="/profile/:id" children={<EditProfile />}></Route>
        <Route path="/userProfile" exact component={UserProfile} />
        <Route path="/userProfile/:id" children={<EditUserProfile />}></Route>

       {/* Donatee List */}
        <Route path="/donateeHub" exact component={DonateeHub} />
        <Route path="/donateeHub/:id" children={<DonateeDetail />}></Route>
        <Route path="/donateeList/:id" children={<DonateeUpdate />}></Route>
        <Route path="/donateeProfile" exact component={DonateeProfile} />
        <Route path="/donateeProfile/:id" children={<EditDonateeProfile />}></Route>

        <Route path="/donatee" exact component={DonateeAuth} />
        <Route path="/donateeList" exact component={DonateeList} />


        <Route exact path="/DisplayListings"> <DisplayListings text={text}/></Route>
        <Route exact path="/DisplayListings/:donationId"> <IndividualDonationDetails/></Route>
        <Route exact path="/LocateCC"> <LocateCC/></Route>

        <Route exact path="/ViewRequests"> <ViewRequests/></Route>
        <Route exact path="/CreateRequests"> <CreateRequests/></Route>
        <Route exact path="/ViewMyRequests"> <ViewMyRequests/></Route>
        <Route exact path="/ViewMyDonations"> <ViewMyDonations/></Route>
        <Route exact path="/Donatee/:donateeId/:donationId"> <ViewDonateeProfile/></Route>
      </Switch>
    </Box>
  </Router>
);
}
export default App;