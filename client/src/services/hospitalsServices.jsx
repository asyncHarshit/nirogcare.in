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


export async function registerHospital(formdata){
  try {
    const response = await axios.post(`${baseUrl}/api/hospital/register`, formdata, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering hospital:", error);
    throw error; // Re-throw the error for further handling
  }
}

export async function getHospital(){
  try {
    const response = await axios.get(`${baseUrl}/api/hospital/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital profile:", error);
    throw error; // Re-throw the error for further handling
  }
}


export async function getPatientsByHospital(){
  try {
    const response = await axios.get(`${baseUrl}/api/hospital/stats`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital profile:", error);
    throw error; // Re-throw the error for further handling
  }
}



