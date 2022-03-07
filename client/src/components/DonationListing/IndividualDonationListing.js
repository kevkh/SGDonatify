import React from 'react'
import { Box,Card,Stack,Typography,Container,Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


const individualDonationListing = ({singleListing, index}) => {


    const progress = Math.round((singleListing.totalAmountCollected/singleListing.donationValue)*100)
    const date = new Date(singleListing.dateCreated)

    return (
   
      <Grid item xs={4}>
        <Card sx={{minWidth:"100%",height:"100%", my:2}}>
        <Link to={`/DisplayListings/${singleListing._id}`} target={"_blank"} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        
            <Box sx={{ position: 'relative'}}>
            <CardActionArea>
                
                <CardMedia
                component="img"
                height="400"
                image="https://picsum.photos/id/239/750/500"
                />
                
            </CardActionArea>
            </Box>

            <Stack spacing={3} sx={{ m:3 }}>

                <Typography variant="h3">{singleListing.name}</Typography>
                <Typography variant="h5">{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" color="secondary" sx={{ height: 10, borderRadius: 1 }} value={progress} />
                        </Box>
                        <Box>
                            <Typography>{progress}%</Typography>
                        </Box>
                    </Box>
                <Typography sx={{mt:10}} variant="h4">${singleListing.totalAmountCollected} collected of ${singleListing.donationValue}</Typography>
            </Stack>
            </Link>
        </Card>
        
    </Grid>
    )
}

export default individualDonationListing