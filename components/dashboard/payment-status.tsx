import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface PaymentStatusProps {
  payment: {
    status: "pending" | "completed" | "failed"
    amount: number
    paymentId?: string
    orderId?: string
    paymentDate?: string
    category: string
  }
}

export function PaymentStatus({ payment }: PaymentStatusProps) {
  const getStatusIcon = () => {
    switch (payment.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <CreditCard className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = () => {
    switch (payment.status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusMessage = () => {
    switch (payment.status) {
      case "completed":
        return "Your registration fee has been successfully paid."
      case "failed":
        return "Payment failed. Please try again to complete your registration."
      default:
        return "Payment is pending. Complete payment to secure your team's spot."
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Payment Status
        </CardTitle>
        <CardDescription>Registration fee and payment details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge className={getStatusColor()} variant="secondary">
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Amount:</span>
          <span className="font-semibold text-lg">₹{payment.amount.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Category:</span>
          <span className="font-medium">{payment.category}</span>
        </div>

        {payment.paymentId && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment ID:</span>
            <span className="font-mono text-sm">{payment.paymentId}</span>
          </div>
        )}

        {payment.paymentDate && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment Date:</span>
            <span className="text-sm">{payment.paymentDate}</span>
          </div>
        )}

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
        </div>

        <div className="flex gap-2">
          {payment.status === "pending" && (
            <Button asChild className="flex-1">
              <Link href="/payment">Complete Payment</Link>
            </Button>
          )}
          {payment.status === "failed" && (
            <Button asChild className="flex-1">
              <Link href="/payment">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Payment
              </Link>
            </Button>
          )}
          {payment.status === "completed" && (
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
