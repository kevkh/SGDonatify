import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../actions/donateeAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Paper, Button, TextField } from "@material-ui/core";


export const EditDonateeProfile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [donateeProfile, setDonateeProfile] = useState('')
    let history = useHistory();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(`http://localhost:5000/donatee/${id}`)
            setDonateeProfile(response.data)
        }
        fetchData()
    }, [])


    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [CEA, setCEA] = useState('')
    const [Agency, setAgency] = useState('')
    const [Number, setNumber] = useState('')
    const [Des, setDes] = useState('');

    let name = donateeProfile.name
    let email = donateeProfile.email
    let cea = donateeProfile.CEA
    let agency = donateeProfile.agency
    let number = donateeProfile.phoneNumber
    let des = donateeProfile.description

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
    const handleChangeDes = (e) => {
        e.preventDefault();
        setDes(e.target.value);
        des = e.target.value
        donateeProfile.description = des
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(id, donateeProfile))
        console.log(donateeProfile.name);
        alert('Profile Updated')
        history.push("/profile"); // donateeprofile?


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
                            <h2> Description : <TextField
                                name="description"
                                variant="outlined"
                                fullWidth
                                value={donateeProfile.description}
                                onChange={handleChangeDes}
                            /></h2>


                            <Button onClick={handleSubmit} color="primary" variant="contained"  >
                                Update
                            </Button>
                            <Button component={Link} to={{
                                pathname: `/profile`,    // Change here???
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

