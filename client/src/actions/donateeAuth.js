import { AUTH, FETCH_ALL_DONATEE, USERUPDATE,DELETE  } from "../constants/actionTypes";
import * as api from "../api/index.js";

// async action creators have to use redux thunk, (a function returns an async func with dispatch)
export const donateeSignin = (formData, router) => async (dispatch) => {
  try {
    // log in the user

    const { data } = await api.donateeSignIn(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    if(data.result.type === "admin")
    {
      router.push("/DonateeList");
    }
    else
    {
      router.push("/donateeProfile");
    }
  } catch (error) {
    alert("Wrong email/password. Please try again");
  }
};

export const donateeSignup = (formData, router) => async (dispatch) => {
  try {
    // sign up the user

    const { data } = await api.donateeSignUp(formData); // makes a req to the api

    dispatch({ type: AUTH, data });

    router.push("/donateeProfile"); // redirect home
  } catch (error) {
    alert("Email already exist");
  }
};

export const updateProfile = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.donateeUpdateProfile(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateDonateePwd = (userId, profile) => async (dispatch) => {
  try {
    const { data } = await api.donateeUpdatePwd(userId, profile);
    dispatch({ type: USERUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getDonatee = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDonatee();
    dispatch({ type: FETCH_ALL_DONATEE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDonatee = (userID) => async (dispatch) => {
  try {
    const { data } = await api.deleteDonatee(userID);
    console.log(data);
    dispatch({ type: DELETE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};