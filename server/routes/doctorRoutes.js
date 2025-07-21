import express from "express";
import {
  doctorProfile,
  todaysPatients,
  addMedicineRecord,
  getMedicineRecords,
  getDoctorsByHospital,
  allTodaysAppointment,
  getDoctorProfile
} from "../controllers/doctor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.use(protect);


router.post("/profile", doctorProfile);
router.get("/get-profile",getDoctorProfile)


router.get("/patients", todaysPatients);


router.post("/medicine", addMedicineRecord);


router.get("/medicine/:patientId/:forPatientType", getMedicineRecords);

router.get("/getAllDoctors",getDoctorsByHospital)

router.get("/getAllDrAppointments", allTodaysAppointment);

export default router;
