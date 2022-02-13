import mongoose from "mongoose";

// No change
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);
