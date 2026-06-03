export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!file) throw new Error('No file selected');

      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          // Return base64 data URL
          resolve(result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Image upload error:', error);
      reject(error);
    }
  });
}
