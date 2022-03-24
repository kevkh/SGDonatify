import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState } from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button,Paper } from '@mui/material'
import {getAllDonation} from '../../actions/donationListing.js'
import IndividualDonationListing from "../DonationListing/IndividualDonationListing"
import ArticleIcon from '@mui/icons-material/Article';
import {  Link, useHistory, useLocation } from "react-router-dom";
import { deepOrange } from '@material-ui/core/colors';
import AddIcon from '@mui/icons-material/Add';
import { deepPurple } from '@material-ui/core/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ViewMyRequests = () => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user.result._id
    const donationListings = useSelector(state => state.donationListings)
    const [filteredListings, setFilteredListings] = useState([])

    useEffect (() => {

        dispatch(getAllDonation())

    },[])

    useEffect (() => {

        setFilteredListings(donationListings.filter((listing)=> listing.createdById == userId))

    },[donationListings])

  return (
      <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px", mb:5}}>
        <Grid container spacing={5} >
          <Grid item xs={4} >
            <Card sx={{height:"50px"}} style={{ display:'flex', justifyContent:'center', borderRadius:'30px' }}>
              <ArticleIcon fontSize="large" sx={{margin:1}}/>
              <Box fontWeight="fontWeightBold" align="center" sx={{ fontSize: 'h4.fontSize', fontFamily: 'Monospace', margin:'auto 0'}}>My Requests</Box>
            </Card>
          </Grid>
          <Grid item xs={8} sx={{display:"flex", flexDirection:"row-reverse"}}>
            <box>
              <Button 
                  sx={{mr:2, height:"50px",  backgroundColor: deepPurple[500]}}
                  variant ='contained'
                  startIcon =  {<LocationOnIcon />}
                  component={Link} to="/locateCC"

                  >
                  Locate CC
              </Button>
              <Button 
                sx={{height:"50px",  backgroundColor: deepOrange[500]}}
                variant ='contained'
                startIcon =  {<AddIcon />}
                component={Link} to="/CreateRequests"

                >
                Create Requests
              </Button>
            </box>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
                {filteredListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index}/>))}
        </Grid>
      </Container>
  )
}

export default ViewMyRequests