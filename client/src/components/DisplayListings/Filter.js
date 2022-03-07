import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import useStyles from "./styles";
const Filter = ({ sort, setSort, setText}) => {

    const [search,setSearch] = useState("")
    const classes = useStyles();

    const handleSort = (e) => {
    setSort(e.target.value)
    }

    const handleTextField = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13)
            setText(search)
    }

    return (
        <FormControl  sx={{ minWidth: "270px" }}>
        <InputLabel className={classes.sortLabel}>Sort Donation By</InputLabel>
        <Select
            className={classes.sort}
            value={sort}
            onChange={handleSort}
            input={<OutlinedInput label="Sort" />}
            sx={{borderRadius:10}}
        >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
            <MenuItem value="Highest Amount">Highest Amount</MenuItem>
            <MenuItem value="Lowest Amount">Lowest Amount</MenuItem>
        </Select>
        </FormControl>
    )
}

export default Filter
