// pages/api/auth/logout.js
import * as cookie from 'cookie'; // Corrected import

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the access cookie
    res.setHeader('Set-Cookie', 
      cookie.serialize('access', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'lax',
        path: '/',
      })
    );

    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}