import React from 'react'
import {useEffect, useState } from 'react'
import Axios from 'axios'
import { useLocation,Link, useHistory} from 'react-router-dom'
import { Box,Stack,Typography,Container,Button, Avatar } from '@mui/material'
import CancelSharpIcon from '@mui/icons-material/CancelSharp'

const ViewDonateeProfile = () => {

    const history = useHistory()
    const location = useLocation()
    const [listingCreator, setlistingCreator] = useState(null)
    const url = location.pathname.split("/")
    const Id = url[2]
    const listingId = url[3]
    
    
    const handleClose = () => {
        
        history.push(`/DisplayListings/${listingId}`)
    }

    useEffect (() => {

        const fetchUser = async () => {
            let res = await Axios.get(`http://localhost:5000/donatee/${Id}`)
            setlistingCreator(res.data)
        }

        fetchUser()
            
    },[])
    
  return (
      <Box sx={{display:'flex', ml:"15%"}}  > 
    <Stack rowGap={2} sx={{mt:7}} >
        <img src={listingCreator?.profile_pic} width="300" ></img>
        <Typography variant="h3">{listingCreator?.name}'s details</Typography>
    </Stack>
   <Stack sx={{ml:5}} rowGap={2}>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
            <CancelSharpIcon color='error' fontSize="large" onClick={handleClose} />
        </Box>
       <Typography variant="h3">Email: {listingCreator?.email}</Typography>
       <Typography variant="h3">Contact Number: {listingCreator?.phoneNumber}</Typography>
       <Typography variant="h3">Sex: {listingCreator?.gender}</Typography>
       <Typography variant="h3">Date of Birth: {listingCreator?.dob}</Typography>
       <Typography variant="h3">Address: {listingCreator?.address}</Typography>
       <Typography variant="h3">Household Income Documents: 
        <object width="100%" height="400" data= {listingCreator?.income_docs} type="application/pdf">   </object>
       </Typography>
   </Stack>

      </Box>
  )
}

export default ViewDonateeProfile