import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/donorAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import Check from "@mui/icons-material/Check";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [donorProfile, setDonorProfile] = useState("");
  const [reupload, setReupload] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const uploadPic = () => {
    dispatch(updateProfile(user.result._id, donorProfile));
    setReupload(!reupload);
  };

  console.log("reupload", reupload);

  useEffect(() => {
    history.push('/profile')
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/donor/${user.result._id}`
      );
      setDonorProfile(response.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {user.result.type === "donor" ? (

        <section
          style={{
            textAlign: "center",
            paddingLeft: "30%",
            paddingRight: "30%",
          }}
        >
          <img
            style={{ width: 300 }}
            src={
              donorProfile.profile_pic ||
              "https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png"
            }
          ></img>
          {reupload ? (
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setDonorProfile({ ...donorProfile, profile_pic: base64 })
                }
              />
              <Button onClick={uploadPic}>
                <Check></Check>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => {
                  setReupload(!reupload);
                }}
              >
                Upload Photo
                <FileUploadIcon></FileUploadIcon>
              </Button>
            </div>
          )}

          <div className={classes.overlay}>
            <Paper>
              <label>Name:</label>
              <h1>{donorProfile.name}</h1>
            </Paper>
            <Paper>
              <label>CEA number:</label>
              <h4>{donorProfile.CEA}</h4>
            </Paper>
            <Paper>
              <label>Agency:</label>
              <h4>{donorProfile.agency}</h4>
            </Paper>
            <Paper>
              <label>Ranking:</label>
              <h4>{donorProfile.overallRating}</h4>
            </Paper>
            <Paper>
              <label>Description:</label>
              <h4>{donorProfile.description}</h4>
              {/* <Link to="/profile/description">Add description</Link> */}
            </Paper>
            <Button
              component={Link}
              to={{
                pathname: `/profile/${donorProfile._id}`,
              }}
              className={classes.purple}
              variant="contained"
            >
              Edit Profile
            </Button>
            <Button
              component={Link}
              to="/reset"
              className={classes.purple}
              variant="contained"
            >
              Reset Password
            </Button>
          </div>
        </section>
      ) : <></>}
    </div>
  );

};

export default Profile;
