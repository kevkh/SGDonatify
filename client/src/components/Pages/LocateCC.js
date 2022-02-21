import Map from "../Property/Map.js"
import { Box, Stack } from '@mui/material'
import axios from "axios"
import React, { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'

const LocateCC = () => {

    const [communityCentre,setCommunityCentre] = useState(null)
    const [load,setLoad] = useState(true)
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [search, setSearch] = useState("")
    const [text, setText] = useState("")
    const [closeAlert, setCloseAlert] = useState(false)

    const removeNonCC = (cc) => {

       return ! ((cc.SEARCHVAL.includes("SPARKLETOTS")) || (cc.SEARCHVAL.includes("DBS")))
        
    }

    const handleTextField = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13)
            setText(search)
    }

    useEffect (() => {
        
        const getLocation = () => {

            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition((position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                })
            
        }
        const getCC = async () => {

            const ccData = []
            getLocation()
            for(var i = 1;i<=27;i++)
            {
                const res = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=COMMUNITY+CLUB&returnGeom=Y&getAddrDetails=Y&pageNum=${i}`)
                for (var j=0;j<res.data.results.length;j++)
                {
                    if (removeNonCC(res.data.results[j]))
                        ccData.push(res.data.results[j])
                }

            }
            setCommunityCentre(ccData)
            setLoad(false)
        }


        getCC()
        
        
    }, [])

    useEffect (() => {

        const getCordinates = async () => {
            if (text != "")
                {
                    const res = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${text}&returnGeom=Y&getAddrDetails=Y`)
                    if (res.data.results.length < 1)
                        setCloseAlert(true)
                    else
                    {
                        setCloseAlert(false)
                        setLat(parseFloat(res.data.results[0]?.LATITUDE))
                        setLong(parseFloat(res.data.results[0]?.LONGITUDE))

                    }
                }
        }

        getCordinates()

    },[text])

    return (
        <Box sx={{ display: 'flex'}}>
            <Box sx={{ flexGrow: 1}}>
                <Stack>
                <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search Community Center Via Postal Code"
                        value={search}
                        onChange={handleTextField}
                        onKeyUp={handleEnter}
                    >
                    </TextField>
                {closeAlert &&
                        <Alert sx={{ mt: 2, maxWidth:"30%"}} severity="error" action={<IconButton size='small' onClick={() => { setCloseAlert(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>}
                            >
                            <AlertTitle>Error</AlertTitle>
                            <strong> Invalid postal code. Please try again. </strong>
                        </Alert>}
                </Stack>
            </Box>
            {load ? <Skeleton variant="rectangular" animation="wave" width={"50%"} height={900} sx={{ml:2}} /> : <Map communityCentre={communityCentre} lat={lat} long={long} />}
        </Box>
    )
}

export default LocateCC