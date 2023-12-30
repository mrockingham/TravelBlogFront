import { create } from 'zustand';
import {
  SignInAccount,
  createUserAccount,
  getAccount,
  signOutAccount,
} from '../config/api';

import axios from '../config/AxiosConfig';
import { INewUser } from '../types';

export const useUserStore = create((set, get) => ({
  data: [],

  editMode: false,

  getUsers: async () => {
    try {
      const response = await getAccount();
      console.log('account data response', response);
      set({ isLoading: false, data: await response });
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
  signOutUser: async () => {
    try {
      await signOutAccount();
      set({ data: [] });
    } catch (err) {
      console.log(err);
    }
  },
  error: null,
  isLoading: false,
}));
