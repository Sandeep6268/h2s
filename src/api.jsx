import axios from 'axios';

// Base API instance for auth
const API = axios.create({
  baseURL: 'https://h2s-backend-urrt.onrender.com/api/auth/',
  withCredentials: true,
});

// Base API instance for user data
export const FindUser = axios.create({
  baseURL: 'https://h2s-backend-urrt.onrender.com/api/',
  withCredentials: true,
});

// Function to get user by ID
export const getUserById = async (userId) => {
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
};

export default API;