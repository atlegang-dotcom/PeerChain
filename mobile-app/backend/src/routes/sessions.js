const express = require('express');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth    = require('../middleware/authMiddleware');
const {
  recordSessionOnChain,
  confirmTransaction,
  getSessionsForWallet
} = require('../services/solanaService');
const { updateReputation } = require('../services/reputationService');
const { MOCK_MODE }        = require('../services/contractService');

// In-memory store for new sessions created during this server run
// In production: replace with Supabase
const sessionStore = [];

// Helper: merge on-chain/mock sessions with in-memory created sessions
function getSessionsForUser(walletAddress) {
  const fromChain  = getSessionsForWallet ? [] : []; // populated below
  const fromStore  = sessionStore.filter(
    s => s.mentor === walletAddress || s.learners.includes(walletAddress)
  );
  return fromStore;
}

// GET /sessions — return all sessions for the authenticated wallet
router.get('/', auth, async (req, res) => {
  try {
    // Pull from chain (or mock) first, then merge with in-memory store
    const chainSessions = await getSessionsForWallet(req.walletAddress);
    const storeSessions = sessionStore.filter(
      s => s.mentor === req.walletAddress || s.learners.includes(req.walletAddress)
    );

    // Deduplicate by session id (store overrides chain for same id)
    const storeIds = new Set(storeSessions.map(s => s.id));
    const merged   = [
      ...storeSessions,
      ...chainSessions.filter(s => !storeIds.has(s.id))
    ];

    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions', details: err.message });
  }
});

// POST /sessions/create — create a new session (host = mentor)
// req.body: { topic, durationMinutes, skillCategory }
router.post('/create', auth, (req, res) => {
  const { topic, durationMinutes, skillCategory } = req.body;

  if (!topic || !durationMinutes) {
    return res.status(400).json({ error: 'topic and durationMinutes are required' });
  }

  const session = {
    id:             uuidv4(),
    mentor:         req.walletAddress,
    topic,
    skillCategory:  skillCategory || null,
    durationMinutes: parseInt(durationMinutes),
    learners:       [],
    status:         'active',
    createdAt:      new Date().toISOString(),
    completedAt:    null,
    txSignature:    null,
    onChainRecord:  null
  };

  sessionStore.push(session);
  res.json({ message: 'Session created', session });
});

// POST /sessions/join/:sessionId — join as a learner
// req.body: {} (wallet from JWT)
router.post('/join/:sessionId', auth, (req, res) => {
  const session = sessionStore.find(s => s.id === req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.mentor === req.walletAddress) {
    return res.status(400).json({ error: 'You are the mentor of this session' });
  }
  if (!session.learners.includes(req.walletAddress)) {
    session.learners.push(req.walletAddress);
  }
  res.json({ message: 'Joined session as learner', session });
});

// POST /sessions/complete/:sessionId — mark complete + verify on-chain tx + update rep
// req.body: { txSignature, ratings? }
// ratings: { [walletAddress]: 1-5 } — optional peer ratings
router.post('/complete/:sessionId', auth, async (req, res) => {
  const { txSignature, ratings } = req.body;

  const session = sessionStore.find(s => s.id === req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.mentor !== req.walletAddress) {
    return res.status(403).json({ error: 'Only the mentor can complete the session' });
  }
  if (session.status === 'completed') {
    return res.status(400).json({ error: 'Session already completed' });
  }

  // Verify the transaction landed on-chain (mock always passes)
  const confirmed = await confirmTransaction(txSignature);
  if (!confirmed) {
    return res.status(400).json({ error: 'Transaction not confirmed on-chain' });
  }

  // Record session on-chain (or mock)
  const onChainResult = await recordSessionOnChain({
    id:             session.id,
    mentor:         session.mentor,
    learners:       session.learners,
    topic:          session.topic,
    durationMinutes: session.durationMinutes
  });

  session.status        = 'completed';
  session.txSignature   = txSignature;
  session.onChainRecord = onChainResult.onChainRecord;
  session.completedAt   = new Date().toISOString();

  // Update reputation for mentor
  const mentorRep = await updateReputation(session.mentor, {
    role:            'mentor',
    durationMinutes: session.durationMinutes,
    rating:          ratings?.[session.mentor] || null
  });

  // Update reputation for each learner
  const learnerReps = await Promise.all(
    session.learners.map(learner =>
      updateReputation(learner, {
        role:            'learner',
        durationMinutes: session.durationMinutes,
        rating:          ratings?.[learner] || null
      })
    )
  );

  res.json({
    message: 'Session completed and verified',
    session,
    reputationUpdates: { mentor: mentorRep, learners: learnerReps },
    mockMode: MOCK_MODE
  });
});

module.exports = router;
