import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.substring(7);
    const { data, error } = await supabaseServiceClient.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email || '',
    };

    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication error' });
  }
};
