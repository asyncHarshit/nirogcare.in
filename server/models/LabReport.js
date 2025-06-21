import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "forPatientType",
    },
    forPatientType: {
      type: String,
      enum: ["Patient", "FamilyMember"],
      required: true,
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },

    testName: {
      type: String,
      required: true,
    },
    testType: {
      type: String,
      enum: ["Blood", "X-Ray", "MRI", "CT", "Urine", "Other"],
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    normalRange: {
      type: String,
    },
    unit: {
      type: String,
    },

    diagnosis: {
      type: String,
    },
    doctorReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LabReport", labReportSchema);
