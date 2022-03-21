import mongoose from "mongoose";

const donateeSchema = mongoose.Schema({
  profile_pic: { type: String, required: false },
  name: { type: String, required: true },
  type: { type: String },
  donatee_status: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: {type: String },
  dob: {type: String},
  address: {type: String },
  income_docs: {type: String },

});

export default mongoose.model("Donatee", donateeSchema);
