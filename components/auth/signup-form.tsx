"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Mail, UserPlus, AlertCircle, CheckCircle, Upload, X } from "lucide-react"

interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phone: string
  address: string
  age: number
  dateOfBirth: string
  gender: string
  nationality: string
  teamName: string
  aadharId: string
  playerType: string
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
    age: 0,
    dateOfBirth: "",
    gender: "Male",
    nationality: "Indian",
    teamName: "",
    aadharId: "",
    playerType: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const { signup } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError("")
    setSuccess("")
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG, and WebP images are allowed.')
        return
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        setError('File size too large. Maximum size is 5MB.')
        return
      }

      setPhotoFile(file)
      setError("")

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setLoading(true)

    try {
      let photoData = null
      let photoMimeType = null

      // Convert photo to base64 if provided
      if (photoFile) {
        try {
          photoData = await convertFileToBase64(photoFile)
          photoMimeType = photoFile.type
        } catch (error) {
          console.error('Error converting photo:', error)
          setError('Error processing photo. Please try again.')
          setLoading(false)
          return
        }
      }

      const result = await signup(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone,
        formData.address,
        formData.age,
        formData.dateOfBirth,
        formData.gender,
        formData.nationality,
        formData.teamName,
        formData.aadharId,
        formData.playerType,
        photoData,
        photoMimeType
      )

      if (result.success) {
        setSuccess("Registration successful! Redirecting to dashboard...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
        <CardDescription>
          Join the cricket tournament and showcase your skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label htmlFor="photo">Profile Photo (Optional)</Label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo')?.click()}
                  className="w-full"
                >
                  {photoFile ? 'Change Photo' : 'Upload Photo'}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG, WebP up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="16"
                max="50"
                placeholder="Age"
                value={formData.age || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                name="nationality"
                type="text"
                placeholder="Nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                name="teamName"
                type="text"
                placeholder="Enter your team name"
                value={formData.teamName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadharId">Aadhar ID</Label>
              <Input
                id="aadharId"
                name="aadharId"
                type="text"
                placeholder="Enter your Aadhar ID"
                value={formData.aadharId}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="playerType">Player Type</Label>
            <select
              id="playerType"
              name="playerType"
              value={formData.playerType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Select player type</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Wicket-keeper">Wicket-keeper</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
