"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get("id") || "REG-UNKNOWN"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">
              Your team registration has been completed successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Registration Confirmed</h3>
              <p className="text-sm text-green-700">
                Registration ID: <span className="font-mono font-bold">{registrationId}</span>
              </p>
              <p className="text-sm text-green-700">
                Payment ID: <span className="font-mono">PAY-{Date.now()}</span>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <div className="text-left space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Confirmation Email</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a detailed confirmation email with your registration details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Tournament Kit</p>
                    <p className="text-sm text-muted-foreground">
                      Tournament rules, schedule, and venue details will be shared 1 week before the event
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Team Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Our team will verify your registration and contact you if any additional information is needed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Important Reminders</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep your registration ID safe for future reference</li>
                <li>• All players must carry valid ID proof on tournament day</li>
                <li>• Team captain must be present during the tournament</li>
                <li>• Check your email regularly for tournament updates</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground border-t pt-4">
              <p>For any queries or support, contact us:</p>
              <p>Email: info@allstarcricket.com | Phone: +91 98765 43210</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <SuccessContent />
        </Suspense>
        <Footer />
      </div>
    </AuthGuard>
  )
}
