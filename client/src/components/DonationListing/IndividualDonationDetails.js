import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button } from '@mui/material'
import { useLocation,Link, useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getDonation,updateDonation} from '../../actions/donationListing.js'
import CardMedia from '@mui/material/CardMedia';
import {useEffect, useState} from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import TermsnConditions from './TermsnConditions.js'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import axios from "axios";

const IndividualDonationDetails = () => {

    const location = useLocation()
    let history = useHistory();
    const dispatch = useDispatch()
    const donationListings = useSelector(state => state.donationListings)
    const url = location.pathname.split("/")
    const id = url[2]
    const donationDetails =  donationListings.filter((listing)=> listing._id === id)
    const date = new Date(donationDetails[0]?.dateCreated)
    const value = (donationDetails[0]?.totalAmountCollected/donationDetails[0]?.donationValue)*100
    const progress = Math.round(value*10)/10
    const user = JSON.parse(localStorage.getItem('profile'))
    const isAdmin = user?.result?.type === 'admin'
    const isDonor = user?.result?.type === 'donor'
    const createdBy = donationDetails[0]?.createdById  // donateeID that created the req
    
    const [userProfile, setUserProfile] = useState("");

    const placeholderDescription = `This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. 
    This is a description. This is a description. This is a description. This is a description.This is a description. This is a description.`

    useEffect (() => {
        async function fetchData() {
            console.log(user.result._id);
            let response = await axios.get(
              `http://localhost:5000/donatee/${createdBy}`
            );
            setUserProfile(response.data);
            console.log(response.data);
          }
        fetchData();
        dispatch(getDonation())
            
    },[])

    

    const handleClose = () => {

        history.push("/ViewRequests")
    }

    const changeRequest = (amount) => {

        const type = 'status'
        dispatch(updateDonation(id, {type , amount }))

    }

    console.log(donationDetails[0]?.description)
    console.log(createdBy)

    return (
   
        <Grid sx={{ml:"15%"}} container spacing={20}>
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="750"
                        image="https://picsum.photos/id/239/1000/1000"
                    />
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Stack spacing={4} sx={{maxWidth:"30%"}}>
                        { isAdmin &&
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mb:2}}>
                            <CancelSharpIcon color='error' fontSize="large" onClick={handleClose} />
                        </Box>}
                   {isAdmin && donationDetails[0]?.status == 'Pending' &&
                   <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse',gap:3 }}>
                            <Button variant='contained' color='error' onClick={()=>changeRequest('Rejected')}>Reject</Button>
                            <Button variant='contained' color='success' onClick={()=>changeRequest('Approved')}>Accept</Button>
                        </Box>
                        
                    </Box>}
                    <Typography variant="h3">{donationDetails[0]?.name}</Typography>
                    <Typography variant='h5'>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</Typography>
                    <Typography sx={{wordWrap:"break-word"}} variant='h5' align="justify">{donationDetails[0]?.description == undefined? placeholderDescription: donationDetails[0]?.description}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" color="secondary" sx={{ height: 10, borderRadius: 1 }} value={progress} />
                        </Box>
                        <Box>
                            <Typography>{progress}%</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{mt:10}} variant="h4">${donationDetails[0]?.totalAmountCollected} collected of ${donationDetails[0]?.donationValue}</Typography>

                    <object width="100%" height="400" data= {userProfile.income_docs} type="application/pdf">   </object>
  
                    {isDonor && <Grid columns={2} container spacing={0}  rowSpacing={2} >
                    
                       <Grid item xs={1}>
                            <TermsnConditions custom={false} id={id} buttonValue="$5" donationValue = {[donationDetails[0]?.totalAmountCollected,donationDetails[0]?.donationValue]}/>
                        </Grid>

                        <Grid item xs={1}>
                            <TermsnConditions custom={false} id={id} buttonValue="$10" donationValue = {[donationDetails[0]?.totalAmountCollected,donationDetails[0]?.donationValue]}/>
                        </Grid>

                        <Grid item xs={1}>
                            <TermsnConditions custom={false} id={id} buttonValue="$50" donationValue = {[donationDetails[0]?.totalAmountCollected,donationDetails[0]?.donationValue]}/>
                        </Grid>

                        <Grid item xs={1}>
                            <TermsnConditions custom={false} id={id} buttonValue="$1000" donationValue = {[donationDetails[0]?.totalAmountCollected,donationDetails[0]?.donationValue]}/>
                        </Grid>

                        <Grid item xs={2}>
                            <TermsnConditions custom id={id} buttonValue="Custom Amount" donationValue = {[donationDetails[0]?.totalAmountCollected,donationDetails[0]?.donationValue]}/>
                        </Grid>

                    </Grid >}
                </Stack>
            </Grid>
        </Grid>
  )
}

export default IndividualDonationDetails