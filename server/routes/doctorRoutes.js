import { doctorProfile , todaysPatients } from "../controllers/doctor.controller";
import express from "express"
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();


router.post("/profile",protect,doctorProfile);
router.get("/patients",protect,todaysPatients)