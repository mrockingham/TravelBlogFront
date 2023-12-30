import { create } from 'zustand';
import axios from '../config/AxiosConfig';
import {
  getHeroBox,
  getHeroBoxBody,
  getMiddleContentBox,
  getMiddlecontentBodyBox,
  getStyles,
  updateHeroBoxBodyDB,
  updateHeroBoxDB,
  updateMiddleContentBoxBodyDB,
  updateMiddleContentBoxDB,
  updateStylesDB,
} from '../config/stylesApi';

export const useEditStylesStore = create((set, get) => ({
  mainStyleData: [],
  heroBoxData: [],
  heroBoxBodyData: [],
  middleContentBoxData: [],
  middleContentBoxBodyData: [],

  getMainStyles: async () => {
    try {
      set({ isLoading: true });
      const response = await getStyles();

      set({ isLoading: false, styleData: await response?.documents[0] });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateMainStyles: async (id: string, data: any) => {
    try {
      set({ isLoading: true });
      const response = await updateStylesDB(id, data);
      set({ isLoading: false, styleData: await response });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  getHeroBoxStyles: async () => {
    try {
      set({ isLoading: true });
      const response = await getHeroBox();

      set({ isLoading: false, heroBoxData: await response?.documents[0] });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateHeroBoxStyles: async (id: string, data: any) => {
    // console.log('updatehero info id', id);
    // console.log('updatehero info data', data);

    try {
      set({ isLoading: true });
      const response = await updateHeroBoxDB(id);
      set({ isLoading: false, heroBoxData: await response });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getHeroBoxBodyStyles: async () => {
    try {
      set({ isLoading: true });
      const response = await getHeroBoxBody();

      set({ isLoading: false, heroBoxBodyData: await response?.documents[0] });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateHeroBoxBodyStyles: async (id: string, data: any) => {
    try {
      set({ isLoading: true });
      const response = await updateHeroBoxBodyDB(id);
      set({ isLoading: false, heroBoxBodyData: await response });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getMiddleContentBoxStyles: async () => {
    try {
      set({ isLoading: true });
      const response = await getMiddleContentBox();

      set({
        isLoading: false,
        middleContentBoxData: await response?.documents[0],
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateMiddleContentBoxStyles: async (id: string, data: any) => {
    console.log('updatehero info id', id);
    console.log('updatehero info data', data);

    try {
      set({ isLoading: true });
      const response = await updateMiddleContentBoxDB(id);
      set({ isLoading: false, middleContentBoxData: await response });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  getMiddleContentBoxBodyStyles: async () => {
    try {
      set({ isLoading: true });
      const response = await getMiddlecontentBodyBox();

      set({
        isLoading: false,
        middleContentBoxBodyData: await response?.documents[0],
      });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  updateMiddleContentBoxBodyStyles: async (id: string, data: any) => {
    console.log('updatehero body info id', id);
    console.log('updatehero body info data', data);

    try {
      set({ isLoading: true });
      const response = await updateMiddleContentBoxBodyDB(id);
      set({ isLoading: false, middleContentBoxBodyData: await response });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  stylesError: null,
  isLoading: false,
}));
