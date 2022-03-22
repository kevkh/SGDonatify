
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDonorPwd } from "../actions/donorAuth";
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

} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Reset = () => {
  const classes = useStyles();
  let user = JSON.parse(localStorage.getItem("profile"));
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const dispatch = useDispatch();
  const userId = user.result._id;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd === "") {
      alert("passwords cannot be empty");
    } else if (pwd !== confirmPwd) {
      alert("passwords are not same");
    } else {
      user.result.password = pwd;
      console.log(user.result);
      if (user.result.type === "donor") {
        dispatch(updateDonorPwd(userId, user.result));
      } else {
        dispatch(updatePwd(userId, user.result));
      }
      alert("password updated");
    }
  };

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
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="password"
                label="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
             
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  type="password"
                />
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Update Password
            </Button>
          </form>
        </Paper>
    </Container>
    
  );
};

export default Reset;
