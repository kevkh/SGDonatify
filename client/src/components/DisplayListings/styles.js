import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';
import { fontSize } from '@mui/system';

export default makeStyles((theme) => ({
  verticalCenter: {
    justifyContent: "center",
    display: "flex",
    height: "100%"
  },
  sort: {
    backgroundColor : 'white',
  },
  sortLabel:{
    fontWeight:"600",
    backgroundColor : 'white',
    borderRadius:10,
     
  },
  paginationContainer: {
    height:"100%",
    display: "block",
    float: "right",
    backgroundColor : 'white',
    borderRadius:30,
  },
  pagination:{
    margin:"auto 0"
  }

  



}));