// ─────────────────────────────────────────────────────────────────────────────
// SOLANA SERVICE — thin adapter
// All contract logic now lives in contractService.js
// This file preserves the original function names so no routes break.
// ─────────────────────────────────────────────────────────────────────────────

const contract = require('./contractService');

// Re-export everything from contractService under the original names
// routes import from here — nothing changes in routes/sessions.js etc.

const verifyWallet               = contract.verifyWallet;
const confirmTransaction         = contract.confirmTransaction;

const recordSessionOnChain       = contract.recordSession;
const updateReputationOnChain    = contract.updateReputation;
const getReputationFromChain     = contract.getReputation;
const submitFundingRequestOnChain= contract.submitFundingRequest;
const evaluateFundingEligibility = contract.evaluateFundingEligibility;
const mintAchievementRecord      = contract.mintAchievementRecord;

// Extra helpers now available to routes if needed
const getSessionsForWallet       = contract.getSessionsForWallet;
const getFundingRequestsForWallet= contract.getFundingRequestsForWallet;

module.exports = {
  verifyWallet,
  confirmTransaction,
  recordSessionOnChain,
  updateReputationOnChain,
  getReputationFromChain,
  submitFundingRequestOnChain,
  evaluateFundingEligibility,
  mintAchievementRecord,
  getSessionsForWallet,
  getFundingRequestsForWallet
};
