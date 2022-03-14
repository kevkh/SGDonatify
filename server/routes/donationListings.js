import express from "express";
import {getUncompletedDonationListing, updateDonation,getAllDonationListing} from "../controllers/donationListing.js"

const router = express.Router();

router.get("/",getUncompletedDonationListing)
router.patch("/:listingId",updateDonation);

export default router;