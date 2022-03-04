import axios from "axios";

// // prev localhost
// const url = 'http://localhost:5000/listings';

// Heroku host, ignore this
// const url = 'https://azon-cz2006.herokuapp.com/listings';
// const API = axios.create({ baseURL: 'https://azon-cz2006.herokuapp.com' });

// the base API URL
export const API = axios.create({ baseURL: "http://localhost:5000" }); // work on localhost

// send token back to backend, so that backend middleware can verify that user is actually log in.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Donatee Req Form
export const fetchForm = () => API.get("/forms");

// take in param (newForm) - the entire Form
export const createForm = (newForm) => API.post("/forms", newForm);

//Update
export const updateForm = (id, updateForm) =>
  API.patch(`/forms/${id}`, updateForm);

//Delete
export const deleteForm = (id) => API.delete(`/forms/${id}`);

// Like
//export const likeForm = (id) => API.patch(`/forms/${id}/likeForm`);

// User routes
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const userUpdatePwd = (id, formData) =>
  API.patch(`/user/${id}`, formData);

//fetch user
export const fetchUser = () => API.get("/user");

//delete User
export const deleteUser = (userID) => API.delete(`/user/${userID}`);

export const userUpdateProfile = (id, formData) =>
  API.patch(`/user/${id}/profile`, formData);

// Donor routes
export const donorSignIn = (formData) => API.post("/donor/signin", formData);
export const donorSignUp = (formData) => API.post("/donor/signup", formData);
export const donorUpdateProfile = (id, formData) =>
  API.patch(`/donor/${id}/profile`, formData);
export const donorUpdatePwd = (id, formData) =>
  API.patch(`/donor/${id}/psw`, formData);

//fetch donor
export const fetchDonor = () => API.get("/donors");

//delete donor
export const deleteDonor = (userID) => API.delete(`/donor/${userID}`);


/////////////////////////
// Donatee routes
export const donateeSignIn = (formData) => API.post("/donatee/signin", formData);
export const donateeSignUp = (formData) => API.post("/donatee/signup", formData);
export const donateeUpdateProfile = (id, formData) =>
  API.patch(`/donatee/${id}/profile`, formData);
export const donateeUpdatePwd = (id, formData) =>
  API.patch(`/donatee/${id}/psw`, formData);

//fetch Donatee
export const fetchDonatee = () => API.get("/donatees");

//delete Donatee
export const deleteDonatee = (userID) => API.delete(`/donatee/${userID}`);

//get donation listings
export const getDonationListings = () => API.get('/donationlisting');
export const donationValueUpdate = (userID, amount) => API.patch(`/donationlisting/${userID}`,amount);


