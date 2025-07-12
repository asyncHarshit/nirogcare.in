import axios from "axios"

export async function getAllApointments(){
    try {
        const response = await axios.get("http://localhost:3000/api/doctor/all-Appointments", {
        withCredentials: true,
      });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all hospitals !!",error)
    }

}