import express from "express";
import {
  registerLab,
  getMyLabProfile,
  updateLabProfile,
  verifyLab,
} from "../controllers/lab.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/register", registerLab);
router.get("/profile", getMyLabProfile);
router.put("/profile", updateLabProfile);
router.patch("/verify/:labId", verifyLab);

export default router;
