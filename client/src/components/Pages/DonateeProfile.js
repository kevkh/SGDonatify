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
import { Document, Page } from 'react-pdf'
// import sample_pdf from '../client/files/sample.pdf'  

// // Import Worker
// import { Worker } from '@react-pdf-viewer/core';
// // Import the main Viewer component
// import { DocumentLoadEvent, Viewer } from '@react-pdf-viewer/core';

// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// // default layout plugin
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // Import styles of default layout plugin
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const DonateeProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [donateeProfile, setDonateeProfile] = useState("");
  const [reupload, setReupload] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [donateeDOB, setdonateeDOB] =  useState(null)


  //############################################################
  // PDF Upload donateeProfile.income_docs

  // creating new plugin instance
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
 

  // // pdf file onChange state
  // const [pdfFile, setPdfFile]=useState(null);

  // // pdf file error state
  // const [pdfError, setPdfError]=useState('');

  //  // handle file onChange event
  //  const allowedFiles = ['application/pdf'];
  //  const handleFile = (e) =>{
  //    let selectedFile = e.target.files[0];
  //    // console.log(selectedFile.type);
  //    if(selectedFile){
  //      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
  //        let reader = new FileReader();
  //        reader.readAsDataURL(selectedFile);
  //        reader.onloadend=(e)=>{
  //          setPdfError('');
  //          setPdfFile(e.target.result);
  //        }
  //      }
  //      else{
  //        setPdfError('Not a valid pdf: Please select only PDF');
  //        setPdfFile('');
  //      }
  //    }
  //    else{
  //      console.log('please select a PDF');
  //    }
  //  }

   


//###############################################################


  const uploadPic = () => {
    dispatch(updateProfile(user.result._id, donateeProfile));
    setReupload(!reupload);
  };

  console.log("reupload", reupload);

  useEffect(() => {
    async function fetchData() {
      console.log(user.result._id);
      let response = await axios.get(
        `http://localhost:5000/donatee/${user.result._id}`
      );
      setDonateeProfile(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {

    setdonateeDOB(new Date(donateeProfile.dob))

  }, [donateeProfile])

  console.log("Income Data:", donateeProfile.income_docs)

  //insertPDF = donateeProfile.income_docs;

  // Doc load 
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


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
              <label>Gender:</label>
              <h1>{donateeProfile.gender}</h1>
            </Paper>

            <Paper>
              <label>DOB:</label>
              <h1>{donateeDOB?.getDate()}/{donateeDOB?.getMonth()+1}/{donateeDOB?.getFullYear()}</h1>
            </Paper>

            <Paper>
              <label>Address:</label>
              <h1>{donateeProfile.address}</h1>
            </Paper>

            <Paper>
              <label>Household Income Document:</label>
              {/* <h1>{donateeProfile.income_docs}</h1> */}
            
              <object width="100%" height="700" data= {donateeProfile.income_docs} type="application/pdf">   </object>
              
              {/* <iframe src={donateeProfile.income_docs} />              */}
              {/* <iframe src = {sample_pdf} /> */}

              {/* RenderPDF */}
              {/* <div>
              <Document
                file= {donateeProfile.income_docs}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>Page {pageNumber} of {numPages}</p>
            </div> */}

              {/* New Upload PDF */}
              {/* <label><h5>Upload PDF of Household Income Document:</h5></label>
              <br></br>

              <input type='file' className="form-control"
              onChange={handleFile}></input> */}

              {/* we will display error message in case user select some file
              other than pdf */}
              {/* {pdfError&&<span className='text-danger'>{pdfError}</span>} */}

              {/* ################################################################## */}
               {/* View PDF */}
 

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