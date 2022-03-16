import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const DonationRequest = ({singleListing,index}) => {

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oc", "Nov", "Dec"]
const date = new Date(singleListing.dateCreated)

  return (
      <Grid item xs={4}>
          <Link to={`/DisplayListings/${singleListing._id}`} style={{ textDecoration: 'none',color:'black' }}>
          <Box sx={{ backgroundColor: 'white', mr: 2, display: 'flex', borderRadius: 3 }}>
              <Stack sx={{ ml: 1,mr:3 }}>
                  <Avatar sx={{ my: 1,ml:1, width: '75px', height: '75px' }} />
                  {/* <Button disabled variant="contained">Pending</Button> */}
              </Stack>
              <Stack sx={{ flexGrow: 1 }}>
                  <Typography variant="h3">{singleListing.name}</Typography>
                  <Typography variant="h4">By {singleListing.createdBy}</Typography>
                  <Typography variant="h4">Posted on {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</Typography>
                  <Typography variant="h5">{singleListing.status}</Typography>
              </Stack>
          </Box>
          </Link>
      </Grid>
  )
}

export default DonationRequest