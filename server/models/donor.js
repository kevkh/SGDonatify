import mongoose from "mongoose";

// Old schema
const donorSchema = mongoose.Schema({
  profile_pic: { type: String, required: false },
  name: { type: String, required: true },
  type: { type: String },
  donor_status: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: {type: String },
  dob: {type: String},
  address: {type: String },
  ccNum: {type: String },
  csv: {type: String },
  donation_details: {type: Object },

}, { minimize: false }); 

export default mongoose.model("Donor", donorSchema);
