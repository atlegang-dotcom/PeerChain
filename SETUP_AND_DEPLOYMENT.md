# PeerChain - Setup & Deployment Guide

## Prerequisites

- **Node.js** >= 20.9.0 (v24.14.0 installed)
- **npm** or **pnpm** (npm 11.9.0 installed)
- **Solana CLI** (installed at `/home/codespace/.local/share/solana/install/active_release/bin/solana`)
- **Anchor CLI 0.29.0** (needs manual install — see below)
- **Phantom Wallet** browser extension
- **ElevenLabs API Key** (get from https://elevenlabs.ai)

---

## 1. Quick Start (Frontend Only — No Blockchain)

```bash
# Install dependencies (already installed)
npm install

# Copy environment file and add your keys
cp .env.example .env.local
# Then edit .env.local with your keys

# Run the dev server
npm run dev
```

The frontend will load at **http://localhost:3000** with:
- Wallet connection (Phantom/Solflare)
- Dashboard with mock data
- Audio suite (needs ElevenLabs API key)
- All UI components

---

## 2. Environment Variables

Edit `.env.local` and add these values:

| Variable | Required? | Description |
|----------|-----------|-------------|
| `ELEVENLABS_API_KEY` | **YES** | Your ElevenLabs API key for TTS |
| `NEXT_PUBLIC_PROGRAM_ID` | After deploy | Your Anchor program ID |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Optional | Solana RPC (defaults to devnet) |
| `NEXT_PUBLIC_ELEVENLABS_VOICE_ID` | Optional | Voice ID (default: Rachel) |

The `.env.local` has been created with placeholders. Fill in the values marked `TODO`.

---

## 3. Solana CLI Setup

```bash
# Add to your PATH (auto-added if you restarted terminal)
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Verify
solana --version

# Set config to devnet
solana config set --url https://api.devnet.solana.com

# Generate a wallet (if you don't have one)
solana-keygen new --force

# View your wallet address
solana address

# Get free SOL for devnet testing
solana airdrop 2
# If that fails, use: https://solfaucet.com
```

---

## 4. Anchor Program — Build & Deploy

The Anchor CLI 1.0.2 is installed but the program uses `anchor-lang = "0.29.0"`.

### Option A: Install Anchor 0.29.0 (Recommended)

```bash
# Source Rust env
source "$HOME/.cargo/env"

# Install Anchor 0.29.0 via AVM
avm install 0.29.0
avm use 0.29.0

# Verify
anchor --version  # Should show 0.29.0
```

### Option B: Upgrade Program to Anchor 1.0.2

If you want to use the installed 1.0.2, update `anchor/programs/peerchain/Cargo.toml`:
```toml
anchor-lang = "0.30.1"  # Latest 0.x compatible with CLI 1.x
```

### Build & Deploy

```bash
cd anchor

# Build the program
anchor build

# The build generates a keypair at:
# target/deploy/peerchain-keypair.json
# Get the program ID:
solana address -k target/deploy/peerchain-keypair.json

# Update program ID in 3 places:
# 1. anchor/programs/peerchain/src/lib.rs (declare_id!)
# 2. anchor/Anchor.toml ([programs.devnet] section)
# 3. .env.local (NEXT_PUBLIC_PROGRAM_ID)

# Deploy to devnet
anchor deploy

# Initialize the treasury
cd ..
node scripts/init-treasury.js
```

---

## 5. Phantom Wallet Setup

1. Install **Phantom Wallet** browser extension (https://phantom.app)
2. Create a new wallet or import existing
3. Switch network to **Devnet**:
   - Open Phantom → Settings → Network → Change to "Devnet"
4. Get free SOL:
   - Open Phantom → Faucet → Request SOL (Devnet)
   - Or use https://solfaucet.com

### Connect to PeerChain

1. Start the app: `npm run dev`
2. Open http://localhost:3000
3. Click **"Connect Wallet"** button (top-right)
4. Approve the connection in Phantom
5. Your wallet address and balance will appear in the dashboard

---

## 6. Running Tests

### Backend API Tests (20 tests)

```bash
npm test
# or
npm run test:backend
```

Tests cover:
- **Sessions API**: POST validation (missing fields), GET response format
- **Funding API**: POST validation, GET response format
- **Reputation API**: GET validation (missing user), POST validation
- **TTS API**: GET validation, POST (no API key) error handling

### Anchor Program Tests (Rust)

When Anchor 0.29.0 is installed:

```bash
cd anchor
anchor test
```

---

## 7. Full MVP Flow

Once everything is deployed and configured:

1. **Connect Phantom Wallet** (Devnet)
2. **Create Profile** — calls `create_user` instruction
3. **Log Mentorship Session** — calls `log_session` instruction
4. **View Reputation** — calls `update_reputation` instruction
5. **Request Funding** — calls `request_funding` instruction
6. **Treasury Approves** — calls `approve_funding` instruction
7. **Funds Distributed** — calls `distribute_funds` instruction
8. **Audio Brief** — ElevenLabs TTS generates voice summary

---

## 8. API Routes Reference

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/sessions` | GET | List user's mentorship sessions | Query: `?user=` |
| `/api/sessions` | POST | Log a new session | Wallet signature |
| `/api/funding` | GET | List funding requests | Query: `?user=` |
| `/api/funding` | POST | Submit funding request | Wallet signature |
| `/api/reputation` | GET | Get user's reputation score | Query: `?user=` |
| `/api/reputation` | POST | Update reputation | Wallet signature |
| `/api/tts` | GET | Preview TTS (metadata) | Query: `?text=` |
| `/api/tts` | POST | Generate audio | ElevenLabs API key |

---

## 9. Troubleshooting

### Build fails: `tailwindcss-oxide` not found

```bash
npm install @tailwindcss/oxide-linux-x64-gnu
```

### Wallet won't connect

- Ensure Phantom is on **Devnet** network
- Ensure you have SOL balance
- Check browser console for errors

### API returns 500

- Check `.env.local` has the required keys
- Check server console for error details

### Anchor build fails

- Ensure you're using Anchor 0.29.0 (not 1.x)
- Run `avm use 0.29.0` before building

---

## 10. Files Structure

```
PeerChain/
├── anchor/                          # Solana Anchor program
│   ├── programs/peerchain/src/
│   │   ├── lib.rs                   # 6 instructions
│   │   └── state.rs                 # 5 accounts
│   ├── Cargo.toml
│   └── Anchor.toml
├── app/                             # Next.js frontend
│   ├── api/                         # API routes
│   │   ├── sessions/route.ts
│   │   ├── funding/route.ts
│   │   ├── reputation/route.ts
│   │   └── tts/route.ts
│   ├── components/
│   │   ├── dashboard/               # Stats, sessions, funding, audio
│   │   ├── shared/                  # Wallet, sidebar, theme
│   │   └── ui/                      # shadcn/ui primitives
│   └── lib/
│       └── solana-provider.tsx      # Wallet adapter
├── tests/                           # Jest test suite
│   ├── api/                         # API route tests (20 tests)
│   ├── __mocks__/                   # Module mocks
│   └── setup.ts                     # Test environment config
├── shared/types/                    # TypeScript interfaces
├── scripts/                         # Utility scripts
└── SETUP_AND_DEPLOYMENT.md          # THIS FILE
```
