"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { tournamentConfig } from "@/lib/tournament-config"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('/cricket-stadium-aerial.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/90 to-secondary/10" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-sans text-foreground mb-6">
            {tournamentConfig.name}
            <span className="text-primary block">Tournament</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We are passionate about cricket and committed to providing the best tournament experience for players and fans alike.
            Our mission is to promote the spirit of cricket and create opportunities for talented players to showcase their skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover-lift" asChild>
              <Link href="/signup">Register Your Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Tournament Details</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about the {tournamentConfig.name} Tournament {tournamentConfig.year}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Tournament Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Deadline:</span>
                  <span className="font-medium">{tournamentConfig.registrationDeadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tournament Dates:</span>
                  <span className="font-medium">{tournamentConfig.tournamentDates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium">{tournamentConfig.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teams:</span>
                  <span className="font-medium">Maximum {tournamentConfig.maxTeams} teams</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Fees & Prizes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Fee:</span>
                  <span className="font-medium">₹{tournamentConfig.registrationFee.toLocaleString()} per team</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Winner Prize:</span>
                  <span className="font-medium text-primary">₹{tournamentConfig.prizes.winner.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runner-up Prize:</span>
                  <span className="font-medium text-secondary">₹{tournamentConfig.prizes.runnerUp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Player Award:</span>
                  <span className="font-medium">₹{tournamentConfig.prizes.bestPlayer.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Rules & Regulations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Important guidelines for all participating teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans text-primary">Team Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tournamentConfig.rules.teamRequirements.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans text-secondary">Match Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tournamentConfig.rules.matchRules.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Venue Information</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tournament will be held at a professional cricket ground
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">Facilities Available</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tournamentConfig.facilities.map((facility, index) => (
                    <li key={index}>• {facility}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">Location Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Address:</strong>
                    <br />
                    {tournamentConfig.venue.name}
                    <br />
                    {tournamentConfig.venue.address}, {tournamentConfig.venue.city} - {tournamentConfig.venue.pincode}
                    <br />
                    {tournamentConfig.venue.state}, India
                  </p>
                  <p>
                    <strong>Contact:</strong>
                    <br />
                    Phone: {tournamentConfig.contact.phone}
                    <br />
                    Email: {tournamentConfig.contact.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-sans mb-4">Join Us Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of the most exciting cricket tournament in the region. Register your team now!
          </p>
          <Button size="lg" variant="secondary" className="hover-lift" asChild>
            <Link href="/signup">Register Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
