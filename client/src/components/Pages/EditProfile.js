import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/donorAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField, Button, Typography, Paper, FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { DatePicker } from '@mui/lab';
import {formatISO} from 'date-fns'

export const EditProfile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [donorProfile, setDonorProfile] = useState('')
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/donor/${id}`)
            setDonorProfile(response.data)
        }
        fetchData()
    }, [])


    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Number, setNumber] = useState('')
    const [Gender, setGender] = useState('')
    const [DOB, setDOB] = useState('')
    const [Address, setAddress] = useState('')
    const [CCNum, setCCNum] = useState('')
    const [CSV, setCSV] = useState('')


    let name = donorProfile.name
    let email = donorProfile.email
    let number = donorProfile.phoneNumber
    let gender = donorProfile.gender
    let dob = donorProfile.dob
    let address = donorProfile.address
    let ccnum = donorProfile.ccNum
    let csv = donorProfile.csv

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
    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        number = e.target.value
        donorProfile.phoneNumber = number
    };

    const handleChangeGender = (e) => {
        e.preventDefault();
        setGender(e.target.value);
        gender = e.target.value
        donorProfile.gender = gender
    };

    const handleChangeDOB = (e) => {
        //e.preventDefault();
        const newDate = formatISO(e, "yyyy-MM-dd")
        //const newDate = format(new Date(e), 'yyyy-MM-dd')
        //const newDate = format(parseISO(date), "dd-MM-yyyy")
        setDOB(newDate)
        dob = newDate
        donorProfile.dob = dob
    };

    // const handleChangeGender = (e) => {
    //     e.preventDefault();
    //     setGender(e.target.value);
    //     gender = e.target.value
    //     donorProfile.gender = gender
    // };
    // const handleChangeDOB = (e) => {
    //     e.preventDefault();
    //     setDOB(e.target.value);  
    //     dob = e.target.value
    //     donorProfile.dob = dob
    // };

    // const handleChangeGender = (e) => {
    //     e.preventDefault();
    //     setGender(e.target.value);
    //     gender = e.target.value
    //     donorProfile.gender = gender
    // };

    // const handleChangeDOB = (e) => {
    //     //e.preventDefault();
    //     const newDate = formatISO(e, "yyyy-MM-dd")
    //     //const newDate = format(new Date(e), 'yyyy-MM-dd')
    //     //const newDate = format(parseISO(date), "dd-MM-yyyy")
    //     setDOB(newDate)
    //     dob = newDate
    //     donorProfile.dob = dob
    // };

    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={donorProfile.gender}
        label="Gender"
        onChange={handleChangeGender}
    >
        <MenuItem value={"Male"}>Male</MenuItem>
        <MenuItem value={"Female"}>Female</MenuItem>
    
    </Select>
    </FormControl>

    {/* Date Picker */}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        label="Pick a date"
        value={donorProfile.dob}
        inputFormat="yyyy-MM-dd"
        onChange={
        handleChangeDOB
        }
        renderInput={(params) => <TextField {...params} />}
    />
    </LocalizationProvider>


    const handleChangeAddress = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
        address = e.target.value
        donorProfile.address = address
    };

    const handleChangeCCNum = (e) => {
        e.preventDefault();
        setCCNum(e.target.value);
        ccnum = e.target.value
        donorProfile.ccNum = ccnum
    };

    const handleChangeCSV = (e) => {
        e.preventDefault();
        setCSV(e.target.value);
        csv = e.target.value
        donorProfile.csv = csv
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, donorProfile))
        console.log(donorProfile.name);
        alert('Donor Profile Updated')
        history.push("/profile");

    };

    return (
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={donorProfile.email}>
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
                            <h2> Phone Number : <input
                                type='string'
                                name='number'
                                onChange={handleChangeNumber}
                                value={donorProfile.phoneNumber}
                                required
                            /></h2>
                            {/* <h2> Gender : <input
                                type='string'
                                name='gender'
                                onChange={handleChangeGender}
                                value={donorProfile.gender}
                                required
                            /></h2>
                            <h2> Date of birth: <input
                                type='string'
                                name='dob'
                                onChange={handleChangeDOB}
                                value={donorProfile.dob}
                                required
                            /></h2> */}
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={donorProfile.gender}
                                label="Gender"
                                onChange={handleChangeGender}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            
                            </Select>
                            </FormControl>

                           
                            {/* Date Picker */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Pick a date"
                                value={donorProfile.dob}
                                inputFormat="yyyy-MM-dd"
                                onChange={
                                handleChangeDOB
                                }
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>

                            <h2> Address : <TextField
                                name="Address"
                                variant="outlined"
                                fullWidth
                                value={donorProfile.address}
                                onChange={handleChangeAddress}
                            /></h2>

                            <h2> Credit Card Number: <TextField
                                name="Credit Card Number"
                                variant="outlined"
                                halfWidth
                                value={donorProfile.ccNum}
                                onChange={handleChangeCCNum}
                                inputProps= {{
                                    maxLength:16 
                                }} />
                                                            
                            &nbsp;&nbsp;&nbsp;

                                CSV: <TextField
                                name="CSV"
                                variant="outlined"
                                halfWidth
                                value={donorProfile.csv}
                                onChange={handleChangeCSV}
                                inputProps= {{
                                    maxLength:3 
                                }} />

                            
                            </h2>


                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button component={Link} to={{
                                pathname: `/profile`,
                            }} color="primary" variant="contained">
                                Back
                            </Button>
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default EditProfile

