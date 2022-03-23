import React from 'react'
import { Box,Grid,Container } from '@mui/material'
import IndividualDonationListing from './IndividualDonationListing'
import {useSelector,useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {getDonation} from '../../actions/donationListing.js'
import Axios from 'axios'

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
    <Grid container spacing={5}>
        {filteredDonationListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index} showDonatedAmount donationDetails={donationDetails}/>))}
    </Grid>
    </Container>        
  )
}

export default ViewMyDonations