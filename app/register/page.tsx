import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TeamRegistrationForm } from "@/components/registration/team-registration-form"
import { Badge } from "@/components/ui/badge"

export default function RegisterPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Team Registration
            </Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">Register Your Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete the registration process to secure your team's spot in the All-Star Cricket Tournament
            </p>
          </div>

          <TeamRegistrationForm />
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
