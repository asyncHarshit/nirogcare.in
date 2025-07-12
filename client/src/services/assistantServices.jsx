import axios from "axios"

export async function updateAssistantProfile(formData){
    try {
        const response = await axios.post("http://localhost:3000/api/assistant/update-profile",
            {
                doctorId: formData.doctorId,
                hospitalId: formData.hospitalId
            },
            {withCredentials: true});
      return response.data;
        
    } catch (error) {
        console.log("Error in updating assistant profile !!",error)
    }

}


export async function getAssistantProfile() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/assistant/get-profile",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching assistant profile !!", error);
    throw error;
  }
}
