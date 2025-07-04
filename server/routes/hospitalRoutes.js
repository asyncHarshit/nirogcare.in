import express from "express";
import {
  registerHospital,
  getMyHospitalProfile,
  getPatientStats,
} from "../controllers/hospital.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/register", registerHospital);

router.get("/profile", getMyHospitalProfile);

router.get("/stats", getPatientStats);

export default router;
