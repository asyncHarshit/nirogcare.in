import axios from "axios"

export async function getAllNearbyHospitals(){
    try {
        const response = await axios.get("http://localhost:3000/api/patient/near-hospitals", {
        withCredentials: true,
      });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all hospitals !!",error)
    }

}


export async function getAllNearbyLabs(){
    try {
        const response = await axios.get("http://localhost:3000/api/patient/near-labs", {
        withCredentials: true,
      });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all labs !!",error)
    }

}



export async function createAppointment(appointmentData){
    try {
        const response = await axios.post("http://localhost:3000/api/patient/book-appointment",
        appointmentData,
        {
            withCredentials: true,
        });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all labs !!",error)
    }

}


export async function getMyAppointment(){
    try {
        const response = await axios.get("http://localhost:3000/api/patient/appointments",
        {
            withCredentials: true,
        });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all labs !!",error)
    }

}



export async function createAppointmentLab(appointmentData){
    try {
        const response = await axios.post("http://localhost:3000/api/lab/book-appointment",
        appointmentData,
        {
            withCredentials: true,
        });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all labs !!",error)
    }

}













