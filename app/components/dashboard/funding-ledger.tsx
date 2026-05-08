"use client"

import { useState } from "react"
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  AudioLines,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Social Collateral Meter
function SocialCollateralMeter({ score }: { score: number }) {
  const getEligibilityLevel = (s: number) => {
    if (s >= 80) return { level: "Premium", color: "text-primary", bg: "bg-primary/20" }
    if (s >= 60) return { level: "Standard", color: "text-secondary", bg: "bg-secondary/20" }
    if (s >= 40) return { level: "Basic", color: "text-yellow-500", bg: "bg-yellow-500/20" }
    return { level: "Building", color: "text-muted-foreground", bg: "bg-muted/30" }
  }

  const eligibility = getEligibilityLevel(score)

  return (
    <Card className="glass-card border-border/50 border-glow-blue">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">Social Collateral Score</span>
          <Badge className={`${eligibility.bg} ${eligibility.color} border-0`}>
            {eligibility.level}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <span className="text-4xl font-bold text-secondary text-glow-blue">{score}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <Progress value={score} className="h-2 bg-muted/30" />
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-muted/30 p-2">
              <p className="text-muted-foreground">Sessions</p>
              <p className="font-semibold text-primary">24</p>
            </div>
            <div className="rounded-lg bg-muted/30 p-2">
              <p className="text-muted-foreground">Reviews</p>
              <p className="font-semibold text-primary">18</p>
            </div>
            <div className="rounded-lg bg-muted/30 p-2">
              <p className="text-muted-foreground">Endorsements</p>
              <p className="font-semibold text-primary">12</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Audio Waveform Visualizer
function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  // Pre-defined heights to avoid hydration mismatch from Math.random()
  const barHeights = [16, 24, 20, 28, 12, 22, 18, 30, 14, 26, 20, 24, 16, 28, 22, 18, 26, 14, 30, 20]
  
  return (
    <div className="flex items-center justify-center gap-0.5 h-8">
      {barHeights.map((height, i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-secondary transition-all duration-150 ${
            isPlaying ? "animate-pulse" : ""
          }`}
          style={{
            height: isPlaying ? `${height}px` : "4px",
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}

// Request Grant Modal
function RequestGrantModal() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-blue">
          <Plus className="mr-2 h-4 w-4" />
          Request Micro-Grant
        </Button>
      </DialogTrigger>
      <DialogContent className="glass sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            Request Micro-Grant
          </DialogTitle>
          <DialogDescription>
            Submit your funding request with a voice pitch to increase your chances.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Requested Amount (SOL)</Label>
            <Input
              id="amount"
              placeholder="0.5"
              type="number"
              step="0.1"
              className="bg-input/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Describe what you'll use the funding for..."
              className="bg-input/50 border-border/50 min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label>Voice Pitch (ElevenLabs)</Label>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
              <AudioWaveform isPlaying={isRecording} />
              <div className="mt-3 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`${
                    isRecording
                      ? "bg-destructive/10 text-destructive border-destructive/30"
                      : "bg-secondary/10 text-secondary border-secondary/30"
                  }`}
                >
                  <AudioLines className="mr-2 h-4 w-4" />
                  {isRecording ? "Stop Recording" : "Record Pitch"}
                </Button>
              </div>
            </div>
          </div>
          <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-blue">
            Submit Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Active Funding Requests Marketplace
const fundingRequests = [
  {
    id: "1",
    requester: "@devlearner",
    avatar: "DL",
    amount: "0.5 SOL",
    purpose: "Complete Rust smart contract course",
    collateralScore: 72,
    backers: 3,
    progress: 60,
    hasVoicePitch: true,
  },
  {
    id: "2",
    requester: "@web3newbie",
    avatar: "WN",
    amount: "0.3 SOL",
    purpose: "Build portfolio dApp project",
    collateralScore: 58,
    backers: 2,
    progress: 40,
    hasVoicePitch: false,
  },
  {
    id: "3",
    requester: "@chaindev",
    avatar: "CD",
    amount: "1.0 SOL",
    purpose: "Attend Web3 bootcamp certification",
    collateralScore: 85,
    backers: 5,
    progress: 80,
    hasVoicePitch: true,
  },
]

export function FundingLedger() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Social Collateral Meter */}
        <SocialCollateralMeter score={72} />

        {/* Quick Stats */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Funding Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Total Received</span>
              </div>
              <span className="font-semibold text-secondary">2.8 SOL</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Backers</span>
              </div>
              <span className="font-semibold text-primary">7</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Success Rate</span>
              </div>
              <span className="font-semibold text-primary">85%</span>
            </div>
          </CardContent>
        </Card>

        {/* Request Grant */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Need Funding?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your social collateral qualifies you for micro-grants up to{" "}
              <span className="text-secondary font-semibold">1.5 SOL</span>
            </p>
            <RequestGrantModal />
          </CardContent>
        </Card>
      </div>

      {/* Funding Marketplace */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Funding Marketplace</h3>
          <Badge variant="outline" className="text-secondary border-secondary/30">
            {fundingRequests.length} Active Requests
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fundingRequests.map((request) => (
            <Card key={request.id} className="glass-card border-border/50 hover:border-secondary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary font-semibold">
                      {request.avatar}
                    </div>
                    <div>
                      <p className="font-mono text-sm text-foreground">{request.requester}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {request.collateralScore}
                      </p>
                    </div>
                  </div>
                  {request.hasVoicePitch && (
                    <AudioLines className="h-4 w-4 text-secondary" />
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {request.purpose}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary font-semibold">{request.amount}</span>
                    <span className="text-muted-foreground">{request.progress}% funded</span>
                  </div>
                  <Progress value={request.progress} className="h-1.5 bg-muted/30" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {request.backers} backers
                  </span>
                  <Button size="sm" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                    Back Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
