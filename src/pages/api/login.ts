// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { signJwt } from '../../lib/jwt';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Replace this with your actual authentication logic
    if (username === 'user' && password === 'pass') {
      const token = signJwt({ username });

      // Set the JWT in an HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600, // 1 hour
      }));

      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
