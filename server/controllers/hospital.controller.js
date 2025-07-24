import { Hospital } from "../models/Hospital.js";
import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { Appointment } from "../models/Appointment.js";

// Register a hospital
export const registerHospital = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, licenseNumber, longitude , latitude } = req.body;

    if (!name || !phone || !address || !licenseNumber || !longitude || !latitude) {
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
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });

    await hospital.save();

    res.status(201).json({ message: "Hospital registered successfully.", hospital, success: true });
  } catch (error) {
    console.error("Error registering hospital:", error);
    res.status(500).json({ error: "Failed to register hospital." });
  }
};

// Get hospital profile for logged-in admin
// Get hospital profile for logged-in admin
export const getMyHospitalProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const hospital = await Hospital.findOne({ userId }).populate({
      path: "userId",
      select: "name email" 
    });

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

    // Populate patientId and its userId (with name & phone)
    const appointments = await Appointment.find({ doctorId: { $in: doctorIds } })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name phone", // Selecting only required fields
        },
      });

    const doctorPatientsMap = {};

    for (const doctor of doctors) {
      doctorPatientsMap[doctor._id.toString()] = {
        doctorId: doctor._id,
        doctorName: doctor.name,
        specialization: doctor.specialization,
        patients: [],
      };
    }

    for (const appointment of appointments) {
      const doctorId = appointment.doctorId.toString();
      const patient = appointment.patientId;

      if (patient && patient.userId && doctorPatientsMap[doctorId]) {
        const patientUser = patient.userId;

        // Avoid duplicate patients
        const alreadyAdded = doctorPatientsMap[doctorId].patients.some(
          (p) => p._id.toString() === patient._id.toString()
        );

        if (!alreadyAdded) {
          doctorPatientsMap[doctorId].patients.push({
            _id: patient._id,                   // Patient ID
            userId: patientUser._id,            // User ID of the patient
            name: patientUser.name,
            phone: patientUser.phone,
            age: patient.age,
            gender: patient.gender,
            address: patient.address,
          });
        }
      }
    }

    const doctorsWithPatients = Object.values(doctorPatientsMap);

    res.status(200).json({
      totalDoctors: doctorsWithPatients.length,
      doctors: doctorsWithPatients,
    });
  } catch (error) {
    console.error("Error fetching doctor-patient data:", error);
    res.status(500).json({ error: "Failed to fetch doctor-wise patient stats." });
  }
};









