import express from "express";
import {
  donateeUpdateProfile,
  getDonatee,deleteDonatee,
  donateeUpdatePwd,
} from "../controllers/donatee.js";
const router = express.Router();
import donateeModel from "../models/donatee.js";

import { donateeSignin, donateeSignup } from "../controllers/donatee.js"; // logic in controller
import auth from "../middleware/auth.js";

router.get("/", getDonatee);
router.get("/:id", async (req, res) => {
  try {
    const donatee = await donateeModel.findById(req.params.id);
    res.status(200).json(donatee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post("/signin", donateeSignin);
router.post("/signup", donateeSignup);
router.patch("/:id/profile", auth, donateeUpdateProfile);
router.patch("/:id/psw", auth, donateeUpdatePwd);
router.delete("/:id",deleteDonatee)

export default router;
