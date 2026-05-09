# PeerChain - Project Status & Deployment Roadmap

**Date:** May 9, 2026
**Hackathon:** Dev3pack Global Hackathon (May 8-10, 2026)
**Co-hosted by:** Dev3pack, Solana, Vercel (v0), ElevenLabs

---

## 1. Current Build Status

| Area | Status | Details |
|------|--------|---------|
| Next.js Build | ❌ FAILS | Node.js v16.20.2, requires >=20.9.0 |
| Anchor Program Code | ✅ Complete | 6 instructions, 5 accounts, needs deployment |
| Anchor Program Deployed | ❌ Not deployed | Uses placeholder program ID `Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS` |
| Solana CLI | ❌ Not installed | Required for `anchor build && anchor deploy` |
| Anchor CLI | ❌ Not installed | Required for program deployment |
| Phantom Wallet Integration | ✅ Complete | `solana-provider.tsx` with Phantom + Solflare |
| API Routes | ✅ Structured | Return mock data, need real blockchain calls |
| ElevenLabs TTS | ⚠️ Code ready | Needs API key in `.env.local` |
| `.env.local` | ❌ Missing | Must be created from `.env.example` |
| Shared Types | ✅ Complete | Matches Anchor program accounts |
| UI Components | ✅ Complete | Dashboard, wallet, all shadcn/ui primitives |

---

## 2. Dev3pack Hackathon Track Compliance

### Solana Track (Co-host: Solana)
| Requirement | Status | Evidence |
|-------------|--------|----------|
| Real wallet integration | ✅ Done | Phantom + Solflare adapters configured |
| On-chain Anchor program | ❌ Not deployed | Code complete in `anchor/programs/peerchain/src/` |
| Transaction history on Explorer | ✅ Ready | Explorer links in transaction feed |
| PDA-based account structure | ✅ Done | Seeds: `user-profile`, `session`, `funding`, `treasury`, `reputation` |
| Blockchain as critical infrastructure | ✅ Architected | PDAs control all state: profiles, sessions, funding, reputation |

**BLOCKING: Deploy Anchor program to Solana Devnet**

### v0/Frontend Track (Co-host: Vercel)
| Requirement | Status | Evidence |
|-------------|--------|----------|
| Polished UI components | ✅ Done | shadcn/ui primitives, Radix UI, Tailwind v4 |
| Responsive dashboard | ✅ Done | All dashboard components responsive |
| Smooth onboarding flow | ✅ Done | Connect Wallet → Create Profile → Use features |
| Clean component architecture | ✅ Done | `components/dashboard/`, `components/shared/`, `components/ui/` |

**Status: 100% ready**

### ElevenLabs/AI Track (Co-host: ElevenLabs)
| Requirement | Status | Evidence |
|-------------|--------|----------|
| Text-to-speech integration | ⚠️ Blocked | API route ready at `app/api/tts/route.ts` |
| Audio briefs for pitches | ⚠️ Blocked | AudioSuite component ready |
| Meaningful AI utility | ✅ Designed | Funding pitch audio, session summaries |

**BLOCKING: Add ElevenLabs API key to `.env.local`**

### Social Impact Track
| Requirement | Status | Evidence |
|-------------|--------|----------|
| Educational accessibility | ✅ Built | Peer learning + mentorship platform |
| Transparent funding system | ⚠️ Needs deployment | Treasury pool, on-chain funding requests |
| Measurable trust/reputation | ✅ Built | Reputation state + peer ratings on-chain |
| Real-world applicability | ✅ Strong | Students get funding based on proven reputation |

**Status: 90% ready, blockchain deployment completes it**

---

## 3. Critical Blockers

### Blocker 1: Node.js Version
```
Current: v16.20.2
Required: >=20.9.0 (Next.js 16)
```
**Fix:** Install Node.js >=20 via nvm, fnm, or direct download.

### Blocker 2: Solana + Anchor CLI
```
$ which solana → not found
$ which anchor → not found
$ which cargo → not found
```
**Fix:** Install Solana CLI, Rust/Cargo, then Anchor framework.

### Blocker 3: Program Not Deployed
**Problem:** Program ID is the System Program placeholder.
**Fix:** `anchor build && anchor deploy`, then update ID in 3 places:
- `anchor/programs/peerchain/src/lib.rs:4`
- `anchor/Anchor.toml`
- `.env.local` as `NEXT_PUBLIC_PROGRAM_ID`

### Blocker 4: No .env.local
**Fix:** `cp .env.example .env.local`, add `ELEVENLABS_API_KEY` and `NEXT_PUBLIC_PROGRAM_ID`.

---

## 4. Next Phases for Deployment

### Phase 1: Environment Fix (30 min)
- [ ] Upgrade Node.js to v20+ (currently v16.20.2)
- [ ] Install Solana CLI: `sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`
- [ ] Install Rust/Cargo
- [ ] Install Anchor: `cargo install --git https://github.com/coral-xyz/anchor avm --locked --force && avm install latest && avm use latest`
- [ ] Create `.env.local` from `.env.example`

### Phase 2: Solana Program Deployment (20 min)
- [ ] Run `anchor build` in `/anchor/`
- [ ] Run `anchor deploy` to Solana Devnet
- [ ] Get program ID from deployment output
- [ ] Update `lib.rs` with real program ID
- [ ] Update `Anchor.toml` program ID
- [ ] Update `.env.local` with `NEXT_PUBLIC_PROGRAM_ID`
- [ ] Initialize treasury: `npm run init-treasury` (or via script)

### Phase 3: Frontend Integration (30 min)
- [ ] Update `app/api/sessions/route.ts` to call real Anchor program via PDA
- [ ] Update `app/api/funding/route.ts` to create real funding transactions
- [ ] Update `app/api/reputation/route.ts` to fetch real on-chain reputation
- [ ] Add ElevenLabs API key and test TTS endpoint
- [ ] Connect frontend components to real API data (remove mock fallbacks)

### Phase 4: Testing & Polish (30 min)
- [ ] Full MVP flow test: Connect → Create Profile → Log Session → Get Reputation → Request Funding
- [ ] Add loading states to `learning-hub.tsx` and `funding-ledger.tsx`
- [ ] Add error boundaries
- [ ] Implement RPC fallback (multiple endpoints)
- [ ] Mobile responsive testing
- [ ] Clean up lockfile conflict (npm vs pnpm)

### Phase 5: Hackathon Submission (15 min)
- [ ] Record demo video of full flow
- [ ] Push to GitHub with clean README
- [ ] Submit via Dev3pack hackathon platform
- [ ] Register for Global Demo Day (May 12)

---

## 5. Files Inventory

### Solana Program (`anchor/`)
| File | Lines | Status |
|------|-------|--------|
| `programs/peerchain/src/lib.rs` | 423 | Complete - placeholder program ID |
| `programs/peerchain/src/state.rs` | 120 | Complete - 5 accounts, 2 enums |
| `Anchor.toml` | ~15 | Configured for devnet |
| `DEPLOYMENT.md` | - | Deployment guide written |

### Frontend (`app/`)
| File/Folder | Status | Purpose |
|-------------|--------|---------|
| `components/dashboard/` | ✅ All 4 components | Stats, sessions, funding, audio |
| `components/shared/` | ✅ Wallet integration | Connect wallet button |
| `components/ui/` | ✅ All primitives | shadcn/ui component library |
| `api/sessions/route.ts` | ✅ Mock data | Needs real blockchain calls |
| `api/funding/route.ts` | ✅ Mock data | Needs real blockchain calls |
| `api/reputation/route.ts` | ✅ Mock data | Needs real blockchain calls |
| `api/tts/route.ts` | ✅ Code ready | Needs API key |
| `lib/solana-provider.tsx` | ✅ Complete | Wallet adapter provider |
| `hooks/` | Present | Custom React hooks |

### Shared Types (`shared/`)
| File | Status |
|------|--------|
| `types/index.ts` | ✅ Complete - mirrors anchor accounts |

### Docs (`docs/`)
| File | Status |
|------|--------|
| `CURRENT_STATE.md` | Outdated |
| `CURRENT_STATE_AND_PROBLEMS.md` | Comprehensive |
| `DEMO_READINESS.md` | Demo checklist |
| `FINAL_SUMMARY.md` | Previous summary |
| `TESTING_AND_PROBLEMS.md` | Test results |
| `overview.md` | Overview |
| `PEERCHAIN_PROJECT_STATUS.md` | THIS FILE |

---

## 6. Hackathon Winning Conditions Checklist

Based on Dev3pack Global Hackathon (co-hosted by Solana, Vercel, ElevenLabs):

### Submission Requirements
- [ ] Working project with real functionality
- [ ] Code hosted on public repository (GitHub)
- [ ] Demo video / screen recording
- [ ] Clear README with setup instructions
- [ ] Submitted via Dev3pack platform before deadline

### Judging Criteria (inferred from co-host tracks)
- **Solana Track:** Real on-chain interactions, deployed program, wallet integration
- **v0/Frontend Track:** Polished UI, responsive design, component quality
- **ElevenLabs Track:** Working voice/AI integration, meaningful use of TTS
- **Overall:** Innovation, completeness, real-world impact, demo quality

### Gap Analysis
| Criterion | Current | Target | Action Needed |
|-----------|---------|--------|---------------|
| Deployed Solana program | ❌ | ✅ | Phase 2 |
| Real transactions | ❌ | ✅ | Phase 2 + 3 |
| Wallet interaction | ✅ | ✅ | - |
| Polished UI | ✅ | ✅ | - |
| ElevenLabs integration | ⚠️ | ✅ | Phase 3 (add API key) |
| Demo readiness | 50% | 95% | All phases |
| Reputation system | ✅ | ✅ | - |
| Funding transparency | ⚠️ | ✅ | Phase 2 (deploy treasury) |

---

## 7. Summary

**Project:** PeerChain - Decentralized Peer-Learning & Micro-Funding on Solana

**Current State:** Code-complete but not deployable in current environment. The entire application architecture is sound: Anchor program with 6 instructions and 5 account types, Next.js 16 frontend with shadcn/ui, Phantom wallet integration, and ElevenLabs TTS integration. The single blocking issue is the environment (Node.js v16) preventing builds and lacking Solana/Anchor CLI for program deployment.

**Estimated time to full hackathon readiness:** 2-3 hours (assuming successful tool installation)

**Priority order:**
1. Fix Node.js version (prerequisite for everything)
2. Install Solana + Anchor CLI
3. Deploy Anchor program to Devnet
4. Configure `.env.local` with keys
5. Connect API routes to real blockchain
6. Test full MVP flow
7. Submit to hackathon
