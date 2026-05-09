import Link from "next/link"

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: May 2026</p>
        <div className="space-y-6 text-gray-400">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Acceptance of Terms</h2>
            <p>By using PeerChain, you agree to these terms. PeerChain is a hackathon project and provided &quot;as is&quot; without warranty.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Use of Service</h2>
            <p>You agree to use PeerChain for lawful purposes only. You are responsible for your wallet and any transactions you sign.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Blockchain Transactions</h2>
            <p>All transactions on Solana are irreversible. PeerChain is not responsible for lost funds or failed transactions. Use test networks for experimentation.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">Limitation of Liability</h2>
            <p>PeerChain is provided for educational and demonstration purposes. The creators are not liable for any damages arising from use of this platform.</p>
          </section>
        </div>
      </main>
    </div>
  )
}
