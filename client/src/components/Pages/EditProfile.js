import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/donorAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Button, TextField } from "@material-ui/core";


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
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')
    const [Des, setDes] = useState('');

    let name = donorProfile.name
    let email = donorProfile.email
    let cea = donorProfile.CEA
    let agency = donorProfile.agency
    let number = donorProfile.phoneNumber
    let des = donorProfile.description

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
    const handleChangeDes = (e) => {
        e.preventDefault();
        setDes(e.target.value);
        des = e.target.value
        donorProfile.description = des
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, donorProfile))
        console.log(donorProfile.name);
        alert('Profile Updated')
        history.push("/profile");


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
                            <h2> Description : <TextField
                                name="description"
                                variant="outlined"
                                fullWidth
                                value={donorProfile.description}
                                onChange={handleChangeDes}
                            /></h2>


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

