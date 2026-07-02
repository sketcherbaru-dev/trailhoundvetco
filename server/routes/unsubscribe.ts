import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase.js';

export const unsubscribe: RequestHandler = async (req, res) => {
  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'A valid email address is required' });
    return;
  }

  try {
    const { error } = await supabaseAnonClient
      .from('subscribers')
      .delete()
      .eq('email', email.toLowerCase().trim());

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'You have been unsubscribed successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to unsubscribe' });
  }
};
