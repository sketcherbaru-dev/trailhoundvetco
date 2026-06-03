import { supabaseAnonClient } from '@shared/supabaseClient';

export async function uploadImage(file: File, bucket: string = 'images'): Promise<string> {
  try {
    if (!file) throw new Error('No file selected');

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;

    // Upload to Supabase Storage
    const { data, error } = await supabaseAnonClient.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabaseAnonClient.storage
      .from(bucket)
      .getPublicUrl(filename);

    if (!publicUrlData?.publicUrl) throw new Error('Failed to get public URL');

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}
