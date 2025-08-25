"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { TeamDetails } from "@/components/dashboard/team-details"
import { PlayersList } from "@/components/dashboard/players-list"
import { PaymentStatus } from "@/components/dashboard/payment-status"
import { TournamentUpdates } from "@/components/dashboard/tournament-updates"
import { UserProfileDetails } from "@/components/dashboard/user-profile-details"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { User, LogOut, Home, Info, Mail, UserPlus, Trophy, Settings } from "lucide-react"
import Link from "next/link"

interface Player {
  id: string
  name: string
  age: number
  player_type: string
  team: string
  gender: string
  nationality: string
  photo: string
}

export default function DashboardPage() {
  const { user, profile, logout } = useAuth()
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    fetchPlayers()
  }, [user, router])

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players/all')
      if (response.ok) {
        const data = await response.json()
        const transformedPlayers = data.players.map((player: any) => ({
          id: player.id,
          name: player.full_name,
          age: player.age,
          player_type: player.player_type,
          team: player.team_name || 'Unassigned',
          gender: player.gender,
          nationality: player.nationality,
          photo_data: player.photo_data,
          photo_mime_type: player.photo_mime_type
        }))
        setPlayers(transformedPlayers)
      }
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push("/")
    }
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const teamData = {
    name: profile?.team_name || "Unassigned",
    playersCount: players.length,
    registrationStatus: "Confirmed",
    paymentStatus: "Completed",
    category: profile?.player_type || "Player",
  }

  const teamDetails = {
    name: profile?.team_name || "Unassigned",
    captain: profile?.full_name || "Not assigned",
    players: players.length,
    registrationDate: new Date(profile?.created_at || "").toLocaleDateString(),
    status: "Confirmed",
  }

  const paymentData = {
    status: "completed" as const,
    amount: 5000,
    paymentId: "PAY_" + Math.random().toString(36).substr(2, 9),
    paymentDate: new Date().toLocaleDateString(),
    category: profile?.player_type || "Player",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage 
                  src={profile.photo_data ? `/api/photos/${profile.id}` : "/placeholder-user.jpg"} 
                  alt={profile.full_name} 
                />
                <AvatarFallback>
                  {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {profile.full_name}!</h1>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{profile.player_type || "Player"}</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-6 overflow-x-auto">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Info className="h-4 w-4" />
              <span>About Tournament</span>
            </Link>
            <Link 
              href="/register" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <UserPlus className="h-4 w-4" />
              <span>Register Team</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>
            <Link 
              href="/admin" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Settings className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
            <div className="flex items-center space-x-2 text-primary font-medium whitespace-nowrap">
              <Trophy className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Quick Profile
                </CardTitle>
                <CardDescription>Your basic information at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p className="font-medium">{profile.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Player Type</p>
                    <p className="font-medium">{profile.player_type || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team</p>
                    <p className="font-medium">{profile.team_name || "Unassigned"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DashboardStats teamData={teamData} />
            <TeamDetails teamDetails={teamDetails} />
            <PlayersList players={players} loading={loading} />
            <PaymentStatus payment={paymentData} />
            <TournamentUpdates />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfileDetails profile={profile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
