import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, CreditCard } from "lucide-react"

interface DashboardStatsProps {
  teamData: {
    name: string
    playersCount: number
    registrationStatus: string
    paymentStatus: string
    category: string
  }
}

export function DashboardStats({ teamData }: DashboardStatsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Status</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamData.name}</div>
          <Badge className={getStatusColor(teamData.registrationStatus)} variant="secondary">
            {teamData.registrationStatus}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Players</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamData.playersCount}</div>
          <p className="text-xs text-muted-foreground">Registered players</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Payment</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Badge className={getStatusColor(teamData.paymentStatus)} variant="secondary">
            {teamData.paymentStatus}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">Category: {teamData.category}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tournament</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Mar 20-25</div>
          <p className="text-xs text-muted-foreground">2024 Tournament</p>
        </CardContent>
      </Card>
    </div>
  )
}
