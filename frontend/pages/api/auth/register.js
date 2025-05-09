import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Forward the registration data to your Django backend
      const response = await axios.post('http://localhost:8000/api/register/', req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Adjust the response to match what AuthContext expects (e.g., { success: true })
      return res.status(response.status).json({
        success: true,
        message: response.data.message || 'Registration successful',
      });
    } catch (error) {
      // Handle errors (e.g., from Django backend)
      return res.status(error.response?.status || 500).json({
        error: error.response?.data?.message || 'Something went wrong during registration',
      });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ message: 'Method not allowed' });
  }
}