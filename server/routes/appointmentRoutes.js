import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAppointmentById,
  cancelAppointment,
} from "../controllers/appointment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createAppointment);
router.get("/", getMyAppointments);
router.get("/:id", getAppointmentById);
router.patch("/:id/cancel", cancelAppointment);

export default router;
