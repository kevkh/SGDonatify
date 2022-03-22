import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState } from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button,Paper } from '@mui/material'
import {getDonation} from '../../actions/donationListing.js'
import IndividualDonationListing from "../DonationListing/IndividualDonationListing"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


const ViewMyRequests = () => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user.result._id
    const donationListings = useSelector(state => state.donationListings)
    const [filteredListings, setFilteredListings] = useState([])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    /////
    useEffect (() => {
        dispatch(getDonation())
    },[])

    useEffect (() => {

        setFilteredListings(donationListings.filter((listing)=> listing.createdById == userId))

    },[donationListings])

    
  return (
   <Grid container spacing={5} sx={{ml:'15%',mr:'15%'}}>
            {filteredListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index}/>))}
    </Grid>
  )
}

export default ViewMyRequests