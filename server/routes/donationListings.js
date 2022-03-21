import express from "express";
import {getUncompletedDonationListing, updateDonation,getAllDonationListing,createDonation} from "../controllers/donationListing.js"

const router = express.Router();

router.get("/",getUncompletedDonationListing)
router.patch("/:listingId",updateDonation);
router.post("/",createDonation);

export default router;