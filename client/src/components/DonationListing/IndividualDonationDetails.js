import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button } from '@mui/material'
import { useLocation,Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getDonation} from '../../actions/donationListing.js'
import CardMedia from '@mui/material/CardMedia';
import {useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const IndividualDonationDetails = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const donationListings = useSelector(state => state.donationListings)
    const url = location.pathname.split("/")
    const id = url[2]
    const donationDetails =  donationListings.filter((listing)=> listing._id === id)
    const date = new Date(donationDetails[0]?.dateCreated)
    const progress = Math.round((donationDetails[0]?.totalAmountCollected/donationDetails[0]?.donationValue)*100)

    useEffect (() => {

        dispatch(getDonation())
            
    },[])

    

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
                    <Typography variant='h3'>{donationDetails[0]?.name}</Typography>
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
                    <Grid columns={2} container spacing={0}  rowSpacing={2} >
                        <Grid item xs={1}>
                            <Link to="?" style={{ textDecoration: 'none' }}><Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" >Donate $5</Button></Link>
                        </Grid>

                        <Grid item xs={1}>
                            <Link to="?" style={{ textDecoration: 'none' }}><Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" >Donate $10</Button></Link>
                        </Grid>

                        <Grid item xs={1}>
                            <Link to="?" style={{ textDecoration: 'none' }}><Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" >Donate $50</Button></Link>
                        </Grid>

                        <Grid item xs={1}>
                            <Link to="?" style={{ textDecoration: 'none' }}><Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" >Donate $1000</Button></Link>
                        </Grid>
                    </Grid >
                </Stack>
            </Grid>
        </Grid>
  )
}

export default IndividualDonationDetails