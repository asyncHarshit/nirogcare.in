import axios from "axios";


export async function logoutUser(){
    try {
        const response = await axios.post("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      return response.data;
        
    } catch (error) {
        console.log("Error in logout !!",error)
    }

}