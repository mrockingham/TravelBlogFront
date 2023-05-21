import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from '../config/AxiosConfig';
import { a } from '@chakra-ui/toast/dist/toast.provider-10178888';

export const useUsersStore = create((set, get) => ({
  data: [],

  editMode: false,
  loginUser: async (user: any) => {
    try {
      set({ data: user });
      localStorage.setItem('rexblog-token', user.token);
      console.log('user', user);
    } catch (err: any) {
      console.log('err', err.message);
      set({ error: err.message, isLoading: false });
    }
  },

  getUsers: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get('/users/current', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('rexblog-token')}`,
        },
      });
      set({ isLoading: false, data: await response.data });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  createUser: async (user: any) => {
    // empty array for test purposes
    const data = [];
    try {
      set({ isLoading: true });
      const response = data.push(user);
      //   const updatedData = [...get().data, response.data];
      set((state: { data: any }) => ({
        isLoading: false,
        data: [...state.data, response],
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  isEditMode: async (isEdit: boolean) => {
    try {
      set({ editMode: isEdit });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  error: null,
  isLoading: false,
}));
