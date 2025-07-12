import { Doctor } from "../models/Doctor.js";
import {Appointment} from "../models/Appointment.js"
import User from "../models/User.js";
import { Assistant } from "../models/Assistant.js";
// import { Patient } from "../models/Patient.js";


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


export const addMedicineRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor profile not found." });
    }

    const {
      patientId,
      forPatientType,
      hospitalId,
      medicines,
      notes,
    } = req.body;

    if (!patientId || !forPatientType || !hospitalId || !medicines || medicines.length === 0) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const record = new MedicineRecord({
      patientId,
      forPatientType,
      doctorId: doctor._id,
      hospitalId,
      medicines,
      notes,
    });

    await record.save();

    res.status(201).json({
      message: "Medicine record saved successfully.",
      record,
    });
  } catch (error) {
    console.error("Error saving medicine record:", error);
    res.status(500).json({ error: "Failed to save medicine record." });
  }
};

export const getMedicineRecords = async (req, res) => {
  try {
    const { patientId, forPatientType } = req.params;

    if (!patientId || !forPatientType) {
      return res.status(400).json({ error: "Patient ID and type are required." });
    }

    const records = await MedicineRecord.find({ patientId, forPatientType })
      .populate("doctorId", "specialization")
      .sort({ prescribedAt: -1 });

    res.status(200).json({
      message: "Medicine records fetched.",
      total: records.length,
      records,
    });
  } catch (error) {
    console.error("Error fetching medicine records:", error);
    res.status(500).json({ error: "Failed to fetch medicine records." });
  }
};


export const getDoctorsByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.query;

    if (!hospitalId) {
      return res.status(400).json({ error: "Hospital ID is required." });
    }

    const doctors = await Doctor.find({ hospitalId })
      .populate({
        path: "userId",
        select: "name email",
      })
      .select("specialization experience userId"); 

    const formattedDoctors = doctors.map((doc) => ({
      doctorId: doc._id,
      name: doc.userId?.name || "Unknown",
      email: doc.userId?.email || "Unknown",
      specialization: doc.specialization,
      experience: doc.experience,
    }));

    return res.status(200).json({
      message: "Doctors fetched successfully.",
      total: formattedDoctors.length,
      doctors: formattedDoctors,
    });
  } catch (error) {
    console.error("Error fetching doctors for hospital:", error);
    return res.status(500).json({ error: "Server error while fetching doctors." });
  }
};


export const allAppointments = async (req, res) => {
  try {
    const assistant = await Assistant.findOne({ userId: req.user.id });

    if (!assistant) {
      return res.status(404).json({
        success: false,
        message: "Assistant profile not found",
      });
    }

    const doctorId = assistant.doctorId;
    const hospitalId = assistant.hospitalId;

    const appointments = await Appointment.find({
      doctorId,
      hospitalId,
      status: "booked",
    })
      .populate({
        path: "bookedBy",
        select: "name email",
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .sort({ date: -1, timeSlot: 1 });

    return res.status(200).json({
      success: true,
      message: "All appointments fetched successfully.",
      total: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error("Error fetching all appointments:", error);
    return res.status(500).json({
      error: "Server error while fetching all appointments."
    });
  }
};






