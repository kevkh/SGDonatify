import { useState, React, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'       
import LocationInfoBox from './LocationInfoBox'    
import { Box } from '@mui/material'

const Map = ({communityCentre, lat, long}) => {

    const [center,setCenter] = useState([lat,long])
    const zoom = 15
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = communityCentre.map((cc) => {
        return <LocationMarker lat = {cc.LATITUDE} lng = {cc.LONGITUDE}
        onClick = {() => {
            setLocationInfo({building: cc.BUILDING, address: cc.ADDRESS})
        }}
        />
        
    })

    useEffect (() => {

        setCenter([lat,long])

    },[lat,long])

    return (
        <Box className="map" sx={{maxWidth: "50%", height:900, ml:2}} >
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDudsRZJAg4b86eEptTGXVWdS0u0B4bifs' }}
                center={ center }
                defaultZoom={ zoom }
            >

                {markers} 
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} setLocationInfo={setLocationInfo} />}
       
        </Box> 
    )
}





export default Map