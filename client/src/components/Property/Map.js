import { useState, React, useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'       
import LocationInfoBox from './LocationInfoBox'    
import { Box } from '@mui/material'

const Map = ({communityCentre, lat, long, setMarkersInView}) => {

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


    const findMarkers = (bounds) => {

         
        const markersInView = communityCentre.filter((cc)=> 

            cc.LATITUDE > bounds.bounds.se.lat && bounds.bounds.sw.lat &&
            (cc.LATITUDE < bounds.bounds.ne.lat && bounds.bounds.nw.lat) &&
            (cc.LONGITUDE > bounds.bounds.nw.lng && bounds.bounds.sw.lng) &&
            (cc.LONGITUDE < bounds.bounds.ne.lng && bounds.bounds.se.lng)
        )

        
        markersInView.sort((a,b) => a.BUILDING > b.BUILDING? 1 : -1)
        setMarkersInView(markersInView)

    }

    useEffect (() => {

        setCenter([lat,long])

    },[lat,long])

    return (
        <Box className="map" sx={{maxWidth:"100%", height:800, pl:2}} >
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDudsRZJAg4b86eEptTGXVWdS0u0B4bifs' }}
                center={ center }
                defaultZoom={ zoom }
                onChange = {(bounds) => findMarkers(bounds)}
            >

                {markers} 
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} setLocationInfo={setLocationInfo} />}
       
        </Box> 
    )
}





export default Map