import { combineReducers } from "redux";
import donors from "./donors";
import donatees from "./donatees";
import forms from "./forms";
import auth from "./auth";

export default combineReducers({ forms, auth, donors, donatees });
