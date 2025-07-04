
import { Hospital } from "../models/Hospital.js";
import { Patient } from "../models/Patient.js";
import {Lab} from "../models/Lab.js"



// Update or create patient profile
export const patientProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { age, gender, address } = req.body;

    if (!age || !gender || !address) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const patient = await Patient.findOne({ userId });

    if (!patient) {
      patient = new Patient({ userId, age, gender, address });
    } else {
      patient.age = age;
      patient.gender = gender;
      patient.address = address;
    }

    await patient.save();

    res.status(200).json({
      message: "Patient profile saved successfully.",
      patient,
    });
  } catch (error) {
    console.error("Error saving patient profile:", error);
    res.status(500).json({ error: "Failed to save patient profile." });
  }
};



// Fetch nearby hospitals within 10km
export const getNearbyHospitals = async (req, res) => {
  try {
    // const { latitude, longitude } = req.query;
    const latitude =  "25.5548739"
    const longitude = "84.6702418"

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const nearbyHospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 10000 // 10 km in meters
        }
      }
    });

    res.status(200).json({ hospitals: nearbyHospitals });
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error);
    res.status(500).json({ error: "Failed to fetch nearby hospitals" });
  }
};


// fetch nearby labs within 10 km


export const getNearbylabs = async (req, res) => {
  try {
    // const { latitude, longitude } = req.query;
    const latitude =  "25.5548739"
    const longitude = "84.6702418"

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const getNearbylabs = await Lab.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 10000 // 10 km in meters
        }
      }
    });

    res.status(200).json({ labs: getNearbylabs });
  } catch (error) {
    console.error("Error fetching nearby labs:", error);
    res.status(500).json({ error: "Failed to fetch nearby labs" });
  }
};




// get lab reports












// apply for appointments













// fetch nearby labs





// can fetch past appointments





// add family members