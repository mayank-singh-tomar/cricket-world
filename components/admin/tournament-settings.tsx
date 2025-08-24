"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Save, Calendar } from "lucide-react"

export function TournamentSettings() {
  const [settings, setSettings] = useState({
    tournamentName: "All-Star Cricket Tournament 2024",
    registrationDeadline: "2024-03-15",
    tournamentStartDate: "2024-03-20",
    tournamentEndDate: "2024-03-25",
    maxTeams: 16,
    registrationOpen: true,
    openCategoryFee: 5000,
    corporateCategoryFee: 4000,
    youthCategoryFee: 3000,
    venue: "Sports Complex Ground, Andheri East, Mumbai",
    contactEmail: "info@allstarcricket.com",
    contactPhone: "+91 98765 43210",
    tournamentRules:
      "Standard T20 format with 20 overs per side. Powerplay for first 6 overs. Maximum 4 overs per bowler.",
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Mock save functionality
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (field: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Tournament Settings
        </CardTitle>
        <CardDescription>Configure tournament parameters and settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {saved && (
          <Alert>
            <AlertDescription>Settings have been saved successfully!</AlertDescription>
          </Alert>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tournamentName">Tournament Name</Label>
              <Input
                id="tournamentName"
                value={settings.tournamentName}
                onChange={(e) => handleChange("tournamentName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTeams">Maximum Teams</Label>
              <Input
                id="maxTeams"
                type="number"
                value={settings.maxTeams}
                onChange={(e) => handleChange("maxTeams", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Important Dates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationDeadline">Registration Deadline</Label>
              <Input
                id="registrationDeadline"
                type="date"
                value={settings.registrationDeadline}
                onChange={(e) => handleChange("registrationDeadline", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tournamentStartDate">Tournament Start</Label>
              <Input
                id="tournamentStartDate"
                type="date"
                value={settings.tournamentStartDate}
                onChange={(e) => handleChange("tournamentStartDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tournamentEndDate">Tournament End</Label>
              <Input
                id="tournamentEndDate"
                type="date"
                value={settings.tournamentEndDate}
                onChange={(e) => handleChange("tournamentEndDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Registration Fees */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Registration Fees</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="openCategoryFee">Open Category (₹)</Label>
              <Input
                id="openCategoryFee"
                type="number"
                value={settings.openCategoryFee}
                onChange={(e) => handleChange("openCategoryFee", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateCategoryFee">Corporate Category (₹)</Label>
              <Input
                id="corporateCategoryFee"
                type="number"
                value={settings.corporateCategoryFee}
                onChange={(e) => handleChange("corporateCategoryFee", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youthCategoryFee">Youth Category (₹)</Label>
              <Input
                id="youthCategoryFee"
                type="number"
                value={settings.youthCategoryFee}
                onChange={(e) => handleChange("youthCategoryFee", Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" value={settings.venue} onChange={(e) => handleChange("venue", e.target.value)} />
          </div>
        </div>

        {/* Tournament Rules */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Tournament Rules</h3>
          <div className="space-y-2">
            <Label htmlFor="tournamentRules">Rules and Regulations</Label>
            <Textarea
              id="tournamentRules"
              rows={4}
              value={settings.tournamentRules}
              onChange={(e) => handleChange("tournamentRules", e.target.value)}
            />
          </div>
        </div>

        {/* Registration Status */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Registration Status</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="registrationOpen"
              checked={settings.registrationOpen}
              onCheckedChange={(checked) => handleChange("registrationOpen", checked)}
            />
            <Label htmlFor="registrationOpen">Registration Open</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Toggle this to open or close team registrations for the tournament.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
