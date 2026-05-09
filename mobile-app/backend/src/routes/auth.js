const express = require('express');
const router = express.Router();
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const jwt = require('jsonwebtoken');
const { PublicKey } = require('@solana/web3.js');
const db = require('../config/database');

const nonces = new Map();
const JWT_SECRET = process.env.JWT_SECRET || 'peerchain-dev-secret-change-in-production';

async function getNonce(walletAddress) {
  const result = await db.query('SELECT nonce FROM nonces WHERE wallet_address = $1', [walletAddress]);
  if (result && result.rows.length > 0) return result.rows[0].nonce;
  return nonces.get(walletAddress);
}

async function setNonce(walletAddress, nonce) {
  const result = await db.query(
    'INSERT INTO nonces (wallet_address, nonce) VALUES ($1, $2) ON CONFLICT (wallet_address) DO UPDATE SET nonce = $2, created_at = NOW()',
    [walletAddress, nonce]
  );
  if (!result) nonces.set(walletAddress, nonce);
}

async function deleteNonce(walletAddress) {
  await db.query('DELETE FROM nonces WHERE wallet_address = $1', [walletAddress]);
  nonces.delete(walletAddress);
}

async function upsertUser(walletAddress) {
  const result = await db.query(
    'INSERT INTO users (wallet_address, last_login) VALUES ($1, NOW()) ON CONFLICT (wallet_address) DO UPDATE SET last_login = NOW()',
    [walletAddress]
  );
  if (!result) {
    console.log('User login (in-memory mode):', walletAddress);
  }
}

router.post('/nonce', (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address required' });
  }

  const nonce = `Sign this to login to PeerChain: ${Date.now()}`;
  setNonce(walletAddress, nonce);
  res.json({ nonce });
});

router.post('/verify', async (req, res) => {
  const { walletAddress, signature } = req.body;
  const nonce = await getNonce(walletAddress);

  if (!nonce) {
    return res.status(400).json({ error: 'No nonce found. Request one first.' });
  }

  try {
    const messageBytes = new TextEncoder().encode(nonce);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = new PublicKey(walletAddress).toBytes();

    const isValid = nacl.sign.detached.verify(
      messageBytes, signatureBytes, publicKeyBytes
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    await deleteNonce(walletAddress);
    await upsertUser(walletAddress);

    const token = jwt.sign({ walletAddress }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, walletAddress });

  } catch (err) {
    res.status(400).json({ error: 'Verification failed', details: err.message });
  }
});

module.exports = router;
