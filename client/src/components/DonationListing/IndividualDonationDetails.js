import React from 'react'
import { Box,Stack,Typography,Container,Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card'
import { useLocation,Link, useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getDonation,updateDonation} from '../../actions/donationListing.js'
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
    const isDonor = user?.result?.type === 'donor'

    const placeholderDescription = `This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. 
    This is a description. This is a description. This is a description. This is a description.This is a description. This is a description.`

    useEffect (() => {

        dispatch(getDonation())
            
    },[])

    const handleClose = () => {

        history.push("/ViewRequests")
    }

    const changeRequest = (amount) => {

        const type = 'status'
        dispatch(updateDonation(id, {type , amount }))

    }

    return (
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px"}}>
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <Card>
                        <CardMedia
                            component="img"
                           
                            image="https://picsum.photos/id/239/1000/1000"
                        />
                    </Card>
                </Grid>
                <Grid item xs={7}>
                    <Stack sx={{backgroundColor:"white", borderRadius:"5px",  padding:2}}>
                        <Grid container sx={{mb: 1}}>
                            
                            
                            <Grid item xs={11}>
                                <Typography variant="h3">{donationDetails[0]?.name}</Typography>
                            </Grid>
                            { isAdmin &&
                                <Grid item xs={1}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
                                        <CancelSharpIcon color='error' fontSize="large" onClick={handleClose} />
                                    </Box>
                                </Grid>
                            }
                        </Grid>
                        {isAdmin && donationDetails[0]?.status == 'Pending' &&
                                
                            <Box sx={{ display: 'flex', flexDirection: 'row',gap:3, my:1 }}>
                                <Button variant='contained' color='error' onClick={()=>changeRequest('Rejected')}>Reject</Button>
                                <Button variant='contained' color='success' onClick={()=>changeRequest('Approved')}>Accept</Button>
                            </Box>
                                
                        }
                        <Grid sx={{my: 1}}>
                            <Typography  variant='h5'>{date?.getDate()}/{date?.getMonth()}/{date?.getFullYear()}</Typography>
                        </Grid>
                        <Grid sx={{my: 1}}>
                            <Typography sx={{wordWrap:"break-word"}} variant='h5' align="justify">{donationDetails[0]?.description == undefined? placeholderDescription: donationDetails[0]?.description}</Typography>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" color="secondary" sx={{ height: 10, borderRadius: 1 }} value={progress} />
                            </Box>
                            <Box>
                                <Typography>{progress}%</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{mt:10}} variant="h4">${donationDetails[0]?.totalAmountCollected} collected of ${donationDetails[0]?.donationValue}</Typography>
                        
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
        </Container>
  )
}

export default IndividualDonationDetails