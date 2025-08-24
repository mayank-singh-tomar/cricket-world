"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw, Phone } from "lucide-react"
import Link from "next/link"

function FailedContent() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get("id") || "REG-UNKNOWN"

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <CardTitle className="text-3xl text-red-600">Payment Failed</CardTitle>
            <CardDescription className="text-lg">
              We couldn't process your payment. Your registration is still pending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Registration Status: Pending</h3>
              <p className="text-sm text-red-700">
                Registration ID: <span className="font-mono font-bold">{registrationId}</span>
              </p>
              <p className="text-sm text-red-700">
                Your team details have been saved, but payment is required to complete registration.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Common reasons for payment failure:</h3>
              <div className="text-left space-y-2 text-sm text-muted-foreground">
                <p>• Insufficient balance in your account</p>
                <p>• Network connectivity issues</p>
                <p>• Bank server temporarily unavailable</p>
                <p>• Incorrect card details or expired card</p>
                <p>• Transaction limit exceeded</p>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What you can do:</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>1. Check your internet connection and try again</p>
                <p>2. Verify your card details and available balance</p>
                <p>3. Try using a different payment method</p>
                <p>4. Contact your bank if the issue persists</p>
                <p>5. Reach out to our support team for assistance</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/payment">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Payment
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground border-t pt-4">
              <p className="font-semibold mb-1">Need immediate help?</p>
              <p>Call us: +91 98765 43210 (9 AM - 6 PM)</p>
              <p>Email: support@allstarcricket.com</p>
              <p>We'll help you complete your registration quickly!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <FailedContent />
        </Suspense>
        <Footer />
      </div>
    </AuthGuard>
  )
}
