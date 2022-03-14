import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button } from '@mui/material'
import { useLocation,Link, useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getDonation} from '../../actions/donationListing.js'
import CardMedia from '@mui/material/CardMedia';
import {useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import TermsnConditions from './TermsnConditions.js'
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

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

    useEffect (() => {

        dispatch(getDonation())
            
    },[])

    const handleClose = () => {

        history.push("/ViewRequests")
    }

    

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
                    
                   {isAdmin && 
                   <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mb:2}}>
                            <CancelSharpIcon color='error' fontSize="large" onClick={handleClose} />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ flexGrow: 1 }} variant='h3'>{donationDetails[0]?.name}</Typography>
                            <Box sx={{ display: 'flex' }}>
                                <Button variant='contained' color='success' sx={{ mr: 5 }}>Accept</Button>
                                <Button variant='contained' color='error'>Reject</Button>
                            </Box>
                        </Box>
                    </Box>}
                    <Typography variant='h5'>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</Typography>
                    <Typography sx={{wordWrap:"break-word"}} variant='h5' align="justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus hendrerit 
                    arcu nec dignissim. Vestibulum elementum urna eget rutrum maximus. Nullam ornare tellus augue, eu luctus sem iaculis ut. Nam dignissim purus ac massa fringilla 
                    sagittis. Phasellus congue velit vehicula eros finibus rutrum. Duis sed nunc congue mi congue suscipit.</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" color="secondary" sx={{ height: 10, borderRadius: 1 }} value={progress} />
                        </Box>
                        <Box>
                            <Typography>{progress}%</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{mt:10}} variant="h4">${donationDetails[0]?.totalAmountCollected} collected of ${donationDetails[0]?.donationValue}</Typography>
                    
                    {!isAdmin && <Grid columns={2} container spacing={0}  rowSpacing={2} >
                    
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