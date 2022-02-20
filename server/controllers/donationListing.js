import mongoose from "mongoose";
import donationListingModel from "../models/donationListing.js"; // import model

export const getDonationListing = async (req, res) => {
    // add async
  
    try {
      const donationListing = await donationListingModel.find(); // takes time, so add "await"
      res.status(200).json(donationListing); // return array of objs
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };