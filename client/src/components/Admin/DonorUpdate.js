import React, { useEffect, useState } from 'react'
import { updateProfile, deleteDonor } from '../../actions/donorAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Select, MenuItem, FormControl, makeStyles, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export const DonorUpdate = (router) => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [donorProfile, setDonorProfile] = useState('')
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
            let response = await axios.get(`http://localhost:5000/donor/${id}`)
            setDonorProfile(response.data)
            console.log(donorProfile)
        }
        fetchData()
    }, [])

    const [Status, setStatus] = useState('')

    var newStatus = '';

    const handleChange = (event) => {
        event.preventDefault();
        setStatus(event.target.value);
        newStatus = event.target.value;
        donorProfile.donor_status = newStatus;
        console.log(newStatus);
    };

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')

    let name = donorProfile.name
    let email = donorProfile.email
    let cea = donorProfile.CEA
    let agency = donorProfile.agency
    let number = donorProfile.phoneNumber

    const handleChangeName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        name = e.target.value
        donorProfile.name = name
    };
    const handleChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        email = e.target.value
        donorProfile.email = email
    };
    const handleChangeCEA = (e) => {
        e.preventDefault();
        setCEA(e.target.value);
        cea = e.target.value
        donorProfile.CEA = cea
    };
    const handleChangeAgency = (e) => {
        e.preventDefault();
        setAgency(e.target.value);
        agency = e.target.value
        donorProfile.agency = agency
    };
    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        number = e.target.value
        donorProfile.phoneNumber = number
    };

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, donorProfile))
        alert('Donor Updated')
        donorProfile.donor_status !== "Approved" ? (
            donorProfile.donor_status === "Pending" ? (
                history.push("/donorList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
    };


    const handleDelete = (e) => {
        e.preventDefault();
        alert('Donor Deleted')
        donorProfile.donor_status !== "Approved" ? (
            donorProfile.donor_status === "Pending" ? (
                history.push("/donorList")
            ) : (history.push("/blacklist"))
        ) : (history.push("/approvedList"))
        dispatch(deleteDonor(id))
    };

    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={donorProfile.CEA}>
                            <h2> Name : <input
                                type='string'
                                name='name'
                                onChange={handleChangeName}
                                value={donorProfile.name}
                                required
                            /></h2>
                            <h2> Email : <input
                                type='string'
                                name='email'
                                onChange={handleChangeEmail}
                                value={donorProfile.email}
                                required
                            /></h2>
                            <h2> Agency : <input
                                type='string'
                                name='agency'
                                onChange={handleChangeAgency}
                                value={donorProfile.agency}
                                required
                            /></h2>
                            <h2> CEA Number : <input
                                type='string'
                                name='CEA'
                                onChange={handleChangeCEA}
                                value={donorProfile.CEA}
                                required
                            /></h2>
                            <h2> Phone Number : <input
                                type='string'
                                name='PhoneNumber'
                                onChange={handleChangeNumber}
                                value={donorProfile.phoneNumber}
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
                                            defaultValue={donorProfile.donor_status}
                                            value={Status}
                                            displayEmpty
                                            defaultValue=""
                                        >
                                            <MenuItem value="" disabled>{donorProfile.donor_status}</MenuItem>
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
                                    {"Delete an Donor?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleDelete} autoFocus >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {donorProfile.donor_status !== "Approved" ? (
                                donorProfile.donor_status === "Pending" ? (
                                    <Button component={Link} to={{
                                        pathname: `/DonorList`,
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
export default DonorUpdate

