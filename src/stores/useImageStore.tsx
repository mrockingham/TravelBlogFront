import { create, GetState, SetState } from 'zustand';
import axios from '../config/AxiosConfig';

type ImageData = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

type ImageStore = {
  imageData: ImageData[];
  getImages: () => Promise<void>;
  getImage: (id: string) => Promise<void>;
  addImageDescription: (id: string, description: string) => Promise<void>;
  imageError: string | null;
  isLoading: boolean;
};

export const useImageStore = create<ImageStore>(
  (set: SetState<ImageStore>, get: GetState<ImageStore>) => ({
    imageData: [],
    getImages: async () => {
      try {
        set({ isLoading: true });
        const response = await axios.get('/images');
        set({ isLoading: false, imageData: response.data as ImageData[] });
      } catch (err: any) {
        set({ imageError: err.message, isLoading: false });
      }
    },
    getImage: async (id: string) => {
      try {
        set({ isLoading: true });
        const response = await axios.get(`/images/${id}`);
        set({ isLoading: false, imageData: [response.data] as ImageData[] });
      } catch (err: any) {
        set({ imageError: err.message, isLoading: false });
      }
    },
    addImageDescription: async (id: string, description: string) => {
      try {
        const response = await axios.patch(`/images/${id}/description`, {
          description,
        });
        const updatedImage = response.data;
        const { imageData } = get();
        const updatedImageData = imageData.map((image: ImageData) => {
          if (image._id === updatedImage._id) {
            return { ...image, description: updatedImage.description };
          }
          return image;
        });
        set({ imageData: updatedImageData });
      } catch (err: any) {
        set({ imageError: err.message });
      }
    },
    imageError: null,
    isLoading: false,
  })
);
