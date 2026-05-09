"use client"

import Link from "next/link"
import { GraduationCap, Wallet, AudioWaveform, Github, ExternalLink, Sparkles, BookOpen, Shield, Users } from "lucide-react"
import { ConnectWallet } from "@/components/shared/connect-wallet"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14F195]">
              <span className="text-lg font-bold text-black">P</span>
            </div>
            <span className="text-lg font-semibold">
              Peer<span className="text-[#14F195]">Chain</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14F195]/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#14F195]/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#14F195]/30 bg-[#14F195]/10 px-4 py-1.5 text-sm text-[#14F195] mb-8">
              <Sparkles className="h-4 w-4" />
              Decentralized Peer-Learning on Solana
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Learn Together,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#00CCFF]">
                Fund Each Other
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              PeerChain is a decentralized platform where learners earn reputation, 
              find mentors, and access micro-funding — all powered by Solana blockchain.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button className="h-12 px-8 text-base bg-[#14F195] text-black hover:bg-[#14F195]/90 font-medium rounded-xl">
                  Launch App
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/5 rounded-xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Built for the <span className="text-[#14F195]">Future</span> of Learning
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#14F195]/30 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14F195]/20 mb-5">
                <BookOpen className="h-6 w-6 text-[#14F195]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Peer Mentorship</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect with skilled peers for one-on-one or group mentorship. 
                Every session builds your on-chain reputation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#14F195]/30 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00CCFF]/20 mb-5">
                <Wallet className="h-6 w-6 text-[#00CCFF]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Micro-Funding</h3>
              <p className="text-gray-400 leading-relaxed">
                Request small grants for course materials, tools, or projects. 
                Funding decisions are transparent and reputation-based.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-[#14F195]/30 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14F195]/20 mb-5">
                <Shield className="h-6 w-6 text-[#14F195]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reputation System</h3>
              <p className="text-gray-400 leading-relaxed">
                Every session, rating, and contribution builds your trust score. 
                Higher reputation unlocks more funding and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            How It <span className="text-[#14F195]">Works</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
            Four simple steps to start learning and earning on PeerChain
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Connect Wallet", desc: "Connect your Solana wallet (Phantom or Solflare) to get started." },
              { step: "02", title: "Build Reputation", desc: "Join mentorship sessions, get rated by peers, and earn trust." },
              { step: "03", title: "Request Funding", desc: "Submit micro-grant proposals backed by your reputation score." },
              { step: "04", title: "Grow Together", desc: "Use funds for learning, mentor others, and reinvest in the community." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#14F195]/20 to-[#00CCFF]/20 border border-[#14F195]/20 mb-6">
                  <span className="text-2xl font-bold text-[#14F195]">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14F195]">
                  <span className="text-lg font-bold text-black">P</span>
                </div>
                <span className="text-lg font-semibold">
                  Peer<span className="text-[#14F195]">Chain</span>
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Decentralized peer-learning & micro-funding on Solana.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Built With</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-500">
                <span>Solana Blockchain</span>
                <span>Anchor Framework</span>
                <span>Next.js 16</span>
                <span>ElevenLabs AI</span>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} PeerChain. Built for Dev3pack Global Hackathon.
          </div>
        </div>
      </footer>
    </div>
  )
}
