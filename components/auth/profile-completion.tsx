"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface ProfileData {
  fullName: string
  phone: string
  address: string
  age: string
  aadharId: string
  playerType: string
}

export function ProfileCompletion() {
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "",
    phone: "",
    address: "",
    age: "",
    aadharId: "",
    playerType: "",
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { profile, refreshProfile } = useAuth()

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!formData.fullName) {
      setError("Full name is required")
      return false
    }

    if (formData.age && (parseInt(formData.age) < 16 || parseInt(formData.age) > 50)) {
      setError("Age must be between 16 and 50")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      // Upload photo if provided
      if (photoFile) {
        const photoFormData = new FormData()
        photoFormData.append('photo', photoFile)

        const uploadResponse = await fetch('/api/upload/photo', {
          method: 'POST',
          body: photoFormData,
        })

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || 'Failed to upload photo')
        }
        console.log('Photo uploaded successfully to database')
      }

      // Update profile
      const updateResponse = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          age: parseInt(formData.age) || null,
          aadharId: formData.aadharId,
          playerType: formData.playerType,
        }),
      })

      if (updateResponse.ok) {
        await refreshProfile()
        router.push("/dashboard")
      } else {
        const errorData = await updateResponse.json()
        setError(errorData.error || "Failed to update profile")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Please provide your complete information to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Photo Upload */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage 
                src={photoPreview || (profile?.id ? `/api/photos/${profile.id}` : "")} 
              />
              <AvatarFallback>
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              {photoFile && (
                <span className="text-sm text-muted-foreground">
                  {photoFile.name}
                </span>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="16"
                max="50"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="playerType">Player Type</Label>
              <Select
                value={formData.playerType}
                onValueChange={(value) => handleInputChange("playerType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your player type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Batsman">Batsman</SelectItem>
                  <SelectItem value="Bowler">Bowler</SelectItem>
                  <SelectItem value="All-rounder">All-rounder</SelectItem>
                  <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your complete address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadharId">Aadhar ID</Label>
            <Input
              id="aadharId"
              placeholder="12-digit Aadhar number"
              value={formData.aadharId}
              onChange={(e) => handleInputChange("aadharId", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating Profile..." : "Complete Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
