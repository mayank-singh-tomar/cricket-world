import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationId } = await request.json()

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock payment verification
    // In real implementation, you would verify the signature:
    // const crypto = require('crypto')
    // const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(razorpay_order_id + '|' + razorpay_payment_id)
    //   .digest('hex')
    // const isSignatureValid = expectedSignature === razorpay_signature

    const isSignatureValid = true // Mock verification

    if (isSignatureValid) {
      // In real app, update registration status in database
      console.log("Payment verified successfully:", {
        registrationId,
        razorpay_payment_id,
        razorpay_order_id,
      })

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
      })
    } else {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification failed:", error)
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
