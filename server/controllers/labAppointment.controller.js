import { LabAppointment } from "../models/LabAppointment.js";


export const bookLabAppointment = async (req, res) => {
  try {
    const {
      forPatientType,
      labId,
      testDetails,
      scheduledDate,
      timeSlot,
      notes,
      doctorReference,
    } = req.body;

    if (
      !forPatientType ||
      !labId ||
      !testDetails?.testName ||
      !testDetails?.testType ||
      !scheduledDate ||
      !timeSlot
    ) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const appointment = new LabAppointment({
      bookedBy: req.user.id,
      forPatientType,
      labId,
      testDetails,
      scheduledDate,
      timeSlot,
      notes,
      doctorReference,
    });

    const saved = await appointment.save();

    res.status(201).json({
      message: "Lab appointment booked successfully.",
      appointment: saved,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Server error while booking appointment." });
  }
};

// @desc: Get all lab appointments for a user
export const getMyLabAppointments = async (req, res) => {
  try {
    const appointments = await LabAppointment.find({
      bookedBy: req.user.id,
      isDeleted: false,
    })
      .populate("labId", "name address")
      .populate("doctorReference", "name specialization")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Unable to fetch appointments." });
  }
};
