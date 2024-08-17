// pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from '../../lib/jwt';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (token) {
    const decoded = verifyJwt(token);

    if (decoded) {
      return res.status(200).json({ message: 'Authenticated', user: decoded });
    }
  }

  res.status(401).json({ message: 'Not authenticated' });
}
