import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
