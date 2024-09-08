type FormatType = "PNG" | "JPG" | "WEBP";

const handleConvert = (file: File, format: FormatType): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context."));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const mimeTypeMap: Record<FormatType, string> = {
        PNG: "image/png",
        JPG: "image/jpeg",
        WEBP: "image/webp",
      };

      const mimeType = mimeTypeMap[format];

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Conversion failed"));
          }
        },
        mimeType,
        0.1 // Quality parameter for JPEG/WEBP formats (0.1 - 1.0)
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for conversion."));
    };
  });
};



export default handleConvert;