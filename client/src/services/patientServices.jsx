import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllNearbyHospitals() {
  try {
    const response = await axios.get(`${baseUrl}/api/patient/near-hospitals`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all Nearby hospitals !!", error);
  }
}

export async function getAllNearbyLabs() {
  try {
    const response = await axios.get(`${baseUrl}/api/patient/near-labs`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching all Nearby labs !!", error);
  }
}


export async function createAppointment(appointmentData) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/patient/book-appointment`,
      appointmentData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in creating appointment !!", error);
  }
}


export async function getMyAppointment() {
  try {
    const response = await axios.get(`${baseUrl}/api/patient/appointments`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching my appointments !!", error);
  }
}


export async function createAppointmentLab(appointmentData) {
  try {
    const response = await axios.post(
      `${baseUrl}/api/lab/book-appointment`,
      appointmentData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in creating lab appointment !!", error);
  }
}


export async function getMyLabAppointment() {
  try {
    const response = await axios.get(`${baseUrl}/api/lab/appointments`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error in fetching lab appointments !!", error);
  }
}


export async function updateVitalsForUser(formData, userId) {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/patient/update-vitals`,
      { ...formData, userId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in updating vitals for user !!", error);
  }
}

export async function getVitalsForUser() {
  try {
    const response = await axios.get(
      `${baseUrl}/api/patient/vitals`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in fetching vitals for user !!", error);
  }
}






