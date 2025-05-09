import cookie from 'cookie';
import axios from 'axios';

const checkAuthHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Check if access token exists in cookies
      const cookies = cookie.parse(req.headers.cookie || '');
      const access = cookies.access || '';

      if (!access) {
        return res.status(200).json({ isAuthenticated: false, user: null });
      }

      // Verify token with backend (optional)
      // If you have a token verification endpoint, use it here
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });

        // If the request succeeds, the token is valid
        return res.status(200).json({ 
          isAuthenticated: true, 
          user: response.data // The user info from your backend
        });
      } catch (error) {
        // If token verification fails, return not authenticated
        return res.status(200).json({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      return res.status(200).json({ isAuthenticated: false, user: null });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default checkAuthHandler;