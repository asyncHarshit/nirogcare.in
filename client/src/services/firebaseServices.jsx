import axios from "axios"

export async function notifyViaFCM(userId){
    try {
        const response = await axios.post(
            "http://localhost:3000/api/firebase/send-notification",
            {
            title: "Appointment Confirmation",
            body: "Your appointment is confirmed! We kindly request you to arrive at the hospital within 30 minutes.",
            userId
            },
            { withCredentials: true }
        );
      return response.data;
        
    } catch (error) {
        console.log("Error in fetching all hospitals !!",error)
    }

}