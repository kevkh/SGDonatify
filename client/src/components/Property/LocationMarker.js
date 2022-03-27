import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const LocationMarker = ({ lat, lng, onClick, user}) => {
    return (
        <div className="location-marker" onClick={onClick}>
        <Icon icon={locationIcon} className="location-icon" color={user? "blue":"red"}/>
        </div>
    )
}

export default LocationMarker