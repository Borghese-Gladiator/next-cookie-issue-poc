// /pages/api/async-handler.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { signJwt } from '../../lib/jwt';
import { serialize } from 'cookie';

/*
Simulate if calling back from external API like Google OAuth2.0
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from JSONPlaceholder
    const callback_user_data = await fetchDataFromJsonPlaceholder();
    res.setHeader('Set-Cookie', serialize('callback_user_data', JSON.stringify(callback_user_data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600, // 1 hour
    }));

    // Send a successful response with the fetched data
    res.status(200).json({ success: true, data: callback_user_data });
  } catch (error) {
    // Handle any errors that occur during the asynchronous operation
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// Fetch data from JSONPlaceholder API
async function fetchDataFromJsonPlaceholder() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  if (!response.ok) {
    throw new Error('Failed to fetch data from JSONPlaceholder');
  }
  return response.json();
}
