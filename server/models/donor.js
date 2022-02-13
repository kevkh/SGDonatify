import mongoose from "mongoose";

// Old schema
const donorSchema = mongoose.Schema({
  profile_pic: { type: String, required: false },
  name: { type: String, required: true },
  CEA: { type: String, required: true },
  type: { type: String },
  donor_status: { type: String },
  agency: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  overallRating: { type: Number, required: true },
  ratingList: { type: Array, required: false },
  reviewList: { type: Array, required: false },
  description: { type: String, required: true },

});

// new schema
// const donorSchema = mongoose.Schema({
//   profile_pic: { type: String, required: false },
//   name: { type: String, required: true },
//   type: { type: String },
//   status: { type: String },
//   phoneNumber: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },

// });

export default mongoose.model("Donor", donorSchema);
