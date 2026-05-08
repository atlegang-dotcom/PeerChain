"use client"

import { useState } from "react"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ConnectWallet() {
  const [connected, setConnected] = useState(false)
  const [walletAddress] = useState("9b3d1f4e2a7c8b9d0e1f2a3b4c5d6e7f8a9b0c1d")

  const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  if (!connected) {
    return (
      <Button
        onClick={() => setConnected(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass border-primary/30 hover:border-primary/50">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm">{truncatedAddress}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass w-56">
        <DropdownMenuItem className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={() => setConnected(false)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
