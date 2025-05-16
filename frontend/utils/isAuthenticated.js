// utils/isAuthenticated.js
import axios from "axios";

export const isAuthenticatedUser = async (access) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/token/verify/`, {
      token: access // Fix: Use 'access' instead of 'access_token'
    });

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    console.error('Token verification error:', error.response?.status, error.response?.data);
    return false;
  }
};