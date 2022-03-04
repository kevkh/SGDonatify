import express from "express";
import {getDonationListing, updateDonation} from "../controllers/donationListing.js"

const router = express.Router();

router.get("/",getDonationListing)
router.patch("/:listingId",updateDonation);

export default router;