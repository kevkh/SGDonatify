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
      <Box sx={{display:'flex'}}  > 
    <Stack>
        <img src={listingCreator?.profile_pic} width="400" ></img>
        <Typography variant="h3">{listingCreator?.name}</Typography>
    </Stack>
   <Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
            <CancelSharpIcon color='error' fontSize="large" onClick={handleClose} />
        </Box>
       <Typography variant="h3">Email: {listingCreator?.email}</Typography>
       <Typography variant="h3">Contact Number: {listingCreator?.phoneNumber}</Typography>
       <Typography variant="h3">Sex: {listingCreator?.gender}</Typography>
       <Typography variant="h3">Date of Birth: {listingCreator?.dob}</Typography>
       <Typography variant="h3">Address: {listingCreator?.address}</Typography>
       <Typography variant="h3">Household Income Documents: </Typography>
   </Stack>

      </Box>
  )
}

export default ViewDonateeProfile