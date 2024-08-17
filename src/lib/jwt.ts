// lib/jwt.ts
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key'; // Use an environment variable for production

export const signJwt = (payload: object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, secret, {
    expiresIn: '1h',
    ...options,
  });
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
