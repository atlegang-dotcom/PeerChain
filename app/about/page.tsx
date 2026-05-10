import Link from "next/link"

export default function AboutPage() {
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
        <h1 className="text-4xl font-bold mb-6">About PeerChain</h1>
        <p className="text-gray-400 text-lg mb-8">
          PeerChain is a decentralized platform that connects learners with mentors and micro-funding opportunities, 
          built on the Solana blockchain for transparency, low fees, and global accessibility.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-12">Our Mission</h2>
        <p className="text-gray-400 mb-8">
          We believe that education should be accessible to everyone. PeerChain creates a trust-based ecosystem 
          where learners can prove their commitment through participation, build reputation through peer reviews, 
          and access funding based on merit rather than traditional barriers.
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-12">How It Works</h2>
        <div className="space-y-4 text-gray-400">
          <p><strong className="text-white">1. Connect:</strong> Link your Solana wallet to create your on-chain identity.</p>
          <p><strong className="text-white">2. Learn:</strong> Join mentorship sessions — one-on-one, group study, or code reviews.</p>
          <p><strong className="text-white">3. Earn Reputation:</strong> Get rated by peers after each session. Your reputation score grows.</p>
          <p><strong className="text-white">4. Access Funding:</strong> Apply for micro-grants backed by your reputation. Funding is transparent and on-chain.</p>
          <p><strong className="text-white">5. Give Back:</strong> Mentor others, review funding requests, and strengthen the community.</p>
        </div>
        <h2 className="text-2xl font-semibold mb-4 mt-12">Technology</h2>
        <p className="text-gray-400 mb-8">
          PeerChain uses the Anchor framework on Solana for smart contracts, with Phantom wallet integration 
          for secure authentication. The frontend is built with Next.js 16 and styled with Tailwind CSS. 
          Voice briefs are powered by ElevenLabs AI.
        </p>
      </main>
    </div>
  )
}
