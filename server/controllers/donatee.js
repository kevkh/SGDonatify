// Put logic here
import bcrypt from "bcryptjs"; // it hashes the password
import jwt from "jsonwebtoken"; // store pwd in browser for a period of time
import mongoose from "mongoose";
import donateeModel from "../models/donatee.js"; // import model

const secret = "test"; // a secret string

// Login/sign in func
export const donateeSignin = async (req, res) => {
  const { email, password } = req.body; // get email and pwd from frontend

  try {
    // Retrieve the existing user
    const existingUser = await donateeModel.findOne({ email });

    // if no existinguser, return dont exist
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // Check if pwd used is correct for the existing user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // wrong pwd, return wrongpwd
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Get the token and store, add a secret string, token expires in 1hr
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign up func
export const donateeSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    type,
    phoneNumber,
    donatee_status,
    email,
    password,
    confirmPassword,
    profile_pic,
    description  

  } = req.body;

  try {
    // Retrieve the existing user
    const existingUser = await donateeModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Check if pwd matches
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match!" });

    // hash the pwd, 12 is the lvl of difficulty (generally use 12)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Pass in the data, combine first and lastname
    const result = await donateeModel.create({   
      name: `${firstName} ${lastName}`,
      type,
      phoneNumber,
      donatee_status,
      email,
      password: hashedPassword,
      confirmPassword,
      profile_pic,
      description,

    });

    // create token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token }); // the user is the result
  } catch (error) {
    //res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
//update profile
export const donateeUpdateProfile = async (req, res) => {
  //extract the id, /forms/123

  const { id } = req.params;

  // edit attributes here
  const {
    name,
    type,
    phoneNumber,
    donatee_status,
    email,
    password,
    profile_pic,
    description,
    gender, 
    dob,
    address,
    income_docs

  } = req.body;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No donatee with id: ${id}`);

  const updatedProfile = {
    name,
    type,
    phoneNumber,
    donatee_status,
    email,
    password,
    profile_pic,
    description,
    gender, 
    dob,
    address,
    income_docs,
    _id: id,

  };

  await donateeModel.findByIdAndUpdate(id, updatedProfile, { new: true });

  res.json(updatedProfile); // save updatedprofile
};

export const donateeUpdatePwd = async (req, res) => {
  //extract the id, /forms/123

  const { id } = req.params;

  // edit attributes here
  const { password } = req.body;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No donatee with id: ${id}`);
  const updatedPassword = await bcrypt.hash(password, 12);

  const updatedProfile = {
    password: updatedPassword,
  };

  await donateeModel.findByIdAndUpdate(id, updatedProfile, { new: true });

  res.json(updatedProfile); // save updatedprofile
};

export const getDonatee = async (req, res) => {
  // add async

  try {
    const donatees = await donateeModel.find({type:"donatee"}); // takes time, so add "await"

    res.status(200).json(donatees); // return array of objs
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const deleteDonatee = async (req, res) => {
  // add async
  
  try {
    const { id } = req.params;
    
    const donatees = await donateeModel.deleteOne({_id:id}); 
    
    res.status(200); // return array of objs
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



