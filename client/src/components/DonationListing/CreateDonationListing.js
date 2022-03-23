import React from 'react'
import {useEffect,useState } from 'react'
import { Box,Card,Stack,Typography,Container,Grid,Button,Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import {useSelector,useDispatch} from 'react-redux'
import { createDonation } from '../../actions/donationListing';

const CreateDonationListing = () => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const userId = user.result._id
    const userName = user.result.name

    const [postData, setPostData] = useState({
        name: "",
        donationValue: "",
        dateCreated: "",
        totalAmountCollected: 0,
        status: "Pending",
        createdBy: userName,
        createdById: userId,
        description: ""
    });

    const clear = () => {
        setPostData({
            name: "",
            donationValue: "",
            dateCreated: "",
            totalAmountCollected: 0,
            status: "Pending",
            createdBy: userName,
            createdById: userId,
            description: ""
        });
      };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Validation
        if (postData.name === "") {
          alert("Please enter a title!");
        }else if(postData.donationValue === ""){
          alert("Please enter a donation value!")
        }else if(postData.description === ""){
          alert("Please enter a description!")
        }
        else if(postData.createdBy === ""){
          alert("Please enter creator name!")
        }
        setPostData({ ...postData})
        dispatch(createDonation({postData}))
        alert("Donation request created")
        clear()
      }

  return (
    <Box sx={{ml:'20%',mr:'20%'}} >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          name="name"
          variant="filled"
          label="Title of request"
          fullWidth
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          
        />


        <TextField
          name="Donation Value Requested"
          variant="filled"
          label="Donation Value Requested"
          fullWidth
          value={postData.donationValue}
          onChange={(e) => setPostData({ ...postData, donationValue: parseInt(e.target.value) })}
        />

        <TextField
          name="Description"
          variant="filled"
          label="Description"
          fullWidth
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e.target.value })}
        />
       
          <Box sx={{ mt: 2 }}>

              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type= 'submit'
                  onClick={() => console.log(postData)}
                  sx={{ mr: 2 }}
              >
                  Submit
              </Button>
              <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={clear}

              >
                  Clear
              </Button>
          </Box>
      </form>

    </Box>
  )
}

export default CreateDonationListing