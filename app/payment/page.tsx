"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { RazorpayPayment } from "@/components/payment/razorpay-payment"
import { Badge } from "@/components/ui/badge"

function PaymentContent() {
  const searchParams = useSearchParams()

  // Mock data - in real app, this would come from the registration
  const mockData = {
    amount: 5000,
    teamName: "Mumbai Warriors",
    category: "Open",
    registrationId: `REG-${Date.now()}`,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Payment Required
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Complete Your Registration</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your team registration is almost complete. Please make the payment to secure your spot in the tournament.
        </p>
      </div>

      <RazorpayPayment {...mockData} />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentContent />
        </Suspense>
        <Footer />
      </div>
    </AuthGuard>
  )
}
