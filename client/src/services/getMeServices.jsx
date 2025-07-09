import axios from "axios"

export async function getMe(){
    try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all hospitals !!",error)
    }

}