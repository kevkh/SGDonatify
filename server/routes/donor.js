import express from "express";
import {
  donorUpdateProfile,
  getDonor,deleteDonor,
  donorUpdatePwd,
} from "../controllers/donor.js";
const router = express.Router();
import donorModel from "../models/donor.js";

import { donorSignin, donorSignup } from "../controllers/donor.js"; // logic in controller
import auth from "../middleware/auth.js";

router.get("/", getDonor);
router.get("/:id", async (req, res) => {
  try {
    const donor = await donorModel.findById(req.params.id);
    res.status(200).json(donor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/signin", donorSignin);
router.post("/signup", donorSignup);
router.patch("/:id/profile", auth, donorUpdateProfile);
router.patch("/:id/psw", auth, donorUpdatePwd);
router.delete("/:id",deleteDonor)

export default router;
