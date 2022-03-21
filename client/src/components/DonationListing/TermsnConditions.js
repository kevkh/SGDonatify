import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box,Button, TextField } from '@mui/material'
import {useState } from 'react'
import {useDispatch} from 'react-redux'
import {updateDonation} from '../../actions/donationListing.js'
import Alert from '@mui/material/Alert'

const TermsnConditions = ({custom, id, buttonValue, donationValue}) => {

    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)
    const [textFieldValue,setTextFieldValue] = useState("")
    const [displayAlert,setDisplayAlert] = useState(false)
    const validAmount = parseInt(donationValue[1]) - parseInt(donationValue[0])
    const buttonValueInt = parseInt(buttonValue.substring(1))

    const handleDialogOpen = () => setOpenDialog(true)
    const handleDialogClose = () => {
        if (custom)
            setTextFieldValue("")
            setDisplayAlert(false)
        setOpenDialog(false)
    }

    const handleDialogCloseandUpdateDonation = () => {
      const type = "totalAmountCollected"
        if (custom)
        {
            if (!checkCustomAmount())
                setDisplayAlert(true)
            else
            {
                setDisplayAlert(false)
                const amount = textFieldValue
                dispatch(updateDonation(id, {type, amount}))
                setOpenDialog(false)
                setTextFieldValue("")
            }
        }
        else
        {
            const amount = buttonValueInt
            dispatch(updateDonation(id, {type, amount }))
            setOpenDialog(false)
        }
        
    }

    const handleTextField = (e) => {
        setTextFieldValue(e.target.value)
    }

    const checkCustomAmount = () => {
        const validInt = parseInt(textFieldValue)
        if (validInt >= 1 && validInt <= validAmount)
            return true
        else
            return false
    }

    const closeDisplayAlert = () => setDisplayAlert(false)

  return (
    <Box>
      {buttonValueInt <= validAmount || (custom && !(donationValue[0] == donationValue[1]))? <Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" onClick={handleDialogOpen}>Donate {buttonValue}</Button>:
      <Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" onClick={handleDialogOpen} disabled>Donate {buttonValue} </Button>}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {"Terms & Conditions"}
        </DialogTitle>
         {custom && 
         <TextField
            label="Donation Amount"
            value={textFieldValue}
            onChange={handleTextField}
            sx={{ml:2,mr:2}}
          />}
         {displayAlert && <Alert severity="error" sx={{my:1}} onClick={closeDisplayAlert} >Invalid value. Please enter an integer value between $1 and ${validAmount}</Alert>}
        <DialogContent>
          <DialogContentText>
            The user agree to donate the amount stated and no refunds will be given once the terms and conditions is accepted by the user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCloseandUpdateDonation}>Agree</Button>
          <Button onClick={handleDialogClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TermsnConditions