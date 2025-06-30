import axios from "axios";



const baseUrl = import.meta.env.VITE_API_URL;

export async function callAuthRegisterApi(formdata) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/register`,
      formdata,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Auth API Error:", error.response?.data || error.message);
    throw error;
  }
}

export async function callAuthLoginApi(email , password){
   
    try {
      const response = await axios.post(
         `${baseUrl}/api/auth/login`,
        {email,password},
        {withCredentials : true}
      )

      return response.data;
    
    } catch (error) {
      console.error("Login failed:", error)
    }
}

export async function callRoleApi(selectedRole){
  try {
    const response = await axios.patch(`${baseUrl}/api/auth/select-role`,
      {role : selectedRole},
      {withCredentials : true}
    )

    return response.data;
    
  } catch (error) {
    
  }
  
}