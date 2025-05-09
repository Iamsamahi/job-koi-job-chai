// pages/api/auth/login.js
import axios from 'axios';
import * as cookie from 'cookie'; // Corrected import

const loginHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/token/`);
      console.log('Login attempt for:', username);
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token/`,
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response status:', response.status);
      
      if (response.data.access) {
        // Set the cookie correctly
        res.setHeader('Set-Cookie', 
          cookie.serialize('access', response.data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 15, // 15 days
            sameSite: 'lax',
            path: '/',
          })
        );

        // Return success response
        return res.status(200).json({
          success: true,
          user: { username },
        });
      } else {
        return res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('LOGIN ERROR:', error.message);
      
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        return res.status(error.response.status).json({
          error: error.response.data.detail || JSON.stringify(error.response.data),
        });
      } else {
        return res.status(500).json({ error: 'Error: ' + error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;