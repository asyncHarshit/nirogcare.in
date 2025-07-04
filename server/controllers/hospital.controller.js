import { Hospital } from "../models/Hospital.js";
import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";

// Register a hospital
export const registerHospital = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, licenseNumber, coordinates } = req.body;

    if (!name || !phone || !address || !licenseNumber || !coordinates) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const existingHospital = await Hospital.findOne({ userId });
    if (existingHospital) {
      return res.status(400).json({ error: "Hospital already registered." });
    }

    const hospital = new Hospital({
      userId,
      name,
      phone,
      address,
      licenseNumber,
      location: {
        type: "Point",
        coordinates,
      },
    });

    await hospital.save();

    res.status(201).json({ message: "Hospital registered successfully.", hospital });
  } catch (error) {
    console.error("Error registering hospital:", error);
    res.status(500).json({ error: "Failed to register hospital." });
  }
};

// Get hospital profile for logged-in admin
export const getMyHospitalProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const hospital = await Hospital.findOne({ userId });
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    res.status(200).json({ hospital });
  } catch (error) {
    console.error("Error fetching hospital profile:", error);
    res.status(500).json({ error: "Failed to fetch hospital profile." });
  }
};

// Get total patients and patient counts by doctor department
export const getPatientStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const hospital = await Hospital.findOne({ userId });

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found." });
    }

    // Get all doctors in this hospital
    const doctors = await Doctor.find({ hospitalId: hospital._id });

    const doctorIds = doctors.map((doc) => doc._id);

    // Get all appointments linked to doctors in this hospital
    const appointments = await Appointment.find({ doctorId: { $in: doctorIds } }).populate("patientId");

    const patientIdSet = new Set();
    const departmentCount = {};

    for (const appointment of appointments) {
      const { patientId, doctorId } = appointment;

      if (patientId) {
        patientIdSet.add(patientId.toString());
      }

      const doctor = doctors.find((d) => d._id.toString() === doctorId.toString());
      if (doctor && doctor.specialization) {
        departmentCount[doctor.specialization] = (departmentCount[doctor.specialization] || 0) + 1;
      }
    }

    res.status(200).json({
      totalUniquePatients: patientIdSet.size,
      patientCountByDepartment: departmentCount,
    });
  } catch (error) {
    console.error("Error fetching hospital patient stats:", error);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
};








