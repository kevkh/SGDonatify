import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const Searchbar = () => {
    const [search,setSearch] = useState("")
    const [text,setText] = useState("")
    const handleTextField = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13)
            setText(search)
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