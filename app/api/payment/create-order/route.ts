import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, registrationId, teamName, category } = await request.json()

    // Validate input
    if (!amount || !registrationId || !teamName || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock Razorpay order creation
    // In real implementation, you would use:
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    // const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: registrationId })

    const mockOrder = {
      id: `order_${Date.now()}`,
      amount,
      currency: "INR",
      receipt: registrationId,
      status: "created",
    }

    // In real app, save order details to database
    console.log("Created payment order:", mockOrder)

    return NextResponse.json({
      orderId: mockOrder.id,
      amount: mockOrder.amount,
      currency: mockOrder.currency,
    })
  } catch (error) {
    console.error("Payment order creation failed:", error)
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
