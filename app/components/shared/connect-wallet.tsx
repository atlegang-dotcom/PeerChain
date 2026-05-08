"use client";

import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function ConnectWallet() {
  const { connection } = useConnection();
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState<number | null>(null);

  // Fetch balance when public key changes
  useEffect(() => {
    if (!publicKey) return;

    const fetchBalance = async () => {
      const updatedBalance = await connection.getBalance(publicKey);
      setBalance(updatedBalance / LAMPORTS_PER_SOL);
    };

    fetchBalance();

    // Optional: Subscribe to account changes for real-time balance updates
    const subscriptionId = connection.onAccountChange(publicKey, (account) => {
      setBalance(account.lamports / LAMPORTS_PER_SOL);
    });

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [publicKey, connection]);

  // Abbreviate the address (e.g., 9b3d...x8y2)
  const abbreviatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "";

  if (!connected) {
    return (
      <Button
        onClick={() => setVisible(true)}
        className="bg-solana text-charcoal hover:bg-solana/90 font-mono font-bold transition-all shadow-[0_0_15px_rgba(20,241,149,0.3)]"
      >
        <Wallet className="mr-2 h-4 w-4" />
        CONNECT WALLET
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-mono border-solana/50 hover:border-solana bg-charcoal/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-solana animate-pulse" />
            <span className="text-solana">{balance?.toFixed(3) || "0.000"} SOL</span>
            <span className="text-muted-foreground">|</span>
            <span>{abbreviatedAddress}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-charcoal border-solana/20 text-foreground">
        <DropdownMenuItem
          className="cursor-pointer focus:bg-solana/10"
          onClick={() => window.open(`https://explorer.solana.com/address/${publicKey?.toBase58()}?cluster=devnet`, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4 text-solana" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer focus:bg-destructive/10 text-destructive"
          onClick={disconnect}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}