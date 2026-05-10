const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getReputation } = require('../services/reputationService');

// Get your own reputation
router.get('/me', auth, (req, res) => {
  const rep = getReputation(req.walletAddress);
  res.json(rep);
});

// Get any wallet's reputation (public)
router.get('/:walletAddress', (req, res) => {
  const rep = getReputation(req.params.walletAddress);
  res.json(rep);
});

module.exports = router;
