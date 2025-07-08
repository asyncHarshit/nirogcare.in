import axios from "axios";

export async function getAllDoctorsbyHospitals(hospitalId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/doctor/getAllDoctors?hospitalId=${hospitalId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all doctors !!", error);
  }
}


