import mongoose from "mongoose";

// Old schema
const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  name: String,
  creator: String,
  town: String,
  flat_type: String,
  block: String,
  street_name: String,
  //storeyRange: String,
  floor_area_sqm: String,
  flat_model: String,
 // leaseStartDate: String,
  remaining_lease: String,
  resale_price: String,
 // tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});


// New schema, can edit the fields if needed
// const postSchema = mongoose.Schema({
//     title: String,
//     message: String,
//     name: String,
//     creator: String,
//     request_amount: String,
//     selectedFile: String,
//     createdAt: {
//       type: Date,
//       default: new Date(),
//     },
//   });

// "requestForms is the name of the table in DB", postForm will communicate with the controller
const postForm = mongoose.model("requestForms", postSchema);

export default postForm;