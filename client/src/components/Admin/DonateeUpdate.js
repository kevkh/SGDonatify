import React, { useEffect, useState } from 'react'
import { updateProfile, deleteDonatee } from '../../actions/donateeAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Select, MenuItem, FormControl, makeStyles, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DonateeUpdate = (router) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [donateeProfile, setDonateeProfile] = useState('')
    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles(theme => ({
        FormControl: { minWidth: 100 }
    }));

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/donatee/${id}`)
            setDonateeProfile(response.data)
            console.log(donateeProfile)
        }
        fetchData()
    }, [])

    const [Status, setStatus] = useState('')

    var newStatus = '';

    const handleChange = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
        newStatus = event.target.value;
        donateeProfile.donatee_status = newStatus;
        console.log(newStatus);
    };

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')

    let name = donateeProfile.name
    let email = donateeProfile.email
    let cea = donateeProfile.CEA
    let agency = donateeProfile.agency
    let number = donateeProfile.phoneNumber

    const handleChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        name = e.target.value
        donateeProfile.name = name
    };
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        email = e.target.value
        donateeProfile.email = email
    };
    const handleChangeCEA = (e) => {
        e.preventDefault();
        setCEA(e.target.value);
        cea = e.target.value
        donateeProfile.CEA = cea
    };
    const handleChangeAgency = (e) => {
        e.preventDefault();
        setAgency(e.target.value);
        agency = e.target.value
        donateeProfile.agency = agency
    };
    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        number = e.target.value
        donateeProfile.phoneNumber = number
    };

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, donateeProfile))
        alert('Donatee Updated')
        donateeProfile.donatee_status !== "Approved" ? (
            donateeProfile.donatee_status === "Pending" ? (
                history.push("/donateeList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
    };


    const handleDelete = (e) => {
        e.preventDefault();
        alert('Donatee Deleted')
        donateeProfile.donatee_status !== "Approved" ? (
            donateeProfile.donatee_status === "Pending" ? (
                history.push("/donateeList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
        dispatch(deleteDonatee(id))
    };

    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={donateeProfile.CEA}>
                            <h2> Name : <input
                                type='string'
                                name='name'
                                onChange={handleChangeName}
                                value={donateeProfile.name}
                                required
                            /></h2>
                            <h2> Email : <input
                                type='string'
                                name='email'
                                onChange={handleChangeEmail}
                                value={donateeProfile.email}
                                required
                            /></h2>
                            <h2> Agency : <input
                                type='string'
                                name='agency'
                                onChange={handleChangeAgency}
                                value={donateeProfile.agency}
                                required
                            /></h2>
                            <h2> CEA Number : <input
                                type='string'
                                name='CEA'
                                onChange={handleChangeCEA}
                                value={donateeProfile.CEA}
                                required
                            /></h2>
                            <h2> Phone Number : <input
                                type='string'
                                name='PhoneNumber'
                                onChange={handleChangeNumber}
                                value={donateeProfile.phoneNumber}
                                required
                            /></h2>

                            <h2> Status :
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl className={classes.FormControl}>
                                        <Select
                                            id="StatusOpt"
                                            name="StatusOpt"
                                            label="Status"
                                            onChange={handleChange}
                                            defaultValue={donateeProfile.donatee_status}
                                            value={Status}
                                            displayEmpty
                                            defaultValue=""
                                        >
                                            <MenuItem value="" disabled>{donateeProfile.donatee_status}</MenuItem>
                                            <MenuItem value={"Approved"}>Approved</MenuItem>
                                            <MenuItem value={"Pending"}>Pending</MenuItem>
                                            <MenuItem value={"Blacklisted"}>Blacklisted</MenuItem>
                                            <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box></h2>
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
                                    {"Delete an Donatee?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleDelete} autoFocus >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {donateeProfile.donatee_status !== "Approved" ? (
                                donateeProfile.donatee_status === "Pending" ? (
                                    <Button component={Link} to={{
                                        pathname: `/DonateeList`,
                                    }} color="primary" variant="contained">
                                        Back
                                    </Button>
                                ) : (<Button component={Link} to={{
                                    pathname: `/Blacklist`,
                                }} color="primary" variant="contained">
                                    Back
                                </Button>)
                            ) : (
                                <Button component={Link} to={{
                                    pathname: `/ApprovedList`,
                                }} color="primary" variant="contained">
                                    Back
                                </Button>
                            )}
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default DonateeUpdate

