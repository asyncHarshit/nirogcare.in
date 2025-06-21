import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
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
      match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"],
    },

    address: { 
        type: String, required: true
     },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    //   match: [/^[A-Z0-9\-]{8,20}$/, "Invalid license number format"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Hospital", hospitalSchema);
