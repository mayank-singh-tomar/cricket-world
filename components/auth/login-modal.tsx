"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Mail, UserPlus, AlertCircle, CheckCircle, X } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [emailExists, setEmailExists] = useState<boolean | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: "", password: "" })
      setError("")
      setSuccess("")
      setEmailExists(null)
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError("")
    setSuccess("")
    setEmailExists(null)
  }

  // Check email when user stops typing
  useEffect(() => {
    const checkEmail = async () => {
      if (!formData.email || formData.email.length < 3) {
        setEmailExists(null)
        return
      }

      setCheckingEmail(true)
      try {
        const response = await fetch('/api/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        })

        if (response.ok) {
          const data = await response.json()
          setEmailExists(data.exists)
          
          if (data.exists) {
            setSuccess("Email found! You can proceed with login.")
          } else {
            setError("Email not found. Please create a new account.")
          }
        }
      } catch (error) {
        console.error('Error checking email:', error)
      } finally {
        setCheckingEmail(false)
      }
    }

    const timeoutId = setTimeout(checkEmail, 1000) // Wait 1 second after user stops typing
    return () => clearTimeout(timeoutId)
  }, [formData.email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    // Check if email exists before attempting login
    if (emailExists === false) {
      setError("Email not found. Please create a new account.")
      return
    }

    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        setSuccess("Login successful! Redirecting to dashboard...")
        setTimeout(() => {
          onClose()
          router.push("/dashboard")
        }, 1500)
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ email: "", password: "" })
    setError("")
    setSuccess("")
    setEmailExists(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            Welcome Back
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Sign in to your account to continue
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={emailExists === true ? "border-green-500" : emailExists === false ? "border-red-500" : ""}
              />
              {checkingEmail && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
              {emailExists === true && !checkingEmail && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
              {emailExists === false && !checkingEmail && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            {emailExists === false && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <UserPlus className="h-3 w-3" />
                New user? <Link href="/signup" className="underline font-medium">Create account</Link>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={emailExists === false}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || checkingEmail || emailExists === false}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


