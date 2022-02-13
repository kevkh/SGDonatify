import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useStyles from './styles';
import { useSelector } from "react-redux";
import { deleteForm } from '../../../actions/forms';


const ReqForm = ({ form, setCurrentId }) => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  // Likes logic here
  // const Likes = () => {
  //   //adding form.likes presumes that it is not undefined*, form.likes.length > 0 alone gives undefined error
  //   if (form.likes && form.likes.length > 0) {
  //     // check if current person likes/dislikes smth by id
  //     return form.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
  //       ? (
  //         <><ThumbUpAltIcon fontSize="small" />&nbsp;{form.likes.length > 2 ? `You and ${form.likes.length - 1} others` : `${form.likes.length} like${form.likes.length > 1 ? 's' : ''}` }</>
  //       ) : (
  //         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{form.likes.length} {form.likes.length === 1 ? 'Like' : 'Likes'}</>
  //       );
  //   }

  //   return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  // };

    //console.log(forms);
    return (
        <Card className={classes.card}>
        <CardMedia className={classes.media} image={form.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={form.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{form.name}</Typography>
          <Typography variant="body2">{moment(form.createdAt).fromNow()}</Typography>
        </div>
         {/* check userid(manual/google) is = to the creator, if yes, then show delete button */}
        {(user?.result?.googleId === form?.creator || user?.result?._id === form?.creator) && (
          
        <div className={classes.overlay2}>
          <Button onClick={() => setCurrentId(form._id)} style={{ color: 'white' }} size="small">
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        
        )}
      
   
        <div className={classes.details}>
          {/* <Typography variant="body2" color="textSecondary" component="h2">{form.tags.map((tag) => `#${tag} `)}</Typography> */}
        </div>

       
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{form.title}</Typography>
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Town: {form.town}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Flat Type: {form.flat_type}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Flat Model: {form.flat_model}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Street Name: {form.street_name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Description: {form.desc}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Remaining Lease: {form.remaining_lease} years</Typography>
          <Typography variant="h5" color="textSecondary" component="h2">Resale Price: ${form.resale_price}</Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">Lease StartDate: {form.leaseStartDate}</Typography> */}

        </CardContent>
    
      
        <CardActions className={classes.cardActions}>
          {/* <Button size="small" color="primary" onClick={() => dispatch(likeForm(form._id))}><ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp; {form.likeCount}  </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deleteForm(form._id))}><DeleteIcon fontSize="small" /> Delete</Button> */}

          {/* if not the login user, disable the buttons for likes/delete will not show */}
        {/* <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeForm(form._id))}>
          <Likes />
        </Button> */}

        {/* check userid(manual/google) is = to the creator, if yes, then show delete button */}
        {(user?.result?.googleId === form?.creator || user?.result?._id === form?.creator) && (
        
        <>
        <Button size="small" color="secondary" onClick = {handleClickOpen}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete ?"}
        </DialogTitle>
        <DialogActions>
            <Button onClick={() => dispatch(deleteForm(form._id))} autoFocus >
                Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
       </Dialog>
       </>
        )}

        </CardActions>
      </Card>
    )
}

export default ReqForm
