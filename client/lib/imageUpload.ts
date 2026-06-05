export async function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const MAX_SIDE = 1200;
      let { width, height } = img;

      if (width > MAX_SIDE || height > MAX_SIDE) {
        if (width > height) {
          height = Math.round((height * MAX_SIDE) / width);
          width = MAX_SIDE;
        } else {
          width = Math.round((width * MAX_SIDE) / height);
          height = MAX_SIDE;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }

      ctx.drawImage(img, 0, 0, width, height);

      // Try JPEG first at 0.8 quality; if still too big, reduce further
      let dataUrl = canvas.toDataURL("image/jpeg", 0.8);

      // If larger than ~700KB base64 (~525KB binary), reduce quality
      if (dataUrl.length > 700_000) {
        dataUrl = canvas.toDataURL("image/jpeg", 0.65);
      }
      if (dataUrl.length > 500_000) {
        dataUrl = canvas.toDataURL("image/jpeg", 0.5);
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
