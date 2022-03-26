import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/donateeAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import FileBase from "react-file-base64";
import useStyles from "./styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField, Button, Typography, Paper, FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { DatePicker } from '@mui/lab';
import {formatISO} from 'date-fns'

export const EditDonateeProfile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const classes = useStyles();
    const [donateeProfile, setDonateeProfile] = useState('')
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/donatee/${id}`)
            setDonateeProfile(response.data)
        }
        fetchData()
    }, [])

    const [postData, setPostData] = useState({
        income_docs: ""
   })
   

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Number, setNumber] = useState('')
    const [Gender, setGender] = useState('')
    const [DOB, setDOB] = useState('')
    const [Address, setAddress] = useState('')
    const [IncomeDocs, setIncomeDocs] = useState('')
    
    let name = donateeProfile.name
    let email = donateeProfile.email
    let number = donateeProfile.phoneNumber
    let gender = donateeProfile.gender
    let dob = donateeProfile.dob
    let address = donateeProfile.address
    let income_docs = donateeProfile.income_docs
    
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

    const handleChangeNumber = (e) => {
        e.preventDefault();
        setNumber(e.target.value);
        number = e.target.value
        donateeProfile.phoneNumber = number
    };

    const handleChangeGender = (e) => {
        e.preventDefault();
        setGender(e.target.value);
        gender = e.target.value
        donateeProfile.gender = gender
    };

    const handleChangeDOB = (e) => {
        //e.preventDefault();
        const newDate = formatISO(e)
        setDOB(newDate);
        dob = newDate
        donateeProfile.dob = dob
    };

    const handleChangeAddress = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
        address = e.target.value
        donateeProfile.address = address
    };

    const handleChangeIncomeDocs = (e) => {
        // e.preventDefault();
        setIncomeDocs(e.base64);
        income_docs = "data:application/pdf;base64," + e.base64
        //income_docs = e.base64
        donateeProfile.income_docs = income_docs
        

    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //setPostData({...postData, income_docs: e.target.income_docs})  // insert docs
        dispatch(updateProfile(id, donateeProfile))
        
        // console.log(donateeProfile.name);
        alert('Donatee Profile Updated')
        history.push("/donateeProfile");
        // console.log("Check Income Doc:", donateeProfile.income_docs)
    };

    return (
        
        <div>
            <Paper>
                <form >
                    <div style={{ textAlign: 'left' }}>
                        <div key={donateeProfile.email}>
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
                           
                            <h2> Phone Number : <input
                                type='string'
                                name='PhoneNumber'
                                onChange={handleChangeNumber}
                                value={donateeProfile.phoneNumber}
                                required
                            /></h2>
                            {/* <h2> Gender : <TextField
                                name="gender"                                                                                   
                                variant="outlined"
                                fullWidth
                                value={donateeProfile.gender}
                                onChange={handleChangeGender}
                            /></h2> */}

                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={donateeProfile.gender}
                                label="Gender"
                                onChange={handleChangeGender}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            
                            </Select>
                            </FormControl>

                            {/* <h2> Date of birth : <TextField
                                name="dob"
                                variant="outlined"
                                fullWidth
                                value={donateeProfile.dob}
                                onChange={handleChangeDOB}
                            /></h2> */}

                            {/* Date Picker */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Pick a date"
                                value={donateeProfile.dob}
                                inputFormat="dd/MM/yyyy"
                                onChange={
                                handleChangeDOB
                                }
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>

                            <h2> Address : <TextField
                                name="address"
                                variant="outlined"
                                fullWidth
                                value={donateeProfile.address}
                                onChange={handleChangeAddress}
                            /></h2>

                            {/* Change to upload button  */}
                            <h2> Household Income Documents</h2>
                            <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                multiple={false}  
                                value={donateeProfile.income_docs}
                                onDone={handleChangeIncomeDocs}
                                
                            />
                            </div>

                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button component={Link} to={{
                                pathname: `/donateeProfile`,    
                            }} color="primary" variant="contained">             
                                Back
                            </Button>
                        </div>
                    </div></form>

            </Paper>
        </div>
    )

}
export default EditDonateeProfile

