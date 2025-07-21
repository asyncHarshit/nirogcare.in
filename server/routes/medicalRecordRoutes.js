import express from "express";
import {
  addMedicalRecord,
  getMedicalRecords,
} from "../controllers/medicalRecord.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/medical-record", addMedicalRecord);
router.get("/get-medical-record", getMedicalRecords);

export default router;
