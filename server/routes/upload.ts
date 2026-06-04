import { RequestHandler } from 'express';
import { supabaseServiceClient } from '../lib/supabase';
import { randomBytes } from 'crypto';

export const uploadImage: RequestHandler = async (req, res) => {
  try {
    const { file, bucket = 'images' } = req.body;

    if (!file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }

    const base64Data = file.split(',')[1] || file;
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `${randomBytes(8).toString('hex')}.jpg`;

    const { data, error } = await supabaseServiceClient.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
      });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const { data: publicData } = supabaseServiceClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    res.json({ url: publicData.publicUrl });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Upload failed' });
  }
};
