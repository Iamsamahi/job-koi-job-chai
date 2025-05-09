import axios from 'axios';
import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');
    const access = cookies.access;

    if (!access) {
      return res.status(401).json({ error: 'Login first to load user.' });
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/myself/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      console.log('Load user response:', response.data);

      if (response.data) {
        return res.status(200).json({ user: response.data });
      } else {
        return res.status(404).json({ error: 'User data not found' });
      }
    } catch (error) {
      console.error('Load user error:', {
        message: error.message,
        data: error.response?.data,
        status: error.response?.status,
      });

      const status = error.response?.status || 500;
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        'Failed to load user';

      return res.status(status).json({ error: message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
