import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import {  Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import SendIcon from '@mui/icons-material/Send';
import Popover from '@mui/material/Popover'
import mypic from "../../images/donatify.jpg";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import Box from '@mui/material/Box'
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Searchbar from "./Searchbar";
import ProfilePanel from "./ProfilePanel";

const Navbar = ({setText}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation(); // when location change, set the user
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userProfile, setUserProfile] = useState('')
  const [donorProfile, setDonorProfile] = useState('')
  const [donateeProfile, setDonateeProfile] = useState('')
  const [search,setSearch] = useState("")

  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT }); // logout
    history.push("/auth"); // redirect back to auth
    setUser(null);
  };

  const open = Boolean(anchorEl);


  // Auto-refresh
  useEffect(() => {
    if (user?.result.type === "user" )
    {
      async function fetchUserData() {
        console.log(user?.result.name);
        let response = await axios.get(`http://localhost:5000/user/${user?.result._id}`)
        setUserProfile(response.data)
      }
    fetchUserData()
    }
    else if(user?.result.type === "donor" )
    {
      async function fetchDonorData() {
      let response = await axios.get(`http://localhost:5000/donor/${user?.result._id}`)
      setDonorProfile(response.data)
      console.log(response.data.name);
    }
    fetchDonorData()
  }
  else if(user?.result.type === "donatee" )
    {
      async function fetchDonateeData() {
      let response = await axios.get(`http://localhost:5000/donatee/${user?.result._id}`)
      setDonateeProfile(response.data)
      console.log(response.data.name);
    }
    fetchDonateeData()
  }

  else if(user?.result.type === "admin" )
    {
      async function fetchDonorData() {
      let response = await axios.get(`http://localhost:5000/donor/${user?.result._id}`) // fetch from donor also
      setDonorProfile(response.data)
      console.log(response.data.name);
    }
    fetchDonorData()
  }

  const token = user?.token; // check if token exists

  // JSON web token (Manual login)
  if (token) {
    const decodedToken = decode(token); // check when the token expires

    if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logout once token expired
  }

  // Google acc login
  setUser(JSON.parse(localStorage.getItem("profile")));
}, [location]); // when location change, set the user



return (
  <AppBar className={classes.appBar} position="static" color="inherit">
      
      {/* <Typography
        component={Link}
        to="/"
        className={classes.heading}
        variant="h1"
        align="center"
      >*/
      <Container disableGutters = "true" maxWidth = "xl">
        <Grid  container>
          <Grid item xs={3}>
            <Link className={classes.header}  to ="/">
                <div className={classes.verticalCenter}>
                  <img className={classes.image} src={mypic} alt="mypic"/>
                  <Typography className={classes.headerTitle} variant="h5"  component="div">
                    SGDONATIFY
                  </Typography>
                </div>
            </Link>
          </Grid>
          <Grid className={classes.searchBar} item xs={6}>
            <Searchbar setText={setText} />
          </Grid>
          <Grid  item xs={3} sx={{paddingRight:"10px"}}>
            <div className={classes.profilePanel}>
              <div className={classes.verticalCenter}>
                <ProfilePanel />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      /*
      </Typography> */}
      {/* <Link to ="/DisplayListings" style={{textDecoration:'none'}}><Button variant="contained" color="primary"> Search Donation Listings </Button></Link>
      <Link to ="/LocateCC" style={{textDecoration:'none'}} ><Button variant="contained" color="primary"> Locate CC </Button></Link> */}
                                                                                                                                                                                  {/* <img
                                                                                                                                                                                    className={classes.image}
                                                                                                                                                                                    src={mypic}
                                                                                                                                                                                    alt="mypic"
                                                                                                                                                                                    height="60"
                                                                                                                                                                                  /> */}
                                                                                                                                                                                  {/* <Box sx={{ ml: 2 }} >
                                                                                                                                                                                    <Button variant="contained" onClick={handleAnchorClick}> View Past No. of applications</Button>
                                                                                                                                                                                    <Popover
                                                                                                                                                                                      open={open}
                                                                                                                                                                                      anchorEl={anchorEl}
                                                                                                                                                                                      onClose={handleAnchorClose}
                                                                                                                                                                                      anchorOrigin={{
                                                                                                                                                                                        vertical: 'bottom',
                                                                                                                                                                                        horizontal: 'left',
                                                                                                                                                                                      }}
                                                                                                                                                                                    >
                                                                                                                                                                                      <iframe width="800" height="800" src="https://data.gov.sg/dataset/number-of-applications-registered-for-resale-flats/resource/dea41bef-7116-43ba-9f2f-f13bfbf876d2/view/ae7cd44a-5866-4750-95d3-10e538ac4c84"
                                                                                                                                                                                        frameBorder="0.5">
                                                                                                                                                                                      </iframe>
                                                                                                                                                                                    </Popover>
                                                                                                                                                                                  </Box> */}
     


    
    {/* User Logic here */}
    {/* <Toolbar className={classes.toolbar}>
      {user?.result ? ( // if user exists, (login)
        <div className={classes.profile}>
          {
           user?.result.type !== "admin" ? ( 
            user?.result.type === "donatee" ?(
            <a href="/donateeProfile">
            <Avatar
              // className={classes.purple}
              alt={user?.result.name}
              src={user?.result.profile_pic}
            >
              {user?.result.name.charAt(0)}
              
            </Avatar></a>):(
            // Tis is Donor  
            <a href="/donorProfile">
              <Avatar
                // className={classes.purple}
                alt={user?.result.name}
                src={user?.result.profile_pic}
              >
                {user?.result.name.charAt(0)}
                
              </Avatar></a>)
          ) : (
            
            <Avatar 
              // className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
          )}
          <Typography className={classes.userName} variant="h6"> */}

                                                                                                                                                                                    {/* {user?.result.type === "user" ? (     
                                                                                                                                                                                    userProfile?.name
                                                                                                                                                                                    ) : (user?.result.type === "donor"?      
                                                                                                                                                                                    (donorProfile?.name):(user?.result.name)
                                                                                                                                                                                    )} */}
                  
                  {/* {user?.result.type === "donatee" ? (     
                  donateeProfile?.name
                  ) : (user?.result.type === "donor"?      
                  (donorProfile?.name): (user?.result.name) // else admin
                  )}

          </Typography>

          {user.result.type !== "donatee" ? (

            user.result.type === "admin" ? (
              <Button component={Link} to="/DonorList" className={classes.purple} variant="contained"  >
                Admin Dashboard
              </Button>

            ) : (
              <Button component={Link} to="/donorHub" className={classes.purple} variant="contained"  >
                Donor Hub
              </Button>

            ) // not sure if shud add Donateehub?? (See how first)

          ) : (
            <>

              <Button component={Link} to="/createForm" className={classes.orange} variant="contained" endIcon={<SendIcon />}>
                My Request Forms
              </Button>


            </>
          )}

          <Button
            variant="contained"
            className={classes.logout}
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      ) : (
        // else (not login)
        <div> */}
                                                                                                                                                                                    {/* <Button component={Link} to="/" className={classes.purple} variant="contained" endIcon={<SendIcon />}>
                                                                                                                                                                                        Search for Forms
                                                                                                                                                                                    </Button> */}
          {/* <Button
            component={Link}
            to="/donor"
            variant="contained"
            color="primary"
          >
            Donor Sign In
          </Button>

          <Button
            component={Link}  
            to = "/donatee"
            variant="contained"
            color="primary"
          >
            Donatee Sign In
          </Button> */}

                                                                                                                                                                                            {/* <Button
                                                                                                                                                                                              component={Link}
                                                                                                                                                                                              to="/auth"
                                                                                                                                                                                              variant="contained"
                                                                                                                                                                                              color="primary"
                                                                                                                                                                                            >
                                                                                                                                                                                              User Sign In
                                                                                                                                                                                            </Button> */}
        {/* </div>
      )}
    </Toolbar> */}
  </AppBar>
);
};

export default Navbar;
