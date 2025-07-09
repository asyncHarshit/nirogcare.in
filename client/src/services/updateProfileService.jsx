import axios from "axios";

export async function updatePatient(formData) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/patient/profile",
      formData,
      {
        withCredentials: true,
       
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in updating patient profile!!", error);
  }
}
