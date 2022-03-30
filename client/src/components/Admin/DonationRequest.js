import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Link, useParams, useLocation } from 'react-router-dom'
import useStyles from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";

const DonationRequest = ({singleListing,index}) => {

const classes = useStyles();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oc", "Nov", "Dec"]
const date = new Date(singleListing.dateCreated)

// Fetch donatee info
const user = JSON.parse(localStorage.getItem("profile"));  // currently fetching admin 
const [donateeProfile, setDonateeProfile] = useState("");


useEffect(() => {
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/donatee/${user.result._id}`
      );
      //setDonateeProfile(response.data);
      console.log(response.data)
      
    }
    fetchData();
  }, []);


  return (
      <Grid item xs={4}>
          <Link to={`/DisplayListings/${singleListing._id}`} style={{ textDecoration: 'none',color:'black', }}>
          <Box sx={{display: 'flex', borderRadius: 3, p:3,background: "white",  
            '&:hover': { color: "white",
                        background: (singleListing.status === "Pending" ? "gray": 
                                    singleListing.status === "Approved" ? "green":
                                    singleListing.status === "Rejected" ? "red":"")} }}>
              <Stack sx={{ ml: 1,mr:3 }}>

                  {/* Display Donatee's Profile Pic */}
                  <Avatar sx={{ my: 1,ml:1, width: '75px', height: '75px' }}
                          //src={donateeProfile.profile_pic} 
                          />            

                  <Typography variant="h6"  sx={{color:'white', 
                  backgroundColor: (singleListing.status === "Pending" ? "gray": 
                                    singleListing.status === "Approved" ? "green":
                                    singleListing.status === "Rejected" ? "red":""), 
                  padding:1, borderRadius:"5%"}}>{singleListing.status}</Typography>
                  {/* <Button disabled variant="contained">Pending</Button> */}
              </Stack>
              <Stack sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" className={classes.Title}>{singleListing.name}</Typography>
                  <Typography variant="h5">By {singleListing.createdBy}</Typography>
                  <Typography variant="h5">Posted on {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Typography>
                  
              </Stack>
          </Box>
          </Link>
      </Grid>
  )
}

export default DonationRequest