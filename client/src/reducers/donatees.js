import { FETCH_ALL_DONATEE } from "../constants/actionTypes";

export default (donatees = [], action) => {
  switch (action.type) {
    case FETCH_ALL_DONATEE:
      return action.payload;
    default:
      return donatees;
  }
};