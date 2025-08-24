"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Profile } from "@/lib/auth-context"
import { Camera, Edit } from "lucide-react"

interface UserProfileDetailsProps {
  profile: Profile
}

export function UserProfileDetails({ profile }: UserProfileDetailsProps) {
  const getPhotoUrl = (userId: string) => {
    return `/api/photos/${userId}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not provided"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={profile.photo_data ? getPhotoUrl(profile.id) : "/placeholder-user.jpg"} 
                  alt={profile.full_name}
                />
                <AvatarFallback className="text-2xl">
                  {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
          <CardDescription>{profile.email}</CardDescription>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="secondary">{profile.player_type || "Player"}</Badge>
            {profile.team_name && <Badge>{profile.team_name}</Badge>}
          </div>
        </CardHeader>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📞</span>
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="font-medium">{profile.phone || "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>👤</span>
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p className="font-medium">{profile.full_name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="font-medium">{profile.age || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{formatDate(profile.date_of_birth)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="font-medium">{profile.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nationality</p>
              <p className="font-medium">{profile.nationality}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aadhar ID</p>
              <p className="font-medium">{profile.aadhar_id || "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📍</span>
            Address Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
          <p className="font-medium">{profile.address || "Not provided"}</p>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏏</span>
            Cricket Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Player Type</p>
              <p className="font-medium">{profile.player_type || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Team Name</p>
              <p className="font-medium">{profile.team_name || "Not assigned"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔐</span>
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">User ID</p>
              <p className="font-mono text-sm">{profile.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
              <p className="font-medium">
                {new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(profile.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <Button className="flex-1" variant="outline">
          <Camera className="h-4 w-4 mr-2" />
          Change Photo
        </Button>
      </div>
    </div>
  )
}
