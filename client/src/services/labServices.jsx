import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllLabAppointmentbyLab(labId) {
  try {
    const response = await axios.get(`${baseUrl}/api/labAppointment/getAllLabAppointments?labId=${labId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all doctors !!", error);
  }
}