"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"

import { useAuth } from "@/lib/auth-context"

interface Player {
  id: string
  name: string
  age: string
  position: string
  experienceYears: string
}

interface TeamData {
  name: string
  captainName: string
  contactEmail: string
  contactPhone: string
  city: string
  state: string
  category: string
}

export function TeamRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  const [teamData, setTeamData] = useState<TeamData>({
    name: "",
    captainName: "",
    contactEmail: "",
    contactPhone: "",
    city: "",
    state: "",
    category: "",
  })

  const [players, setPlayers] = useState<Player[]>([{ id: "1", name: "", age: "", position: "", experienceYears: "" }])

  const handleTeamDataChange = (field: keyof TeamData, value: string) => {
    setTeamData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlayerChange = (id: string, field: keyof Omit<Player, "id">, value: string) => {
    setPlayers((prev) => prev.map((player) => (player.id === id ? { ...player, [field]: value } : player)))
  }

  const addPlayer = () => {
    if (players.length < 15) {
      setPlayers((prev) => [
        ...prev,
        { id: Date.now().toString(), name: "", age: "", position: "", experienceYears: "" },
      ])
    }
  }

  const removePlayer = (id: string) => {
    if (players.length > 1) {
      setPlayers((prev) => prev.filter((player) => player.id !== id))
    }
  }

  const validateStep1 = () => {
    const { name, captainName, contactEmail, contactPhone, city, state, category } = teamData
    return name && captainName && contactEmail && contactPhone && city && state && category
  }

  const validateStep2 = () => {
    if (players.length < 11) return false
    return players.every((player) => player.name && player.age && Number(player.age) >= 16 && Number(player.age) <= 50)
  }

  const handleNext = () => {
    setError("")
    if (currentStep === 1 && !validateStep1()) {
      setError("Please fill in all team details")
      return
    }
    if (currentStep === 2 && !validateStep2()) {
      setError("Please ensure you have at least 11 players with valid details (age 16-50)")
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be logged in to register a team")
      return
    }

    setLoading(true)
    setError("")

    try {
      // 1. Create team
      const teamResponse = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: teamData.name,
          contactEmail: teamData.contactEmail,
          contactPhone: teamData.contactPhone,
          city: teamData.city,
          state: teamData.state,
        }),
      })

      if (!teamResponse.ok) {
        const errorData = await teamResponse.json()
        throw new Error(errorData.error || 'Failed to create team')
      }

      const teamResult = await teamResponse.json()
      const createdTeam = teamResult.team

      // 2. Create players
      const playersResponse = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: createdTeam.id,
          players: players.map(player => ({
            name: player.name,
            age: player.age,
            position: player.position,
            experienceYears: player.experienceYears,
          })),
        }),
      })

      if (!playersResponse.ok) {
        const errorData = await playersResponse.json()
        throw new Error(errorData.error || 'Failed to create players')
      }

      // 3. Create registration
      const registrationResponse = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: createdTeam.id,
          tournamentCategory: teamData.category,
        }),
      })

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json()
        throw new Error(errorData.error || 'Failed to create registration')
      }

      // Redirect to payment page
      router.push("/registration/payment")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Team Details", description: "Basic team information" },
    { number: 2, title: "Player Details", description: "Add your team players" },
    { number: 3, title: "Review & Submit", description: "Confirm your registration" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <div className="ml-3">
                <p
                  className={`font-medium ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Step 1: Team Details */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
            <CardDescription>Enter your team's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  value={teamData.name}
                  onChange={(e) => handleTeamDataChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="captainName">Captain Name *</Label>
                <Input
                  id="captainName"
                  placeholder="Enter captain's full name"
                  value={teamData.captainName}
                  onChange={(e) => handleTeamDataChange("captainName", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="team@example.com"
                  value={teamData.contactEmail}
                  onChange={(e) => handleTeamDataChange("contactEmail", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={teamData.contactPhone}
                  onChange={(e) => handleTeamDataChange("contactPhone", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  value={teamData.city}
                  onChange={(e) => handleTeamDataChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  value={teamData.state}
                  onChange={(e) => handleTeamDataChange("state", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Tournament Category *</Label>
              <Select value={teamData.category} onValueChange={(value) => handleTeamDataChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tournament category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open (₹5,000)</SelectItem>
                  <SelectItem value="Corporate">Corporate (₹4,000)</SelectItem>
                  <SelectItem value="Youth">Youth Under-25 (₹3,000)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Player Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Player Details
              <Badge variant="secondary">{players.length}/15 players</Badge>
            </CardTitle>
            <CardDescription>Add your team players (minimum 11, maximum 15)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {players.map((player, index) => (
              <div key={player.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Player {index + 1}</h3>
                  {players.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removePlayer(player.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Player Name *</Label>
                    <Input
                      placeholder="Full name"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Age *</Label>
                    <Input
                      type="number"
                      min="16"
                      max="50"
                      placeholder="Age"
                      value={player.age}
                      onChange={(e) => handlePlayerChange(player.id, "age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select
                      value={player.position}
                      onValueChange={(value) => handlePlayerChange(player.id, "position", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Batsman">Batsman</SelectItem>
                        <SelectItem value="Bowler">Bowler</SelectItem>
                        <SelectItem value="All-rounder">All-rounder</SelectItem>
                        <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="30"
                      placeholder="Years"
                      value={player.experienceYears}
                      onChange={(e) => handlePlayerChange(player.id, "experienceYears", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {players.length < 15 && (
              <Button type="button" variant="outline" onClick={addPlayer} className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            )}

            {players.length < 11 && (
              <Alert>
                <AlertDescription>
                  You need at least 11 players to register. Currently you have {players.length} player(s).
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Submit */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Your Registration</CardTitle>
            <CardDescription>Please review all details before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Team Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Team Name:</span>
                  <span className="ml-2 font-medium">{teamData.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Captain:</span>
                  <span className="ml-2 font-medium">{teamData.captainName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2 font-medium">{teamData.contactEmail}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-2 font-medium">{teamData.contactPhone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <span className="ml-2 font-medium">
                    {teamData.city}, {teamData.state}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2 font-medium">{teamData.category}</span>
                </div>
              </div>
            </div>

            {/* Players Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Players ({players.length})</h3>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between text-sm border-b pb-2">
                    <span className="font-medium">
                      {index + 1}. {player.name}
                    </span>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>Age: {player.age}</span>
                      {player.position && <span>{player.position}</span>}
                      {player.experienceYears && <span>{player.experienceYears} yrs exp</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Registration Fee */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Registration Fee:</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{teamData.category === "Open" ? "5,000" : teamData.category === "Corporate" ? "4,000" : "3,000"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Payment will be processed securely through Razorpay</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
        )}
      </div>
    </div>
  )
}
