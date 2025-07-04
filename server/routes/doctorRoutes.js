import express from "express";
import {
  doctorProfile,
  todaysPatients,
  addMedicineRecord,
  getMedicineRecords,
} from "../controllers/doctor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);


router.post("/profile", doctorProfile);


router.get("/patients", todaysPatients);


router.post("/medicine", addMedicineRecord);


router.get("/medicine/:patientId/:forPatientType", getMedicineRecords);

export default router;
