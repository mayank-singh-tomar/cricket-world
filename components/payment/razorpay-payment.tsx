"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock } from "lucide-react"

interface PaymentProps {
  amount: number
  teamName: string
  category: string
  registrationId: string
}

export function RazorpayPayment({ amount, teamName, category, registrationId }: PaymentProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handlePayment = async () => {
    setLoading(true)
    setError("")

    try {
      // Create order on backend
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          registrationId,
          teamName,
          category,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create payment order")
      }

      // Mock Razorpay integration - in real app, this would use actual Razorpay
      const options = {
        key: "rzp_test_mock_key", // Mock key
        amount: amount * 100,
        currency: "INR",
        name: "All-Star Cricket Tournament",
        description: `Registration fee for ${teamName}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationId,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyResponse.ok) {
            router.push(`/payment/success?id=${registrationId}`)
          } else {
            router.push(`/payment/failed?id=${registrationId}`)
          }
        },
        prefill: {
          name: teamName,
          email: "team@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0891b2",
        },
      }

      // Mock payment success for demo
      setTimeout(() => {
        router.push(`/payment/success?id=${registrationId}`)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Summary
          </CardTitle>
          <CardDescription>Complete your tournament registration payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Team Name:</span>
            <span className="font-medium">{teamName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Category:</span>
            <Badge variant="secondary">{category}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Registration ID:</span>
            <span className="font-mono text-sm">{registrationId}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-primary">₹{amount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Razorpay Secured</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Accepted Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl mb-2">💳</div>
              <span className="text-sm">Credit Card</span>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl mb-2">💳</div>
              <span className="text-sm">Debit Card</span>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl mb-2">🏦</div>
              <span className="text-sm">Net Banking</span>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <span className="text-sm">UPI</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Button */}
      <div className="text-center">
        <Button size="lg" onClick={handlePayment} disabled={loading} className="w-full md:w-auto px-12">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing Payment...
            </div>
          ) : (
            `Pay ₹${amount.toLocaleString()}`
          )}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          <Clock className="w-4 h-4 inline mr-1" />
          Payment will be processed securely through Razorpay
        </p>
      </div>
    </div>
  )
}
