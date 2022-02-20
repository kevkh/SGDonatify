import mongoose from "mongoose";

const donationListingSchema = mongoose.Schema({
    name: {type:String},
    donationValue: { type: Number },
    dateCreated: { type: Date},
    totalAmountCollected: {type: Number}
    
  
  });
  
  export default mongoose.model("DonationListing", donationListingSchema);