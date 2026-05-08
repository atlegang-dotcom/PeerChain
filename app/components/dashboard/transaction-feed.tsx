"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  id: string
  hash: string
  type: "session_verified" | "grant_received" | "reputation_earned"
  description: string
  timeAgo: string
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    hash: "9b3d1f4e2a7c",
    type: "session_verified",
    description: "Peer session verified with @rustdev",
    timeAgo: "2m ago",
  },
  {
    id: "2",
    hash: "a8c2e5f1b9d3",
    type: "grant_received",
    description: "Micro-grant of 0.5 SOL received",
    timeAgo: "5m ago",
  },
  {
    id: "3",
    hash: "7f6e5d4c3b2a",
    type: "reputation_earned",
    description: "+15 reputation from @web3mentor",
    timeAgo: "7m ago",
  },
  {
    id: "4",
    hash: "2c3d4e5f6a7b",
    type: "session_verified",
    description: "Completed Java fundamentals review",
    timeAgo: "10m ago",
  },
]

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Recent Transactions</h3>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 transition-all hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  tx.type === "grant_received"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {tx.type === "grant_received" ? (
                  <ArrowDownLeft className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                )}
              </div>
              <div>
                <p className="text-xs text-foreground">{tx.description}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {tx.hash}...
                </p>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {tx.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
