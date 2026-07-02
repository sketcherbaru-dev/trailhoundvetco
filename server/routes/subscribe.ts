import { RequestHandler } from 'express';
import { supabaseAnonClient } from '../lib/supabase';

export const subscribe: RequestHandler = async (req, res) => {
  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ error: 'A valid email address is required' });
    return;
  }

  try {
    const { error } = await supabaseAnonClient
      .from('subscribers')
      .insert([{ email: email.toLowerCase().trim() }]);

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ already_subscribed: true, message: "You're already subscribed." });
        return;
      }
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ message: 'Successfully subscribed! Welcome to the pack.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};
