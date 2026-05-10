import {
  transact
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';

const APP_IDENTITY = {
  name: 'PeerChain',
  uri: 'https://localhost',
  icon: 'https://localhost/favicon.ico'
};

export async function connectWallet() {
  try {
    const result = await transact(async (wallet) => {
      const authResult = await wallet.authorize({
        cluster: '<SOLANA_CLUSTER>', // 'devnet' or 'mainnet-beta'
        identity: APP_IDENTITY
      });
      return {
        publicKey: authResult.accounts[0].address,
        authToken: authResult.auth_token
      };
    });

    const publicKeyBytes = Buffer.from(result.publicKey, 'base64');
    const walletAddress = new PublicKey(publicKeyBytes).toBase58();

    return { walletAddress, authToken: result.authToken };
  } catch (err) {
    throw new Error('Wallet connection failed: ' + err.message);
  }
}

export async function signMessage(message, authToken) {
  try {
    const result = await transact(async (wallet) => {
      await wallet.reauthorize({
        auth_token: authToken,
        identity: APP_IDENTITY
      });
      const messageBytes = new TextEncoder().encode(message);
      const signResult = await wallet.signMessages({
        addresses: [],
        payloads: [messageBytes]
      });
      return signResult[0];
    });
    return bs58.encode(result);
  } catch (err) {
    throw new Error('Message signing failed: ' + err.message);
  }
}

export async function disconnectWallet(authToken) {
  try {
    await transact(async (wallet) => {
      await wallet.deauthorize({ auth_token: authToken });
    });
  } catch (err) {
    console.log('Disconnect error:', err.message);
  }
}