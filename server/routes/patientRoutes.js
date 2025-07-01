import express from "express"
import { getNearbyHospitals, patientProfile , getNearbylabs } from "../controllers/patient.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createAppointment , getMyAppointments ,cancelAppointment, getAppointmentById} from "../controllers/appointment.controller.js";

const router = express.Router();



router.post("/profile",protect,patientProfile);
router.get("/near-hospitals",protect,getNearbyHospitals)
router.get("/near-labs",protect,getNearbylabs)


router.post("/book-appointment",protect,createAppointment)
router.get("/appointments",protect,getMyAppointments)
router.patch("/cancel-appointment",protect,cancelAppointment)
router.get("/this-appointment",protect,getAppointmentById)



export default router

