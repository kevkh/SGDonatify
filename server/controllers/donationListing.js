import mongoose from "mongoose";
import donationListingModel from "../models/donationListing.js"; // import model

export const getUncompletedDonationListing = async (req, res) => {
    // add async
  
    try {
      var donationListing = await donationListingModel.find(); // takes time, so add "await"
      donationListing = donationListing.filter((listing) => listing.donationValue != listing.totalAmountCollected)
      res.status(200).json(donationListing); // return array of objs  
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const getAllDonationListing = async (req, res) => {
    // add async
  
    try {
      const donationListing = await donationListingModel.find(); // takes time, so add "await"
      res.status(200).json(donationListing); // return array of objs
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const updateDonation = async (req, res) => {
  
    try {
      const id = req.params.listingId
      const donationListing = await donationListingModel.findById(id)
      if (req.body.type == 'totalAmountCollected')
      {
        
        const updatedValue = donationListing.totalAmountCollected + parseInt(req.body.amount)
        if (updatedValue == donationListing.donationValue){
          const updatedDonationListing = await donationListingModel.findByIdAndUpdate(id,{totalAmountCollected: updatedValue, status:'Completed'},{new:true})
          res.status(200).json(updatedDonationListing); // return array of objs
        }
        else{
          const updatedDonationListing = await donationListingModel.findByIdAndUpdate(id,{totalAmountCollected: updatedValue},{new:true})
          res.status(200).json(updatedDonationListing); // return array of objs
        }

        
      }
      else if (req.body.type == 'status')
      {
        
        const newStatus = req.body.amount
        const updatedDonationListing = await donationListingModel.findByIdAndUpdate(id,{status: newStatus},{new:true})
        res.status(200).json(updatedDonationListing); // return array of objs
      }
      
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const createDonation = async (req, res) => {
  
  const data = req.body.postData
  console.log(data)
  const newListing = new donationListingModel({...data, dateCreated: new Date().toISOString()})

    try {

      const result = await newListing.save();
      res.status(201).json(result);

    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };