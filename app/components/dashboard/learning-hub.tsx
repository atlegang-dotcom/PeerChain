"use client"

import { useState } from "react"
import { Search, Star, Calendar, CheckCircle, Clock, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const techTags = ["All", "Java", "Rust", "Web3", "Solidity", "Python", "TypeScript"]

const mentors = [
  {
    id: "1",
    name: "Alex Rustacean",
    handle: "@rustdev",
    avatar: "AR",
    reputation: 1250,
    tags: ["Rust", "Web3", "Solidity"],
    sessionsCompleted: 48,
    rating: 4.9,
    proofOfLearning: ["Rust fundamentals", "Smart contracts", "DeFi protocols"],
    available: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    handle: "@web3mentor",
    avatar: "SC",
    reputation: 980,
    tags: ["Web3", "TypeScript", "React"],
    sessionsCompleted: 32,
    rating: 4.8,
    proofOfLearning: ["dApp development", "Wallet integration", "NFT minting"],
    available: true,
  },
  {
    id: "3",
    name: "Marcus Java",
    handle: "@javaguru",
    avatar: "MJ",
    reputation: 1100,
    tags: ["Java", "Spring", "Microservices"],
    sessionsCompleted: 56,
    rating: 4.7,
    proofOfLearning: ["Spring Boot", "JPA/Hibernate", "API design"],
    available: false,
  },
  {
    id: "4",
    name: "Elena Solana",
    handle: "@solanadev",
    avatar: "ES",
    reputation: 890,
    tags: ["Solidity", "Rust", "Web3"],
    sessionsCompleted: 28,
    rating: 4.9,
    proofOfLearning: ["Anchor framework", "Token programs", "SPL tokens"],
    available: true,
  },
]

const scheduledSessions = [
  {
    id: "1",
    mentor: "Alex Rustacean",
    topic: "Rust Ownership Deep Dive",
    date: "Today, 3:00 PM",
    status: "upcoming",
  },
  {
    id: "2",
    mentor: "Sarah Chen",
    topic: "Building a DEX Frontend",
    date: "Tomorrow, 10:00 AM",
    status: "upcoming",
  },
  {
    id: "3",
    mentor: "Marcus Java",
    topic: "Spring Security Basics",
    date: "Yesterday",
    status: "verified",
    txHash: "7f6e5d4c3b2a",
  },
]

export function LearningHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    const matchesTag =
      selectedTag === "All" || mentor.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search mentors, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input/50 pl-9 border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {techTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Mentors */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Active Mentors</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="glass-card border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                        {mentor.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{mentor.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {mentor.handle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {mentor.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-muted/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      <span className="text-primary font-semibold">{mentor.reputation}</span> Rep
                    </div>
                    <div className="text-muted-foreground">
                      {mentor.sessionsCompleted} sessions
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className={`mt-4 w-full ${
                          mentor.available
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-muted/30 text-muted-foreground"
                        }`}
                        disabled={!mentor.available}
                      >
                        {mentor.available ? "View Profile" : "Unavailable"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-semibold">
                            {mentor.avatar}
                          </div>
                          <div>
                            <span>{mentor.name}</span>
                            <p className="text-sm font-normal text-muted-foreground font-mono">
                              {mentor.handle}
                            </p>
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          Proof of Learning History
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 mt-4">
                        {mentor.proofOfLearning.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 rounded-lg bg-muted/30 p-3"
                          >
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span className="text-sm text-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-green">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Session
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Scheduled Sessions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Scheduled Sessions</h3>
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Your upcoming peer reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduledSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg bg-muted/30 p-3 transition-all hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {session.topic}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        with {session.mentor}
                      </p>
                    </div>
                    {session.status === "verified" ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Clock className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {session.date}
                    </span>
                    {session.txHash && (
                      <span className="font-mono text-[10px] text-primary">
                        tx: {session.txHash}...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
