import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    margin: '30px 0',
    justifyContent: "center",
    display: "flex",
  },
  verticalCenter: {
    justifyContent: "center",
    display: "flex",
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    display: 'block',
    float: 'left',
    marginTop:'auto',
    marginBottom:'auto',
    fontWeight: 600 
  },
  image: {
    height: '100px',
    display: 'block',
    float: 'left'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
   
  },




}));