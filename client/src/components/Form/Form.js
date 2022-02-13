import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux"; // useSelector fetch data
import FileBase from "react-file-base64";
import { Grid, CircularProgress} from "@material-ui/core";
import useStyles from "./styles";
import { createForm, updateForm } from "../../actions/forms";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
      title: "",
      desc: "",
      town: "",
      flat_type: "",
      block: "",
      street_name: "",
      //storeyRange: "",
      floor_area_sqm: "",
      flat_model: "",
      //leaseStartDate: "",
      remaining_lease: "",
      resale_price: "",
      //tags: "",
      selectedFile: "",
  });

  // fetch current form by id
  const form = useSelector((state) =>
    currentId
      ? state.forms.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  // Tis is to populate value from form
  useEffect(() => {
    if (form) setPostData(form); // populate form data
  }, [form]); // dependencyArr, form value changes

  function refresh() {
     window.location.reload(true);
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (postData.title === "") {
      alert("Please enter a title!");
    }else if(postData.desc === ""){
      alert("Please enter a description!");
    }else if(postData.town === ""){
      alert("Please select a town!");
    }else if(postData.street_name === ""){
      alert("Please enter a street name!");
    }else if(postData.flat_type === ""){
      alert("Please select a flat type!");
    }else if(postData.block === ""){
      alert("Please enter a block number!");
    }else if(postData.flat_model === ""){
      alert("Please select a flat model!");
    }else if(postData.remaining_lease === ""){
      alert("Please enter the remaining lease left!");
    }else if(postData.resale_price === ""){
      alert("Please enter a resale price!");
    }else if(postData.floor_area_sqm === ""){
      alert("Please enter a floor area sqm!");
    }
    else{
      if (currentId === 0) {
        //dispatch(createForm(postData));
        // check if currently have the user
        dispatch(createForm({ ...postData, name: user?.result?.name }));
        clear();
  
      } else {
        //dispatch(updateForm(currentId, postData));
        dispatch(updateForm(currentId, { ...postData, name: user?.result?.name }));
        clear();
        refresh();
      }
        //clear();
    }

  };

// if no donors logged in
  //if (!user?.result?.donor_status) {

  // if status pending/rejected, dont show create form
  if (user?.result?.donor_status === "Pending") {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          <p>Waiting for Admin's approval before you can create a form. </p> 
          <p> Contact admin@gmail.com for more information. </p>
        </Typography>
      </Paper>
    );
  }
  if (user?.result?.donor_status === "Rejected") {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          <p> Your application has been rejected for various reasons. </p>
          <p> Contact admin@gmail.com for more information. </p>

        </Typography>
      </Paper>
    );
  }
  if (user?.result?.donor_status === "Blacklisted") {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
        <p> You have been blacklisted due to bad ratings and misconduct. </p>
        <p> Contact admin@gmail.com for more information. </p>
        </Typography>
      </Paper>
    );
  }


  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      desc: "",
      town: "",
      flat_type: "",
      block: "",
      street_name: "",
      //storeyRange: "",
      floor_area_sqm: "",
      flat_model: "",
      //leaseStartDate: "",
      remaining_lease: "",
      resale_price: "",
      //tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${form.title}"` : "Creating a Form"}
        </Typography>
        {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <FormControl fullWidth>
          <InputLabel id="town">Select Town</InputLabel>
          <Select
            labelId="town"
            id="town"
            value={postData.town}
            label="Town"
            onChange={(e) => setPostData({ ...postData, town: e.target.value })} 
          >
            <MenuItem value={"ANG MO KIO"}>ANG MO KIO</MenuItem>
            <MenuItem value={"BEDOK"}>BEDOK</MenuItem>
            <MenuItem value={"BISHAN"}>BISHAN</MenuItem>
            <MenuItem value={"BUKIT BATOK"}>BUKIT BATOK</MenuItem>
            <MenuItem value={"BUKIT MERAH"}>BUKIT MERAH</MenuItem>
            <MenuItem value={"BUKIT PANJANG"}>BUKIT PANJANG</MenuItem>
            <MenuItem value={"BUKIT TIMAH"}>BUKIT TIMAH</MenuItem>
            <MenuItem value={"CENTRAL AREA"}>CENTRAL AREA</MenuItem>
            <MenuItem value={"CHOA CHU KANG"}>CHOA CHU KANG</MenuItem>
            <MenuItem value={"CLEMENTI"}>CLEMENTI</MenuItem>
            <MenuItem value={"GEYLANG"}>GEYLANG</MenuItem>
            <MenuItem value={"HOUGANG"}>HOUGANG</MenuItem>
            <MenuItem value={"JURONG EAST"}>JURONG EAST</MenuItem>
            <MenuItem value={"JURONG WEST"}>JURONG WEST</MenuItem>
            <MenuItem value={"KALLANG/WHAMPOA"}>KALLANG/WHAMPOA</MenuItem>
            <MenuItem value={"MARINE PARADE"}>MARINE PARADE</MenuItem>
            <MenuItem value={"PASIR RIS"}>PASIR RIS</MenuItem>
            <MenuItem value={"PUNGGOL"}>PUNGGOL</MenuItem>
            <MenuItem value={"QUEENSTOWN"}>QUEENSTOWN</MenuItem>
            <MenuItem value={"SEMBAWANG"}>SEMBAWANG</MenuItem>
            <MenuItem value={"SENG KANG"}>SENG KANG</MenuItem>
            <MenuItem value={"SERANGOON"}>SERANGOON</MenuItem>
            <MenuItem value={"TAMPINES"}>TAMPINES</MenuItem>
            <MenuItem value={"TOA PAYOH"}>TOA PAYOH</MenuItem>
            <MenuItem value={"WOODLANDS"}>WOODLANDS</MenuItem>
            <MenuItem value={"YISHUN"}>YISHUN</MenuItem>
   
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="flat_type">Select no. of rooms</InputLabel>
          <Select
            labelId="flat_type"
            id="flat_type"
            value={postData.flat_type}
            label="Flat Type"
            onChange={(e) => setPostData({ ...postData, flat_type: e.target.value })} 
          >
            <MenuItem value={"3 ROOM"}>3-ROOM</MenuItem>
            <MenuItem value={"4 ROOM"}>4-ROOM</MenuItem>
            <MenuItem value={"5 ROOM"}>5-ROOM</MenuItem>
            <MenuItem value={"EXECUTIVE"}>EXECUTIVE</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="flat_model">Select Flat Model:</InputLabel>
          <Select
            labelId="flat_model"
            id="flat_model"
            value={postData.flat_model}
            label="Flat Model"
            onChange={(e) => setPostData({ ...postData, flat_model: e.target.value })} 
          >
            <MenuItem value={"Apartment"}>Apartment</MenuItem>
            <MenuItem value={"DBSS"}>DBSS</MenuItem>
            <MenuItem value={"Improved"}>Improved</MenuItem>
            <MenuItem value={"Maisonette"}>Maisonette</MenuItem>
            <MenuItem value={"Model A"}>Model A</MenuItem>
            <MenuItem value={"Model A-Maisonette"}>Model A-Maisonette</MenuItem>
            <MenuItem value={"Model A2"}>Model A2</MenuItem>
            <MenuItem value={"Multi Generation"}>Multi Generation</MenuItem>
            <MenuItem value={"New Generation"}>New Generation</MenuItem>
            <MenuItem value={"Premium Apartment"}>Premium Apartment</MenuItem>
            <MenuItem value={"Premium Apartment Loft"}>Premium Apartment Loft</MenuItem>
            <MenuItem value={"Simplified"}>Simplified</MenuItem>
            <MenuItem value={"Standard"}>Standard</MenuItem>
            <MenuItem value={"Type S1"}>Type S1</MenuItem>
            <MenuItem value={"Type S2"}>Type S2</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="block"
          variant="outlined"
          label="block"
          fullWidth
          value={postData.block}
          onChange={(e) => setPostData({ ...postData, block: e.target.value })}
        />
        <TextField
          name="street_name"
          variant="outlined"
          label="street Name"
          fullWidth
          value={postData.street_name}
          onChange={(e) =>
            setPostData({ ...postData, street_name: e.target.value })
          }
        />
     
        
        <TextField
          name="floor Area"
          variant="outlined"
          label="Floor Area (sqm)"
          fullWidth
          value={postData.floor_area_sqm}
          onChange={(e) =>
            setPostData({ ...postData, floor_area_sqm: e.target.value })
          }
        />

        {/* <TextField
          name="leaseStartDate"
          variant="outlined"
          label="leaseStartDate"
          fullWidth
          value={postData.leaseStartDate}
          onChange={(e) =>
            setPostData({ ...postData, leaseStartDate: e.target.value })
          }
        /> */}
        <TextField
          name="remaining_lease"
          variant="outlined"
          label="Remaining Lease (Yrs)"
          fullWidth
          value={postData.remaining_lease}
          onChange={(e) =>
            setPostData({ ...postData, remaining_lease: e.target.value })
          }
        />
        <TextField
          name="resale_price"
          variant="outlined"
          label="Resale Price $"
          fullWidth
          value={postData.resale_price}
          onChange={(e) => setPostData({ ...postData, resale_price: e.target.value })}
        />

        <TextField
          name="desc"
          variant="outlined"
          label="Add Description here"
          fullWidth
          multiline
          rows={4}
          value={postData.desc}
          onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
        />
        {/* <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        /> */}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
