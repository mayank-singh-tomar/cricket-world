import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function RegistrationPaymentPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Registration Complete Message */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-primary">Registration Submitted!</CardTitle>
                <CardDescription>Your team registration has been successfully submitted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Next Step: Complete Payment</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To secure your team's spot in the tournament, please complete the registration fee payment.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/payment">
                      Proceed to Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="text-left space-y-3">
                  <h4 className="font-semibold">What happens after payment?</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>✓ Instant registration confirmation</p>
                    <p>✓ Email with tournament details</p>
                    <p>✓ Access to team dashboard</p>
                    <p>✓ Tournament schedule and updates</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Registration ID: REG-{Date.now()}</p>
                  <p>For any queries, contact us at info@allstarcricket.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
