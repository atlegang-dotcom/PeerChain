import { useState } from 'react';
import { connectWallet, signMessage, disconnectWallet } from '../services/walletService';
import { requestNonce, verifySignature } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export function useWallet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSession, clearSession } = useAuthStore();

  async function connect() {
    setLoading(true);
    setError(null);
    try {
      const { walletAddress, authToken } = await connectWallet();
      // Placeholder backend logic bypass for UI testing if backend is down:
      // const nonce = await requestNonce(walletAddress);
      // const signature = await signMessage(nonce, authToken);
      // const jwt = await verifySignature(walletAddress, signature);
      // setSession(walletAddress, authToken, jwt);
      
      // Temporary simulated session assignment for testing (replace with above block when backend is ready)
      setSession(walletAddress, authToken, 'mock_jwt_token_for_testing');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function disconnect() {
    const { authToken } = useAuthStore.getState();
    if(authToken) await disconnectWallet(authToken);
    clearSession();
  }

  return { connect, disconnect, loading, error };
}
