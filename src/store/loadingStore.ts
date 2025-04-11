import { create } from 'zustand';

interface LoadingStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false, // ✅ default value
  setLoading: (value) => set({ loading: value }),
}));

export default useLoadingStore;
