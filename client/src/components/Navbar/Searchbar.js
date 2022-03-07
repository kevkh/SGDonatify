import { useState, useEffect,useRef } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";
const Searchbar = ({setText}) => {
    const [search,setSearch] = useState("")
    let history = useHistory();

   

    const handleTextField = (e) => {
        setSearch(e.target.value.toLowerCase())
        
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13)
        {
            setText(search)
            history.push("/displaylistings");
        }
    
    }


    return(<TextField
        sx={{ minWidth: "100%", height: "100%" }}
        variant="outlined"
        placeholder="Search Donations"
        value={search}
        onChange={handleTextField}
        onKeyUp={handleEnter}
        InputProps = {{startAdornment: (<InputAdornment position="start"> <SearchIcon /></InputAdornment>)}}
        >
    </TextField>);
};

export default Searchbar;