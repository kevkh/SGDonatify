import { combineReducers } from "redux";
import donors from "./donors";
import donatees from "./donatees";
import auth from "./auth";
import donationListings from "./donationListing";

export default combineReducers({auth, donors, donatees, donationListings });
