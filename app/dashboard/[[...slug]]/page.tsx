"use client"

import { usePathname, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/shared/app-sidebar"
import { ConnectWallet } from "@/components/shared/connect-wallet"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LearningHub } from "@/components/dashboard/learning-hub"
import { FundingLedger } from "@/components/dashboard/funding-ledger"
import { AudioSuite } from "@/components/dashboard/audio-suite"
import { TransactionFeed } from "@/components/dashboard/transaction-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  LayoutDashboard, 
  GraduationCap, 
  Wallet, 
  AudioWaveform,
  Bell,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar border-border/50">
        <MobileNav />
      </SheetContent>
    </Sheet>
  )
}

function MobileNav() {
  const pathname = usePathname()
  
  const navItems = [
    { label: "Command Center", href: "/dashboard", icon: LayoutDashboard },
    { label: "Learning Hub", href: "/dashboard/learning", icon: GraduationCap },
    { label: "Funding Vaults", href: "/dashboard/funding", icon: Wallet },
    { label: "Audio Briefs", href: "/dashboard/audio", icon: AudioWaveform },
  ]

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b border-border/50 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary glow-green">
            <span className="text-lg font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            Peer<span className="text-primary">Chain</span>
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === '/dashboard' && item.href === '/dashboard') || pathname.startsWith(item.href) && item.href !== '/dashboard';
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border-glow-green"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  const pathname = usePathname()
  const router = useRouter()

  let activeTab = "dashboard"
  if (pathname === "/dashboard/learning") activeTab = "learning"
  else if (pathname === "/dashboard/funding") activeTab = "funding"
  else if (pathname === "/dashboard/audio") activeTab = "audio"

  const handleTabChange = (value: string) => {
    if (value === "dashboard") router.push("/dashboard")
    else router.push(`/dashboard/${value}`)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <main className="flex-1 lg:pl-64 transition-all duration-300">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <div>
            <h1 className="text-xl font-semibold text-foreground">
              {activeTab === "dashboard" && "Command Center"}
              {activeTab === "learning" && "Learning Hub"}
              {activeTab === "funding" && "Funding Vaults"}
              {activeTab === "audio" && "Audio Briefs"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === "dashboard" && "Your decentralized learning overview"}
              {activeTab === "learning" && "Find mentors and schedule peer sessions"}
              {activeTab === "funding" && "Manage and request micro-grants"}
              {activeTab === "audio" && "Technical documentation summaries"}
            </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
            <ConnectWallet />
          </div>
        </header>

        <div className="p-6">
          <Suspense fallback={<DashboardSkeleton />}>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsList className="glass inline-flex h-12 p-1">
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger
                  value="learning"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Learning</span>
                </TabsTrigger>
                <TabsTrigger
                  value="funding"
                  className="flex items-center gap-2 data-[state=active]:bg-secondary/10 data-[state=active]:text-secondary"
                >
                  <Wallet className="h-4 w-4" />
                  <span className="hidden sm:inline">Funding</span>
                </TabsTrigger>
                <TabsTrigger
                  value="audio"
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <AudioWaveform className="h-4 w-4" />
                  <span className="hidden sm:inline">Audio</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <DashboardStats />
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <button
                        onClick={() => handleTabChange("learning")}
                        className="glass-card rounded-xl p-5 text-left transition-all hover:border-primary/30 hover:glow-green group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                            <GraduationCap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              Find a Mentor
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Browse available peer reviewers
                            </p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleTabChange("funding")}
                        className="glass-card rounded-xl p-5 text-left transition-all hover:border-secondary/30 hover:glow-blue group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                            <Wallet className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-secondary transition-colors">
                              Request Funding
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Apply for a micro-grant
                            </p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleTabChange("audio")}
                        className="glass-card rounded-xl p-5 text-left transition-all hover:border-primary/30 hover:glow-green group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                            <AudioWaveform className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              Audio Briefs
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Listen to doc summaries
                            </p>
                          </div>
                        </div>
                      </button>
                      <div className="glass-card rounded-xl p-5 text-left border-dashed border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/30">
                            <span className="text-lg">🎯</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              Daily Challenge
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Complete 1 session today
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <TransactionFeed />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="learning">
                <LearningHub />
              </TabsContent>

              <TabsContent value="funding">
                <FundingLedger />
              </TabsContent>

              <TabsContent value="audio">
                <AudioSuite />
              </TabsContent>
            </Tabs>
          </Suspense>
        </div>
      </main>
    </div>
  )
}
