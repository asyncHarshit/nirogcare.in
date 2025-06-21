import mongoose from "mongoose";

const medicineRecordSchema = new mongoose.Schema(
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
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    medicines: [
      {
        name: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
        },
        notes: {
          type: String,
        },
      },
    ],

    prescribedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicineRecord", medicineRecordSchema);
