import React from 'react'
import { useState, useEffect,useRef } from 'react'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'
import Filter from './Filter'
import { Box,Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination';
import Map from '../Property/Map'; // Import map
import Loader from '../Property/Loader';
import {getDonation} from '../../actions/donationListing.js'
import {useSelector,useDispatch} from 'react-redux'
import IndividualDonationListing from "../DonationListing/IndividualDonationListing"
import Container from '@mui/material/Container';
import useStyles from "./styles";
import { shadows } from '@mui/system';
const DisplayListings = ({text}) => {
   
    const classes = useStyles();
    const dispatch = useDispatch()
    const donationListings = useSelector(state => state.donationListings)
    const [filteredDonationListings,setFilteredDonationListings] = useState([])
    const [pagenatedDonationListings, setpagenatedDonationListings] = useState([])
    const [closeAlert, setCloseAlert] = useState()
    const [sort,setSort] = useState("")
    const [update,setUpdate] = useState(true)
    

    
    const [pagenationLength, setPagenationLength] = useState(0)
    const [page,setPage] = useState(1)


    const handleChange = (event, value) => {
       
        if (value >= 1 && value <= pagenationLength) {
            setPage(value)
            const indexOfLastPost = value * 6
            const indexOfFirstPost = indexOfLastPost - 6
            setpagenatedDonationListings(filteredDonationListings.slice(indexOfFirstPost, indexOfLastPost))
            window.scrollTo(0, 0)
        }
      }

    const compareDate = (a, b, flag) => {

        const dateA = new Date(a.dateCreated)
        const dateB = new Date(b.dateCreated)
        if (flag)
            return dateA.getTime() < dateB.getTime() ? 1 : -1
        else
            return dateA.getTime() > dateB.getTime() ? 1 : -1
    }

    const sortDonations = (sort) => {

        switch (sort) {
            case "Newest":
                filteredDonationListings.sort((a,b)=>compareDate(a,b,true))
                break
            case "Oldest":
                filteredDonationListings.sort((a,b)=>compareDate(a,b,false))
                break
            case "Highest Amount":
                filteredDonationListings.sort((a, b) => (a.donationValue < b.donationValue ? 1 : -1))
                break
            case "Lowest Amount":
                filteredDonationListings.sort((a, b) => (a.donationValue > b.donationValue ? 1 : -1))
                break
            default:
                filteredDonationListings.sort((a,b)=>compareDate(a,b,true))

        }
    }

    const filterDonations = (text) => {
      
        if (text == "")
        setFilteredDonationListings(donationListings.filter((listing)=> listing.status == 'Approved'))//[...donationListings]//
        else
        setFilteredDonationListings(donationListings.filter((listing)=> listing.status == 'Approved' && listing.name.toLowerCase() == text))
        
    }

    useEffect (() => {

        dispatch(getDonation())

    },[])

    useEffect (() => {

        filterDonations(text)

    },[donationListings,sort,text])

    
    useEffect(() => {

        sortDonations(sort)
        if (filteredDonationListings.length < 1)
            setCloseAlert(true)
        else
            setPagenationLength(Math.ceil(filteredDonationListings.length / 6))
        
        var endIndex = 6
        if (filteredDonationListings.length < 6)
        endIndex = filteredDonationListings.length
        setpagenatedDonationListings(filteredDonationListings.slice(0, endIndex))
        setPage(1)

        setCloseAlert(true)

    }, [sort,filteredDonationListings])
    

    return (
        
        // <Box sx={{}}>  
        // <Box>
        <div>
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px"}}>
            <Grid  container>
                <Grid item xs={3}>
                    <Filter  sx={{ boxShadow: 3 }} sort={sort} setSort={setSort} ></Filter>
                </Grid>
                <Grid item xs={9}>
                    <div sx={{ boxShadow: 3 }} className={classes.paginationContainer}>
                        <div className={classes.verticalCenter}>
                           {pagenatedDonationListings.length >= 1 && <Pagination className={classes.pagination} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px", mb:5}}>
            <Grid container spacing={5}>
            {pagenatedDonationListings.map((singleListing, index) => (<IndividualDonationListing singleListing={singleListing} key={index}/>))}
            </Grid>
        </Container>
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px",mb:5}}>
            <Grid  container>
                <Grid item xs={3}>
                    {/* <Filter  sx={{ boxShadow: 3 }} sort={sort} setSort={setSort} ></Filter> */}
                </Grid>
                {/* Listing details here */}
                <Grid item xs={9}>
                    <div sx={{ boxShadow: 3 }} className={classes.paginationContainer}>
                        <div className={classes.verticalCenter}>
                           {pagenatedDonationListings.length >= 1 && <Pagination className={classes.pagination} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
        </div>

        // </Box>
                
            // <Box sx={{my:2}}>
            //         </Box>
        //      {/* <Box sx={{ display: 'flex', flexWrap:'wrap', justifyContent:"space-evenly", flexDirection: 'row'}}> */}
        //             {pagenatedDonationListings.length < 1 && closeAlert &&
        //                 <Alert sx={{ mt: 2, maxWidth:"15%"}} severity="error" action={<IconButton size='small' onClick={() => { setCloseAlert(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>}
        //                     >
        //                     <AlertTitle>Error</AlertTitle>
        //                     <strong> No listings found. Please try again. </strong>
        //                 </Alert>}

                   // {pagenatedDonationListings.length < 1 ? <CircularProgress/> :   
                   

                
        //     {/* </Box> */}
        //     <Box sx={{my:5}}>
        //         {pagenatedDonationListings.length >= 1 && <Pagination sx={{ paddingLeft:"45%"}} size="large" count={pagenationLength} color="primary" page={page} onChange={handleChange} showFirstButton showLastButton />}
        //     </Box>    
        // </Box>

    )

}

export default DisplayListings