import { create } from 'zustand';
import axios from '../config/AxiosConfig';

export const useEditStylesStore = create((set, get) => ({
  styleData: [],
  getStyles: async () => {
    try {
      console.log('is this called');
      set({ isLoading: true });
      const response = await axios.get('/editstyle');

      set({ isLoading: false, styleData: await response.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  //   createStyle: async (style: any) => {
  //     try {
  //       set({ isLoading: true });
  //       const response = await axios.post('/styles', style, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('rexblog-token')}`,
  //         },
  //       });
  //       set({ isLoading: false, styleData: await response.data });
  //     } catch (err: any) {
  //       set({ error: err.message, isLoading: false });
  //     }
  //   },
  updateStyles: async (style: any) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`/editstyle`, style, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('rexblog-token')}`,
        },
      });
      set({ isLoading: false, styleData: await response.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  // deleteStyle: async (style: any) => {
  //     try {
  //         set({isLoading: true});
  //         const response = await axios.delete(`/styles/${style._id}`, {
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem('rexblog-token')}`,
  //             },
  //         });
  //         set({isLoading: false, styleData: await response.styleData});
  //     } catch (err: any) {
  //         set({error: err.message, isLoading: false});
  //     }
  // },
  stylesError: null,
  isLoading: false,
}));
