import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import useStyles from "./styles";

const DonationRequest = ({singleListing,index}) => {

const classes = useStyles();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oc", "Nov", "Dec"]
const date = new Date(singleListing.dateCreated)

  return (
      <Grid item xs={4}>
          <Link to={`/DisplayListings/${singleListing._id}`} style={{ textDecoration: 'none',color:'black', }}>
          <Box sx={{ backgroundColor: 'white',  display: 'flex', borderRadius: 3, p:3 }}>
              <Stack sx={{ ml: 1,mr:3 }}>
                  <Avatar sx={{ my: 1,ml:1, width: '75px', height: '75px' }} />
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