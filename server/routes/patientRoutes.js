import express from "express"
import { getNearbyHospitals, patientProfile , getNearbylabs } from "../controllers/patient.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createAppointment , getMyAppointments ,cancelAppointment, getAppointmentById} from "../controllers/appointment.controller.js";
import { updateVitalsForUser ,getVitalsForUser} from "../controllers/patient.controller.js";
const router = express.Router();



router.post("/profile",protect,patientProfile);
router.get("/near-hospitals",protect,getNearbyHospitals)
router.get("/near-labs",protect,getNearbylabs)
router.patch("/update-vitals", updateVitalsForUser);
router.get('/vitals',protect,getVitalsForUser)


router.post("/book-appointment",protect,createAppointment)
router.get("/appointments",protect,getMyAppointments)
router.get("/appointments/:id",protect,getAppointmentById)
router.patch("/appointments/:id/cancel",protect,cancelAppointment)










export default router

