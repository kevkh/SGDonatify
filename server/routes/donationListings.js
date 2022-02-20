import express from "express";
import {getDonationListing} from "../controllers/donationListing.js"

const router = express.Router();

router.get("/",getDonationListing)

export default router;