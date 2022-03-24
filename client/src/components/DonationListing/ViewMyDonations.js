import React from 'react'
import { Box,Grid,Container, Card, Button } from '@mui/material'
import IndividualDonationListing from './IndividualDonationListing'
import {useSelector,useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {getDonation} from '../../actions/donationListing.js'
import Axios from 'axios'
import { deepPurple } from '@material-ui/core/colors';
import {  Link, useHistory, useLocation } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const ViewMyDonations = () => {

    const dispatch = useDispatch()
    const donationListings = useSelector(state => state.donationListings)
    const [filteredDonationListings,setFilteredDonationListings] = useState([])
    const user = JSON.parse(localStorage.getItem('profile'))
    const [allDonatedListing,setAllDonatedListing] = useState([])
    const [donationDetails,setDonationDetails] = useState({})

    useEffect(() => {
        
        const fetchDonorData = async () => {
            let response = await Axios.get(`http://localhost:5000/donor/${user?.result._id}`)
            if (response.data.donation_details){ 
            setAllDonatedListing(Object.keys(response.data.donation_details))
            setDonationDetails(response.data.donation_details)
            }
        }
        dispatch(getDonation())
        fetchDonorData()

    }, [])

    useEffect (() => {

        setFilteredDonationListings(donationListings.filter((listing)=> allDonatedListing.includes(listing._id)))

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
                  sx={{height:"50px",  backgroundColor: deepPurple[500]}}
                  variant ='contained'
                  startIcon =  {<LocationOnIcon />}
                  component={Link} to="/locateCC"

                  >
                  Locate CC
              </Button>
            </box>
          </Grid>
        </Grid>
    <Grid container spacing={5}>
        {filteredDonationListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index} showDonatedAmount donationDetails={donationDetails}/>))}
    </Grid>
    </Container>        
  )
}

export default ViewMyDonations