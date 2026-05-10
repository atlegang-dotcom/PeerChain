const express = require('express');
const router = express.Router();
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const jwt = require('jsonwebtoken');
const { PublicKey } = require('@solana/web3.js');

// Temporary nonce store — replace with Supabase in production
const nonces = new Map();

// Step 1: Request a nonce to sign
router.post('/nonce', (req, res) => {
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(400).json({ error: 'Wallet address required' });
  }

  const nonce = `Sign this to login to StudyStream: ${Date.now()}`;
  nonces.set(walletAddress, nonce);

  res.json({ nonce });
});

// Step 2: Verify the signed nonce and issue JWT
router.post('/verify', (req, res) => {
  const { walletAddress, signature } = req.body;

  const nonce = nonces.get(walletAddress);
  if (!nonce) {
    return res.status(400).json({ error: 'No nonce found. Request one first.' });
  }

  try {
    const messageBytes = new TextEncoder().encode(nonce);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = new PublicKey(walletAddress).toBytes();

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    nonces.delete(walletAddress);

    const token = jwt.sign(
      { walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, walletAddress });
  } catch (err) {
    res.status(400).json({ error: 'Verification failed', details: err.message });
  }
});

module.exports = router;
