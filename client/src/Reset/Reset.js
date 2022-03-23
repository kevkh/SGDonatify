
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDonorPwd } from "../actions/donorAuth";
import { updateDonateePwd } from "../actions/donateeAuth";
import { updatePwd } from "../actions/auth";
import useStyles from "./styles";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Input from "../components/Auth/Input";
import {
  Avatar,
  Paper,
  Grid,
  Typography, 
  TextField

} from '@mui/material';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Reset = () => {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("profile"));
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const dispatch = useDispatch();
  const userId = user.result._id;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const [userProfile,setUserProfile] = useState(user.result)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd === ""){
      alert("passwords cannot be empty");
    } 
    else if (pwd !== confirmPwd){
      alert("passwords are not same");
    } 
    else{
      if (user.result.type === "donatee") {
        dispatch(updateDonateePwd(userId, userProfile));
      } 
      else {
        dispatch(updateDonorPwd(userId, userProfile));
      }
      alert("password updated")
      setPwd("")
      setConfirmPwd("")
    }
  };

  const handleChangePassword = (e) => {
    setConfirmPwd(e.target.value)
    setUserProfile({...userProfile, password:e.target.value})
  }

  return (
    // <div>
    //   <Paper>
    //     <label>password reset </label>
    //     <form onSubmit={handleSubmit}>
    //       <TextField
    //         name="password"
    //         variant="outlined"
    //         fullWidth
    //         value={pwd}
    //         onChange={(e) => setPwd(e.target.value)}
    //       />
    //       <TextField
    //         name="confirmPassword"
    //         variant="outlined"
    //         fullWidth
    //         value={confirmPwd}
    //         onChange={(e) => setConfirmPwd(e.target.value)}
    //       />
    //       <button className={classes.purple} variant="contained">
    //         Reset
    //       </button>
    //     </form>
    //   </Paper>
    //   </div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Stack rowGap={2}>
              <TextField
              variant="outlined"
                name="password"
                label="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type={showPassword ? "text" : "password"}
                InputProps = {{endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility/> : <VisibilityOff/> }
                    </IconButton>
                  </InputAdornment>
                )}}
              />
             
                <TextField
                variant="outlined"
                  name="confirmPassword"
                  label="Repeat Password"
                  value={confirmPwd}
                  onChange={handleChangePassword}
                  type="password"
                />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password
            </Button>
          </form>
        </Paper>
    </Container>
    
  );
};

export default Reset;
