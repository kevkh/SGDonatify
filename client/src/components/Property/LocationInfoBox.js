import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
const LocationInfoBox = ({info, setLocationInfo }) => {

    return (
        <div className="location-info">
            <IconButton sx={{float:'right'}} size='small' onClick={() => { setLocationInfo(false) }}> <CloseIcon fontSize="inherit" /> </IconButton>
            <h2>Community Center Info</h2>
            <ul>
        {/* <li>ID: <strong>{ info._id }</strong></li> */}
        <li><strong>{ info.building }</strong></li>
        <li>Address: <strong>{ info.address }</strong></li>
       
            </ul>
        </div>
    )
}

export default LocationInfoBox