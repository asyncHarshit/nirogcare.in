import { MedicalRecord } from "../models/MedicalRecord.js";
import { Doctor } from "../models/Doctor.js";


export const addMedicalRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor profile not found." });
    }

    const {
      patientId,
      appointmentId,
      doctorId,
      hospitalId,
      medicines,
      notes,
    } = req.body;

    if (!patientId || !appointmentId || !doctorId || !hospitalId || !medicines || medicines.length === 0) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    const record = new MedicalRecord({
      patientId,
      appointmentId,
      doctorId,
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

// Get medical history for a patient or family member
export const getMedicalRecords = async (req, res) => {
  try {
    const patientId = req.user.id;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required." });
    }

    const records = await MedicalRecord.find({ patientId })
      .populate({
          path: "doctorId",
          select: "specialization hospitalId userId", 
          populate: [
            {
              path: "hospitalId",
              select: "name", 
            },
            {
              path: "userId",
              select: "name", 
            },
          ],
        })


      .sort({ prescribedAt: -1 });

    res.status(200).json({
      message: "Medical records fetched.",
      total: records.length,
      records,
    });
  } catch (error) {
    console.error("Error fetching medical records:", error);
    res.status(500).json({ error: "Failed to fetch medical records." });
  }
};
