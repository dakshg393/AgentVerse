import axiosInstance from '@/lib/client/axiosInstance';
import axios from 'axios';
import { create } from 'zustand';

interface User {
  _id: string;
  fullName: string;
  email: string;
  // Add any other fields you use
}

interface UserStore {
  user: User | null;
  loadingUser: boolean;
  setUser: (user: User) => Promise<void>;
  getUser: () => Promise<User | null>; // <-- fix here
  loginUser: (credentials: { email: string; password: string }) => Promise<any>;
  logoutUser: () => Promise<any>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loadingUser: false,

  setUser: async (user:User) => {
    set({ user: user });
  },

  getUser: async () => {
    set({ loadingUser: true });
    try {
      const response = await axios.get('/api/c/user/profile', { withCredentials: true });
      // console.log(`This is response ${JSON.stringify(response.data.data)}`);
      // set({ user: response.data.data, loadingUser: false });
      return response.data.data;
    } catch (err) {
      console.log(`here this is error ${err}`);
      set({ user: null, loadingUser: false });
      return null
    }
  },

  loginUser: async (credentials) => {
    const res = await axios.post('api/c/auth/login', credentials);
    return res;
  },

  logoutUser: async () => {
    const res = await axios.get('/api/c/user/logout', { withCredentials: true });
    set({ user: null });
    return res;
  },
}));

export default useUserStore;
