import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box,Button } from '@mui/material'
import {useState } from 'react'
import {useDispatch} from 'react-redux'
import {updateDonation} from '../../actions/donationListing.js'

const TermsnConditions = ({id, amount}) => {

  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const handleDialogOpen = () => setOpenDialog(true)
  const handleDialogClose = () => setOpenDialog(false)

  const handleDialogCloseandUpdateDonation = () => {
    dispatch(updateDonation(id, {amount}))
    setOpenDialog(false)
  }

  return (
    <Box>
      <Button sx={{ maxWidth: "50%" }} variant="contained" color="primary" onClick={handleDialogOpen} >Donate ${amount}  </Button>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {"Terms & Conditions"}
        </DialogTitle>
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