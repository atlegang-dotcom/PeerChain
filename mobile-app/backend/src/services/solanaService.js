const { PublicKey } = require('@solana/web3.js');
const { connection } = require('../config/solana');

// Check that a wallet address is valid and exists on-chain
async function verifyWallet(walletAddress) {
  try {
    const pubKey = new PublicKey(walletAddress);
    const accountInfo = await connection.getAccountInfo(pubKey);
    return { valid: true, exists: accountInfo !== null };
  } catch (err) {
    return { valid: false, exists: false };
  }
}

// Get SOL balance for a wallet
async function getWalletBalance(walletAddress) {
  const pubKey = new PublicKey(walletAddress);
  const balance = await connection.getBalance(pubKey);
  return balance / 1e9; // Convert lamports to SOL
}

// Confirm a transaction actually landed on-chain
async function confirmTransaction(signature) {
  try {
    const result = await connection.getTransaction(signature, {
      commitment: 'confirmed'
    });
    return result !== null;
  } catch (err) {
    return false;
  }
}

module.exports = { verifyWallet, getWalletBalance, confirmTransaction };