# PeerChain 🚀

Decentralized Peer-Learning & Micro-Funding powered by Solana and AI.

## 📁 Project Structure

```
peerchain/
├── anchor/                # Solana Smart Contracts (Rust/Anchor)
│   ├── programs/
│   │   └── peerchain/     # Core logic for Reputation & Funding Vaults
│   │       └── src/
│   │           ├── lib.rs # Main entry point for the Solana program
│   │           └── state.rs # Definitions for StudentProfile & StudySession
│   ├── tests/             # Mocha/TypeScript tests for smart contracts
│   └── Anchor.toml        # Anchor configuration (Devnet/Localnet)
├── app/                   # Next.js Frontend (Generated via v0 by Vercel)
│   ├── components/        # Reusable UI elements
│   │   ├── dashboard/     # Learning Hub & Funding Ledger views
│   │   ├── shared/        # Sidebar, Wallet Button, & Layout components
│   │   └── ui/            # Shadcn UI primitives (Buttons, Cards, Inputs)
│   ├── api/               # Serverless Functions (Backend logic)
│   │   ├── tts/           # ElevenLabs API routes for audio generation
│   │   └── analyze/       # Logic to convert documentation to audio scripts
│   ├── hooks/             # Custom React hooks (e.g., useSolanaReputation)
│   ├── lib/               # Helper utilities (Solana connection, AI prompts)
│   ├── public/            # Static assets (Logos, Nano Banana branding)
│   └── styles/            # Tailwind CSS & Cyberpunk themes
├── docs/                  # Project documentation (Overview V3, diagrams)
├── scripts/               # Setup scripts for airdrops and deployment
├── .env.example           # Template for ElevenLabs & Solana API keys
├── package.json           # Root dependencies
└── README.md              # Project pitch and setup instructions
```

## 🛠️ Tech Stack

- **Blockchain**: Solana (Anchor Framework, Rust)
- **Frontend**: Next.js 15, Tailwind CSS, Shadcn UI
- **AI**: ElevenLabs (Text-to-Speech), LangChain (Document Analysis)
- **Deployment**: Vercel (Frontend), Solana Devnet (Contracts)

## 🚀 Getting Started

1.  **Clone the repository**
2.  **Install dependencies**: `npm install`
3.  **Setup environment**: `cp .env.example .env`
4.  **Run development server**: `npm run dev`
