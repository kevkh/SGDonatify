import React from 'react'
import Button from '@mui/material/Button';
import { Box,Card,Stack,Typography,Container,Grid } from '@mui/material'
import {useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getDonation} from '../../actions/donationListing.js'
import IndividualDonationListing from '../DonationListing/IndividualDonationListing.js';
import DonationRequest from './DonationRequest.js';

const ViewRequests = () => {

    const dispatch = useDispatch()
    const donationRequests = useSelector(state => state.donationListings)
    const [sortedDonationRequests,setSortedDonationRequests] = useState()

    const[btnAll, setBtnAll] = useState("contained")
    const[btnPending, setBtnPending] = useState("outlined")
    const[btnApproved, setBtnApproved] = useState("outlined")
    const[btnRejected, setBtnRejected] = useState("outlined")

    const compareDate = (a, b, flag) => {

        const dateA = new Date(a.dateCreated)
        const dateB = new Date(b.dateCreated)
        if (flag)
            return dateA.getTime() < dateB.getTime() ? 1 : -1
        else
            return dateA.getTime() > dateB.getTime() ? 1 : -1
    }

    const sortDonations = (sort) => {
        let tempdonationRequests = []
        switch (sort) {
            case "all":
                setSortedDonationRequests([...donationRequests])
                setBtnAll("contained")
                setBtnPending("outlined")
                setBtnApproved("outlined")
                setBtnRejected("outlined")
                break
            case "pending":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Pending")
                tempdonationRequests.sort((a,b)=> a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)
                setBtnAll("outlined")
                setBtnPending("contained")
                setBtnApproved("outlined")
                setBtnRejected("outlined")
                break
            case "approved":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Approved")
                tempdonationRequests.sort((a,b)=>a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)
                setBtnAll("outlined")
                setBtnPending("outlined")
                setBtnApproved("contained")
                setBtnRejected("outlined")
                break
            case "rejected":
                tempdonationRequests = donationRequests.filter((listing) => listing.status ==  "Rejected")
                tempdonationRequests.sort((a,b)=>a.name> b.name)
                setSortedDonationRequests(tempdonationRequests)
                setBtnAll("outlined")
                setBtnPending("outlined")
                setBtnApproved("outlined")
                setBtnRejected("contained")
                break
            default:
                setSortedDonationRequests([...donationRequests])

        }
    }

    useEffect(() => {

       dispatch(getDonation())

    },[])
    
    useEffect (() => {

        sortDonations("")

    }, [donationRequests])



  return (
      <Box sx={{ ml: '15%',mr: '15%'}}>
          <Box sx={{display:'flex', columnGap:2 }} >
              <Button variant={btnAll} sx={{ borderRadius: 10}} onClick={()=>sortDonations('all')}>ALL</Button>
              <Button variant={btnPending} sx={{ borderRadius: 10}} onClick={()=>sortDonations('pending')}>PENDING</Button>
              <Button variant={btnApproved} sx={{ borderRadius: 10}} onClick={()=>sortDonations('approved')}>APPROVED</Button>
              <Button variant={btnRejected} sx={{ borderRadius: 10}} onClick={()=>sortDonations('rejected')}>REJECTED</Button>
          </Box>
            <Grid container spacing={3} sx={{mt:2, mb:2}}>
                {sortedDonationRequests?.map((singleListing, index) => (<DonationRequest singleListing={singleListing} key={index} />))}
            </Grid>
      </Box>
  )
}

export default ViewRequests