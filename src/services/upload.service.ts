import axios from "axios";
import { toast } from "sonner";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadService = {
  uploadImage: async (
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              onProgress?.(percent);
            }
          },
        },
      );

      return res.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed.");
      throw error;
    }
  },
};
