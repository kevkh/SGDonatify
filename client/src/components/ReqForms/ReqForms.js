import React from "react";
import ReqForm from "./ReqForm/ReqForm";
import useStyles from "./styles";

import { Grid, CircularProgress, Typography, Paper } from "@material-ui/core";
// fetch from global redux store
import { useSelector } from "react-redux";

const ReqForms = ({ form, setCurrentId }) => {
  var forms = useSelector((state) => state.forms);

  const classes = useStyles(); // use css style
  const user = JSON.parse(localStorage.getItem('profile'));
  
  forms = forms.filter((form)=> form.creator === user?.result?._id)
  return (
    // Loading spinner, show the forms if its not 0
    !forms.length ? (
      // <CircularProgress /> 
      <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
       You have not created any forms. 
      </Typography>
    </Paper> 
    
    ) : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {forms.map((form) => (
          <Grid key={form._id} item xs={12} sm={6}>
            {/* Props drilling, keep sending over to the child */}
            <ReqForm form={form} setCurrentId={setCurrentId} />
            {/* {(user?.result?._id === form?.creator) && (
        
            )} */}
          </Grid>
        ))}
      </Grid>
    )
  );
};


export default ReqForms;
