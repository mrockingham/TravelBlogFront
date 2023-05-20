import { create } from 'zustand';
import axios from '../config/AxiosConfig';

export const useImageStore = create((set, get) => ({
  imageData: [],
  getImages: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get('/images');
      set({ isLoading: false, imageData: await response.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getImage: async (id: any) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`/images/${id}`);
      set({ isLoading: false, imageData: await response.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  imageError: null,
  isLoading: false,
}));
