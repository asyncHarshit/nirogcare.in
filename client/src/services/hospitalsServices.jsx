import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllDoctorsbyHospitals(hospitalId) {
  try {
    const response = await axios.get(`${baseUrl}/api/doctor/getAllDoctors?hospitalId=${hospitalId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all doctors !!", error);
  }
}


