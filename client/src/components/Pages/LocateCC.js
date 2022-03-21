import Map from "../Property/Map.js"
import { Box, Select, Stack, Typography,Grid } from '@mui/material'
import axios from "axios"
import React, { useState, useEffect, useRef } from 'react'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AlertTitle from '@mui/material/AlertTitle'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import ccLogo from "../../images/ccLogo.png"
import Container from '@mui/material/Container';
import useStyles from "./styles";

const LocateCC = () => {

    const classes = useStyles();
    const [communityCentre,setCommunityCentre] = useState(null)
    const [load,setLoad] = useState(true)
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [search, setSearch] = useState("")
    const [text, setText] = useState("")
    const [closeAlert, setCloseAlert] = useState(false)
    const [markersInView,setMarkersInView] = useState(null)
    const [townSelected,setTownSelected] = useState("")
    const [variableChanged, setVariableChanged] = useState(0) // 1 = text 2 = townSelected


    const towns = [
        "Sembawang",
        "Woodlands",
        "Yishun",
        "Ang Mo Kio",
        "Hougang",
        "Punggol",
        "Sengkang",
        "Serangoon",
        "Bedok",
        "Pasir Ris",
        "Tampines",
        "Bukit Batok",
        "Bukit Panjang",
        "Choa Chu Kang",
        "Clementi",
        "Jurong East",
        "Jurong West",
        "Bishan",
        "Bukit Merah",
        "Bukit Timah",
        "Geylang",
        "Marine Parade",
        "Queenstown",
        "Toa Payoh"
        ]
    towns.sort()

    const removeNonCC = (cc) => {

       return !( (cc.SEARCHVAL.includes("SPARKLETOTS")) || (cc.SEARCHVAL.includes("DBS")) || (cc.SEARCHVAL.includes("(U/C)")) )
        
    }

    const handleTextField = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleEnter = (e) => {

        if (e.keyCode === 13) {
            setVariableChanged(1)
            setText(search)
        }
    }

    const handleTownChange = (e) => {

        setVariableChanged(2)
        setTownSelected(e.target.value)
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

        const setCoordinates =  (res) => {

            if (res.data.results.length < 1)
                setCloseAlert(true)
            else {
                setCloseAlert(false)
                setLat(parseFloat(res.data.results[0]?.LATITUDE))
                setLong(parseFloat(res.data.results[0]?.LONGITUDE))

            }
        }

        const getCordinates = async () => {

            if (variableChanged == 1) {
                if (text.length != 6 ||  parseInt(text) == NaN)
                {
                    setCloseAlert(true)
                    return
                }
                const res = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${text}&returnGeom=Y&getAddrDetails=Y`)
                setCoordinates(res)
            }
            else if (variableChanged == 2) {
                const res = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${townSelected}&returnGeom=Y&getAddrDetails=Y`)
                setCoordinates(res)
            }

        }

        getCordinates()

    },[text,townSelected])

    return (
        <Container disableGutters = "true" maxWidth = "xl" sx={{paddingLeft:"8px", paddingRight:"10px"}}>
            <Grid  container>
                <Grid item xs={6}>
                    <Stack>
                        <Box sx={{ display: 'flex'}}>
                        <TextField
                                variant="outlined"
                                placeholder="Search Community Center Via Postal Code"
                                value={search}
                                onChange={handleTextField}
                                onKeyUp={handleEnter}
                                InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchIcon /></InputAdornment>) }}
                                sx={{width:'80%',backgroundColor: 'white'}}
                                
                            />
                            <FormControl sx={{ml:2,width:'30%',  }}>
                                <InputLabel>Search by Town</InputLabel>
                                <Select
                                    value={townSelected}
                                    onChange={handleTownChange}
                                    input={<OutlinedInput label="Search by Town" />}
                                    sx ={{backgroundColor: 'white'}}
                                >
                                {towns.map( (town) => (<MenuItem value={town}>{town}</MenuItem>) )}
                                </Select>
                            </FormControl>
                        </Box>
                    {closeAlert &&
                            <Alert sx={{ mt: 2, mb: 2, maxWidth:"30%"}} severity="error" action={<IconButton size='small' onClick={() => { setCloseAlert(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>}
                                >
                                <AlertTitle>Error</AlertTitle>
                                <strong> Invalid postal code. Please try again. </strong>
                            </Alert>}
                    {markersInView?.map((marker)=>{

                    return <Stack sx={{ mt: 1, mb: 1, p: 1, backgroundColor: 'white', borderRadius: 5 }} >
                                <Box sx={{ display: "flex" }}>
                                    <img src={ccLogo} />
                                    <Box sx={{ml:1}}>
                                        <Typography>{marker.BUILDING} </Typography>
                                        <Typography>{marker.ADDRESS} </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                    })}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    {load ? <Skeleton variant="rectangular" animation="wave"/> : <Map communityCentre={communityCentre} lat={lat} long={long} setMarkersInView={setMarkersInView}/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default LocateCC