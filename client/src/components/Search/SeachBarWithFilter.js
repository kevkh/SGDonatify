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

const SeachBarWithFilter = ({ sort, setSort, setText}) => {

    const [search,setSearch] = useState("")


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
       
        <Paper fullWidth elevation={5} sx={{borderRadius:100}}>
            <Grid container spacing={2}>
                <Grid item xs={4} sx={{ mb: 2, ml: 2 }}>
                        <TextField
                            sx={{ minWidth: "100%", height: "100%" }}
                            variant="outlined"
                            placeholder="Search Donations"
                            value={search}
                            onChange={handleTextField}
                            onKeyUp={handleEnter}
                            InputProps = {{startAdornment: (<InputAdornment position="start"> <SearchIcon /></InputAdornment>)}}
                            >
                        </TextField>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                </Grid>
                <Grid item xs={2} sx={{ float: 'right' }}>
                    <FormControl sx={{ minWidth: "70%" }}>
                        <InputLabel>Sort</InputLabel>
                        <Select
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
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SeachBarWithFilter
