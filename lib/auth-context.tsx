"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string
  phone: string
  address: string
  age: number
  date_of_birth: string | null
  gender: string
  nationality: string
  team_name: string | null
  aadhar_id: string
  player_type: string
  photo_url: string | null
  photo_data: Buffer | null
  photo_mime_type: string | null
  email: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signup: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string,
    age: number,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    teamName: string,
    aadharId: string,
    playerType: string,
    photoData?: string | null,
    photoMimeType?: string | null
  ) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<{ success: boolean; error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setProfile(data.profile)
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    address: string,
    age: number,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    teamName: string,
    aadharId: string,
    playerType: string,
    photoData?: string | null,
    photoMimeType?: string | null
  ) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phone,
          address,
          age,
          dateOfBirth,
          gender,
          nationality,
          teamName,
          aadharId,
          playerType,
          photoData,
          photoMimeType,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setProfile(data.profile)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setProfile(data.profile)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setUser(null)
        setProfile(null)
        return { success: true }
      } else {
        return { success: false, error: 'Logout failed' }
      }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const refreshProfile = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setProfile(data.profile)
      }
    } catch (error) {
      console.error('Profile refresh failed:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signup,
    login,
    logout,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
