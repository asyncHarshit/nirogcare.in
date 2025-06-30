import { Hospital } from "../models/Hospital.js";



export const hospitalProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      phone,
      address,
      licenseNumber,
      coordinates,
    } = req.body;

    if (!name || !phone || !address || !licenseNumber || !coordinates || coordinates.length !== 2) {
      return res.status(400).json({ error: "All fields are required including coordinates [lng, lat]" });
    }

    let hospital = await Hospital.findOne({ userId });

    if (hospital) {
      // Update existing profile
      hospital.name = name;
      hospital.phone = phone;
      hospital.address = address;
      hospital.licenseNumber = licenseNumber;
      hospital.location = {
        type: "Point",
        coordinates,
      };
    } else {
      // Create new profile
      hospital = new Hospital({
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
    }

    await hospital.save();

    res.status(200).json({
      message: "Hospital profile saved successfully.",
      hospital,
    });
  } catch (error) {
    console.error("Error saving hospital profile:", error);
    res.status(500).json({ error: "Failed to save hospital profile." });
  }
};








