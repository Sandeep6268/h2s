import axios from 'axios';

const API = axios.create({
  baseURL: 'https://h2s-backend-urrt.onrender.com/api/auth/',
  withCredentials: true, // required for cookies/session-based auth
});

export default API;

 export const FindUser = axios.create({
    baseURL: 'https://h2s-backend-urrt.onrender.com/api/',
    withCredentials: true, // required for cookies/session-based auth
  });
  try {
    const response = await FindUser.get(`user/${userId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }