import express from "express";
import {
  addMedicineRecord,
  getMedicineRecords,
} from "../controllers/medicine.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addMedicineRecord);
router.get("/:patientId/:forPatientType", getMedicineRecords);

export default router;
