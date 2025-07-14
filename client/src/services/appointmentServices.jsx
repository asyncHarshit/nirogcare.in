import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllApointments(){
    try {
        const response = await axios.get(`${baseUrl}/api/appointment/all-appointments`, {
        withCredentials: true,
      });
      console.log(response)
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all Appointments !!",error)
    }

}