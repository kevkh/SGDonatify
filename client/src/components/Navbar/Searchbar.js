import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const Searchbar = () => {
    const search ="";
    const handleTextField="";
    const onKeyUp="";
    const handleEnter="";
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