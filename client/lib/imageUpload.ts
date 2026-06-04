export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!file) throw new Error('No file selected');

      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const result = event.target?.result;
          if (typeof result !== 'string') {
            reject(new Error('Failed to read file'));
            return;
          }

          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ file: result }),
          });

          if (!response.ok) {
            const error = await response.json();
            reject(new Error(error.error || 'Upload failed'));
            return;
          }

          const data = await response.json();
          resolve(data.url);
        } catch (error) {
          reject(error);
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
