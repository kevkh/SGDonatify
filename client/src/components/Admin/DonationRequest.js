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


const images= [
    "https://i.picsum.photos/id/528/200/200.jpg?hmac=PsanXgBpbVkZomXAZNZvSK7VAIwkqbc0O9EMxtlgO_8",
    "https://i.picsum.photos/id/652/200/200.jpg?hmac=m_Z74HS-9l6n785rv5t2r3riTmdwuq-Z0rMJz9iHg5g",
    "https://i.picsum.photos/id/324/200/200.jpg?hmac=qhw4ORwk8T1r-Rxd2QREZORSVvc6l_R1S6F3Pl9mR_c",
    "https://i.picsum.photos/id/47/200/200.jpg?hmac=dF66rvzPwuJCh4L7IjS6I0D5xrpPvqhAjbE7FstnEnY",
    "https://i.picsum.photos/id/621/200/200.jpg?hmac=nKMlm18QmBAMa_wHA70nsMBpYKk0pU0C832236i2oMM"
]







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
                  <Avatar sx={{ my: 1,ml:1, width: '90px', height: '90px' }}
                        variant="square" 
                          src={singleListing.selectedImage || images[Math.floor(Math.random() * images.length)]}
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