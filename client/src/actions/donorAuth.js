import { AUTH, FETCH_ALL_DONOR, USERUPDATE,DELETE  } from "../constants/actionTypes";
import * as api from "../api/index.js";

// async action creators have to use redux thunk, (a function returns an async func with dispatch)
export const donorSignin = (formData, router) => async (dispatch) => {
  try {
    // log in the user

    const { data } = await api.donorSignIn(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    if(data.result.type === "admin")
    {
      router.push("/ViewRequests");
    }
    else
    {
      router.push("/profile");
    }
  } catch (error) {
    alert("Wrong email/password. Please try again");
  }
};

export const donorSignup = (formData, router) => async (dispatch) => {
  try {
    // sign up the user

    const { data } = await api.donorSignUp(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/profile"); // redirect home
  } catch (error) {
    alert("Email already exist");
  }
};

export const updateProfile = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.donorUpdateProfile(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDonorPwd = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.donorUpdatePwd(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDonorDonationDetails = (userId, donationDetails) => async (dispatch) => {
  try {
    const { data } = await api.donorUpdateDonationDetails(userId, donationDetails)
    
  } catch (error) {
    console.log(error);
  }
};


export const getDonor = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDonor();
    dispatch({ type: FETCH_ALL_DONOR, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDonor = (userID) => async (dispatch) => {
  try {
    const { data } = await api.deleteDonor(userID);
    console.log(data);
    dispatch({ type: DELETE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};