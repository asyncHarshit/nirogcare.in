import express from "express"
import { getNearbyHospitals, patientProfile , getNearbylabs } from "../controllers/patient.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile",protect,patientProfile);
router.get("/near-hospitals",protect,getNearbyHospitals)
router.get("/near-labs",protect,getNearbylabs)



export default router

