import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14F195]">
              <span className="text-lg font-bold text-black">P</span>
            </div>
            <span className="text-lg font-semibold">Peer<span className="text-[#14F195]">Chain</span></span>
          </Link>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: May 2026</p>
        <div className="space-y-6 text-gray-400">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
            <p>PeerChain collects minimal information required to operate the platform:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Your Solana wallet address (public key)</li>
              <li>Session data you choose to record on-chain</li>
              <li>Reputation scores derived from peer ratings</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">How We Use Information</h2>
            <p>All core data is stored on the Solana blockchain and is publicly visible. We do not sell or share personal information with third parties. Audio generated via ElevenLabs API is processed temporarily and not stored.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Data Security</h2>
            <p>Transactions are secured by the Solana blockchain. Wallet authentication uses encrypted signatures. No private keys ever leave your wallet.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
            <p>For questions about this policy, reach out via the project&apos;s GitHub repository.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
