import express from "express";
import {
  registerHospital,
  getMyHospitalProfile,
  getPatientStats,
  getAllHospitalPatients,
  getAllAssistantsForHospital
} from "../controllers/hospital.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/register", registerHospital);

router.get("/profile", getMyHospitalProfile);

router.get("/stats", getPatientStats);

router.get("/patients", getAllHospitalPatients);

router.get('/all-assistants',getAllAssistantsForHospital)

export default router;
