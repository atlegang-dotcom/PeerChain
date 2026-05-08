"use client"

import { TrendingUp, Users, Award, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Reputation Score",
    value: "847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Award,
    color: "primary",
  },
  {
    title: "Active Sessions",
    value: "24",
    change: "+3 this week",
    changeType: "positive" as const,
    icon: Users,
    color: "primary",
  },
  {
    title: "Funding Available",
    value: "3.2 SOL",
    change: "+0.8 SOL",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "secondary",
  },
  {
    title: "Learning Progress",
    value: "78%",
    change: "+5% this month",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "primary",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isSecondary = stat.color === "secondary"
        
        return (
          <Card
            key={stat.title}
            className={`glass-card border-border/50 ${
              isSecondary ? "border-glow-blue" : "border-glow-green"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div
                className={`rounded-lg p-2 ${
                  isSecondary ? "bg-secondary/10" : "bg-primary/10"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isSecondary ? "text-secondary" : "text-primary"
                  }`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  isSecondary ? "text-secondary text-glow-blue" : "text-primary text-glow-green"
                }`}
              >
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="text-primary">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
