"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we verify your authentication</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to access this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => router.push("/login")} className="w-full">
              Sign In
            </Button>
            <Button variant="outline" onClick={() => router.push("/signup")} className="w-full">
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
