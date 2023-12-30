import { create, GetState, SetState } from 'zustand';
import axios from '../config/AxiosConfig';
import {
  uploadFile,
  getFileId,
  savePhotoUrl,
  getAllPhotos,
  getPhoto,
  deletePhoto,
  updatePhoto,
} from '../config/api';

type ImageData = {
  $collectionId: string;
  name: string;
  url: string;
  description: string;
};

export const useImageStore = create(set => ({
  imageData: [],
  getImages: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllPhotos();
      set({ isLoading: false, imageData: response });
      return response;
    } catch (err: any) {
      set({ imageError: err.message, isLoading: false });
    }
  },
  getImage: async (id: string) => {
    try {
      set({ isLoading: true });
      const response = await getPhoto(id);
      set({ isLoading: false, imageData: response });
      return response;
    } catch (err: any) {
      set({ imageError: err.message, isLoading: false });
    }
  },
  getFilePreview: async (id: string) => {
    try {
      const response = await getFileId(id);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  updateDescription: async (id: string, description: string) => {
    try {
      const response = await updatePhoto(id, description);

      set({ imageData: response });
      return response;
    } catch (err: any) {
      set({ imageError: err.message });
    }
  },
  deleteFile: async (id: string) => {
    try {
      await deletePhoto(id);
      set({ imageData: [] });
    } catch (err: any) {
      set({ imageError: err.message, isLoading: false });
    }
  },
  addFile: async (file: File) => {
    try {
      const response = await uploadFile(file);

      set({ imageData: response });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  saveUrl: async (url: any) => {
    try {
      console.log('the url', url);
      const response = await savePhotoUrl(url);

      return response;
    } catch (err) {
      console.log(err);
    }
  },
  imageError: null,
  isLoading: false,
}));
