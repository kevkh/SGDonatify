import React, { useEffect, useState } from 'react'
import { updateProfile,deleteUser } from '../../actions/auth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Button } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const UserUpdate = () => {


  const { id } = useParams()
  const dispatch = useDispatch()
  const [userProfile, setUserProfile] = useState('')
  let history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`http://localhost:5000/user/${id}`)
      setUserProfile(response.data)
      console.log(userProfile)
    }
    fetchData()
  }, [])

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(userProfile.name);
    alert('User Deleted')
    history.push("/UserList");
    dispatch(deleteUser(id))
  };

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')

  let name = userProfile.name

  let email = userProfile.email

  const handleChange = (e) => {
    e.preventDefault();
      setName(e.target.value);
      name = e.target.value
      userProfile.name = name
};
const handleChangeEmail = (e) => {
  e.preventDefault();
  setEmail(e.target.value);
  email = e.target.value
  userProfile.email = email
};

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateProfile(id, userProfile))
      alert('User Updated')
      history.push("/UserList");
  };

  return (
    <div>
      <Paper>
        <form >
          <div style={{ textAlign: 'left' }}>
            <div key={userProfile.name}>
              <h2> Name : <input
                type='text'
                name='name'
                onChange={handleChange}
                value={userProfile.name}
                required
              /></h2>
              <h2> Email : <input
                type='text'
                name='email'
                onChange={handleChangeEmail}
                value={userProfile.email}
                required
              /></h2>
              <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
              <Button onClick={handleClickOpen} color="secondary" variant="contained" >
                Delete
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete a User?"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleDelete} autoFocus >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <Button component={Link} to={{
                pathname: `/UserList`,
              }} color="primary" variant="contained">
                Back
              </Button>
            </div>
          </div></form>

      </Paper>
    </div>
  )

}
export default UserUpdate

