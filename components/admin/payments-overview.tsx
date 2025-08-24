import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Download, RefreshCw } from "lucide-react"

interface Payment {
  id: string
  teamName: string
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  paymentId?: string
  paymentDate: string
  category: string
}

interface PaymentsOverviewProps {
  payments: Payment[]
}

export function PaymentsOverview({ payments }: PaymentsOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Overview
            </CardTitle>
            <CardDescription>Track all registration payments and revenue</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-900">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800">Pending Payments</h3>
            <p className="text-2xl font-bold text-yellow-900">₹{pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800">Total Transactions</h3>
            <p className="text-2xl font-bold text-blue-900">{payments.length}</p>
          </div>
        </div>

        {/* Recent Payments */}
        <div>
          <h3 className="font-semibold mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.teamName}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.category} • {payment.paymentDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">₹{payment.amount.toLocaleString()}</span>
                  <Badge className={getStatusColor(payment.status)} variant="secondary">
                    {payment.status}
                  </Badge>
                  {payment.status === "failed" && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
