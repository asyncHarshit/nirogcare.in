import { MedicineRecord } from "../models/MedicineRecord.js";
import { Doctor } from "../models/Doctor.js";

//  Add a new medicine record
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

// Get medicine history for a patient or family member
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
