import mongoose from "mongoose";

const donationListingSchema = mongoose.Schema({
    name: {type:String},
    donationValue: { type: Number },
    dateCreated: { type: Date},
    totalAmountCollected: {type: Number},
    status: {type:String},
    createdBy: {type:String},
    createdById: {type:String},
    description: {type:String}
    
  
  });
  
  export default mongoose.model("DonationListing", donationListingSchema);