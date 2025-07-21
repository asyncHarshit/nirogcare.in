import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export async function updateLab(formData) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/lab/profile`,
      formData,
      {
        withCredentials: true,
       
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in updating Lab profile!!", error);
  }
}