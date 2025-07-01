import { Doctor } from "../models/Doctor.js";
import {Appointment} from "../models/Appointment.js"
import { Patient } from "../models/Patient.js";

// Create or Update Doctor Profile
export const doctorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      gender,
      specialization,
      experience,
      licenseNumber,
      hospitalId
    } = req.body;

    if (!gender || !specialization || !licenseNumber || !hospitalId) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Check if doctor profile already exists for this user
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      
      const newDoctor = await Doctor.create({
        userId,
        gender,
        specialization,
        experience,
        licenseNumber,
        hospitalId
      });

      return res.status(201).json({
        message: "Doctor profile created successfully.",
        doctor: newDoctor,
      });

    } else {
      
      doctor.experience = experience !== undefined ? experience : doctor.experience;
      doctor.hospitalId = hospitalId || doctor.hospitalId;

      await doctor.save();

      return res.status(200).json({
        message: "Doctor profile updated successfully.",
        doctor,
      });
    }

  } catch (error) {
    console.error("Error in doctor profile handler:", error);
    return res.status(500).json({ error: "Server error while handling doctor profile." });
  }
};

// fetch todays patients

export const todaysPatients = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const hospitalId = req.user.hospitalId;
    const now = new Date();

    // Convert to IST (UTC + 5.5 hours)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffset);

    const year = istNow.getFullYear();
    const month = istNow.getMonth();
    const date = istNow.getDate();

    const istStart = new Date(Date.UTC(year, month, date, 0, 0, 0));
    const istEnd = new Date(Date.UTC(year, month, date, 23, 59, 59, 999));

    const appointments = await Appointment.find({
      doctorId,
      hospitalId,
      date: { $gte: istStart, $lte: istEnd },
      status: "booked",
    })
      .populate("bookedBy", "name email")
      .sort({ timeSlot: 1 });

    return res.status(200).json({
      message: "Today's patients fetched successfully.",
      total: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error("Error fetching today's patients:", error);
    return res.status(500).json({
      error: "Server error while fetching today's patients."
    });
  }
};


// patient details 



