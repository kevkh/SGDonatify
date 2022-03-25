import { Paper, Button } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/donateeAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import Check from "@mui/icons-material/Check";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const DonateeProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [donateeProfile, setDonateeProfile] = useState("");
  const [reupload, setReupload] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const uploadPic = () => {
    dispatch(updateProfile(user.result._id, donateeProfile));
    setReupload(!reupload);
  };

  console.log("reupload", reupload);

  useEffect(() => {
    history.push('/donateeProfile')
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/donatee/${user.result._id}`
      );
      setDonateeProfile(response.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {user.result.type === "donatee" ? (

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
               donateeProfile.profile_pic ||
              "https://www.back-tobasics.org/wp-content/uploads/2017/05/default-profile-pic.png"
            }
          ></img>
          {reupload ? (
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setDonateeProfile({ ...donateeProfile, profile_pic: base64 })
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
              <h1>{donateeProfile.name}</h1>
            </Paper>

            <Paper>
              <label>Email:</label>
              <h1>{donateeProfile.email}</h1>
            </Paper>

            <Paper>
              <label>Phone Number:</label>
              <h1>{donateeProfile.phoneNumber}</h1>
            </Paper>

            <Paper>
              <label>DOB:</label>
              <h1>{donateeProfile.dob}</h1>
            </Paper>

            <Paper>
              <label>Address:</label>
              <h1>{donateeProfile.address}</h1>
            </Paper>

            <Paper>
              <label>Household Income Documents:</label>
              {/* <h1>{donateeProfile.income_docs}</h1> */}
              <object width="100%" height="400" data= {donateeProfile.income_docs} type="application/pdf">   </object>
            </Paper>
            
            <Button
              component={Link}
              to={{
                pathname: `/donateeProfile/${donateeProfile._id}`,  // maybe change to donateeprofile
              }}
              className={classes.purple}
              variant="contained"
              sx={{ml:2}}
            >
              Edit Profile
            </Button>
            <Button
              component={Link}
              to="/reset"
              className={classes.purple}
              variant="contained"
              sx={{ml:2}}
            >
              Reset Password
            </Button>
          </div>
        </section>
      ) : (
        <Button
          component={Link}
          to="/reset"
          className={classes.purple}
          variant="contained"
          sx={{ml:2}}
        >
          Reset Password
        </Button>
      )}
    </div>
  );
};

export default DonateeProfile;