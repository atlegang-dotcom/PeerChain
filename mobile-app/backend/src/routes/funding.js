const express = require('express');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth    = require('../middleware/authMiddleware');
const { getReputation }   = require('../services/reputationService');
const {
  submitFundingRequestOnChain,
  evaluateFundingEligibility,
  getFundingRequestsForWallet
} = require('../services/solanaService');
const { MOCK_MODE } = require('../services/contractService');

// Valid purposes as defined in the whitepaper
const VALID_PURPOSES = ['connectivity', 'transport', 'tools'];

// In-memory store for new requests created this run
const fundingStore = [];

// GET /funding — return all funding requests for the authenticated wallet
router.get('/', auth, async (req, res) => {
  try {
    const chainRequests = await getFundingRequestsForWallet(req.walletAddress);
    const storeRequests = fundingStore.filter(r => r.walletAddress === req.walletAddress);

    const storeIds = new Set(storeRequests.map(r => r.id));
    const merged   = [
      ...storeRequests,
      ...chainRequests.filter(r => !storeIds.has(r.id))
    ];

    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch funding requests', details: err.message });
  }
});

// POST /funding/request — submit a new funding request
// req.body: { amount, purpose, description }
// amount:      number (SOL)
// purpose:     'connectivity' | 'transport' | 'tools'
// description: string (optional)
router.post('/request', auth, async (req, res) => {
  const { amount, purpose, description } = req.body;

  // Validate purpose
  if (!purpose || !VALID_PURPOSES.includes(purpose)) {
    return res.status(400).json({
      error:         'Invalid purpose',
      validPurposes: VALID_PURPOSES
    });
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  // Server-side reputation check — never trust client values
  const reputation  = getReputation(req.walletAddress);

  // Contract (or mock) evaluates eligibility based on on-chain reputation
  const eligibility = await evaluateFundingEligibility(
    req.walletAddress,
    reputation.score
  );

  if (!eligibility.eligible) {
    return res.status(403).json({
      error:        'Funding request rejected',
      reason:       eligibility.reason,
      currentScore: reputation.score,
      mockMode:     MOCK_MODE
    });
  }

  // Submit to chain (or mock)
  const onChainResult = await submitFundingRequestOnChain(req.walletAddress, {
    amount:          parseFloat(amount),
    purpose,
    reputationScore: reputation.score
  });

  const request = {
    id:               uuidv4(),
    walletAddress:    req.walletAddress,
    amount:           parseFloat(amount),
    purpose,
    description:      description || null,
    reputationAtTime: reputation.score,
    onChainRequestId: onChainResult.requestId,
    status:           'pending',
    createdAt:        new Date().toISOString(),
    mockMode:         MOCK_MODE
  };

  fundingStore.push(request);
  res.json({ message: 'Funding request submitted', request });
});

module.exports = router;
