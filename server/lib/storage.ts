import { supabaseServiceClient } from './supabase';

export async function uploadImage(
  file: Buffer,
  filename: string,
  bucket: string = 'images'
): Promise<string> {
  try {
    const { data, error } = await supabaseServiceClient.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicData } = supabaseServiceClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  } catch (error) {
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteImage(filepath: string, bucket: string = 'images'): Promise<void> {
  try {
    const { error } = await supabaseServiceClient.storage
      .from(bucket)
      .remove([filepath]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
    // Don't throw - continue even if delete fails
  }
}
