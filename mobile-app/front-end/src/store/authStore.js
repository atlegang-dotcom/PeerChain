import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  walletAddress: null,
  authToken: null,
  jwt: null,
  isConnected: false,

  setSession: (walletAddress, authToken, jwt) => {
    AsyncStorage.setItem('walletAddress', walletAddress);
    AsyncStorage.setItem('authToken', authToken);
    AsyncStorage.setItem('jwt', jwt);
    set({ walletAddress, authToken, jwt, isConnected: true });
  },

  clearSession: () => {
    AsyncStorage.removeItem('walletAddress');
    AsyncStorage.removeItem('authToken');
    AsyncStorage.removeItem('jwt');
    set({ walletAddress: null, authToken: null, jwt: null, isConnected: false });
  },

  restoreSession: async () => {
    const walletAddress = await AsyncStorage.getItem('walletAddress');
    const authToken = await AsyncStorage.getItem('authToken');
    const jwt = await AsyncStorage.getItem('jwt');
    if (walletAddress && authToken && jwt) {
      set({ walletAddress, authToken, jwt, isConnected: true });
    }
  }
}));