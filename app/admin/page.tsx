import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdminStats } from "@/components/admin/admin-stats"
import { TeamsTable } from "@/components/admin/teams-table"
import { PaymentsOverview } from "@/components/admin/payments-overview"
import { ContactMessages } from "@/components/admin/contact-messages"
import { TournamentSettings } from "@/components/admin/tournament-settings"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  // Mock data - in real app, this would come from API/database
  const adminStats = {
    totalTeams: 12,
    confirmedTeams: 8,
    totalRevenue: 45000,
    pendingPayments: 4,
    totalPlayers: 156,
    contactMessages: 7,
  }

  const mockTeams = [
    {
      id: "1",
      name: "Mumbai Warriors",
      captain: "Rohit Sharma",
      email: "rohit@mumbaiwarriors.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      category: "Open",
      playersCount: 13,
      registrationStatus: "confirmed" as const,
      paymentStatus: "completed" as const,
      registrationDate: "2024-03-05",
    },
    {
      id: "2",
      name: "Delhi Capitals",
      captain: "Virat Kohli",
      email: "virat@delhicapitals.com",
      phone: "+91 98765 43211",
      city: "Delhi",
      category: "Open",
      playersCount: 11,
      registrationStatus: "pending" as const,
      paymentStatus: "pending" as const,
      registrationDate: "2024-03-06",
    },
    {
      id: "3",
      name: "Chennai Super Kings",
      captain: "MS Dhoni",
      email: "dhoni@csk.com",
      phone: "+91 98765 43212",
      city: "Chennai",
      category: "Corporate",
      playersCount: 15,
      registrationStatus: "confirmed" as const,
      paymentStatus: "completed" as const,
      registrationDate: "2024-03-04",
    },
  ]

  const mockPayments = [
    {
      id: "1",
      teamName: "Mumbai Warriors",
      amount: 5000,
      status: "completed" as const,
      paymentId: "PAY-2024-001",
      paymentDate: "2024-03-05",
      category: "Open",
    },
    {
      id: "2",
      teamName: "Chennai Super Kings",
      amount: 4000,
      status: "completed" as const,
      paymentId: "PAY-2024-002",
      paymentDate: "2024-03-04",
      category: "Corporate",
    },
    {
      id: "3",
      teamName: "Delhi Capitals",
      amount: 5000,
      status: "pending" as const,
      paymentDate: "2024-03-06",
      category: "Open",
    },
  ]

  const mockMessages = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      subject: "Query about tournament rules",
      message: "Hi, I wanted to clarify the age limit for players. Can players above 50 participate?",
      status: "unread" as const,
      createdAt: "2024-03-07",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@example.com",
      subject: "Payment issue",
      message: "I'm facing issues with payment gateway. The transaction failed twice. Please help.",
      status: "read" as const,
      createdAt: "2024-03-06",
    },
    {
      id: "3",
      name: "Team Captain",
      email: "captain@team.com",
      subject: "Venue directions",
      message: "Could you please share detailed directions to the tournament venue?",
      status: "replied" as const,
      createdAt: "2024-03-05",
    },
  ]

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Administrator
              </Badge>
            </div>
            <p className="text-muted-foreground">Manage tournament registrations, payments, and settings</p>
          </div>

          {/* Admin Stats */}
          <div className="mb-8">
            <AdminStats stats={adminStats} />
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="teams" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <TeamsTable teams={mockTeams} />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentsOverview payments={mockPayments} />
            </TabsContent>

            <TabsContent value="messages">
              <ContactMessages messages={mockMessages} />
            </TabsContent>

            <TabsContent value="settings">
              <TournamentSettings />
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
