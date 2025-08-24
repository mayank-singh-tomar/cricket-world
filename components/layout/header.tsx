"use client"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LoginModal } from "@/components/auth/login-modal"
import { SignupModal } from "@/components/auth/signup-modal"
import { tournamentConfig } from "@/lib/tournament-config"

export function Header() {
  const { user, profile, logout } = useAuth()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push("/")
    }
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🏏</span>
              </div>
              <span className="font-bold text-xl text-foreground">{tournamentConfig.name}</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              {user && (
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {profile?.full_name || user.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={openLoginModal}>
                    Login
                  </Button>
                  <SignupModal>
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </SignupModal>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  )
}
