import axiosInstance from '@/lib/client/axiosInstance';
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
  getUser: () => Promise<void>;
  loginUser: (credentials: { email: string; password: string }) => Promise<any>;
  logoutUser: () => Promise<any>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loadingUser: false,

  getUser: async () => {
    set({ loadingUser: true });
    try {
      const response = await axiosInstance.get('/api/c/user/profile');
      set({ user: response.data.user, loadingUser: false });
    } catch (err) {
      set({ user: null, loadingUser: false });
    }
  },

  loginUser: async (credentials) => {
    const res = await axiosInstance.post('api/c/auth/login', credentials);
    return res;
  },

  logoutUser: async () => {
    const res = await axiosInstance.post('/api/c/logout');
    set({ user: null });
    return res;
  },
}));

export default useUserStore;
