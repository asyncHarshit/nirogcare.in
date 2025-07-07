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