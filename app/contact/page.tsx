"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { tournamentConfig, getFormattedAddress, getFormattedContactInfo, getFormattedOfficeHours } from "@/lib/tournament-config"

export default function ContactPage() {
  const contactInfo = getFormattedContactInfo()
  const officeHours = getFormattedOfficeHours()

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
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-sans text-foreground mb-6">
            Contact
            <span className="text-primary block">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about the tournament? Need help with registration? We're here to help!
            Reach out to us and we'll get back to you as soon as possible.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder={contactInfo.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Tournament Registration Query" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your query..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {getFormattedAddress()}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <span className="text-2xl">📞</span>
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-muted-foreground">{contactInfo.whatsapp}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <span className="text-2xl">🕒</span>
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about the tournament
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">How do I register my team?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply click on "Register Your Team" and fill out the registration form with your team details.
                  You'll need to provide information for all team members and complete the payment process.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">What is the registration fee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The registration fee is ₹{tournamentConfig.registrationFee.toLocaleString()} per team. This includes participation in all matches,
                  team kit, and access to all tournament facilities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">How many players can be in a team?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Each team can have a minimum of {tournamentConfig.teamRequirements.minPlayers} players and a maximum of {tournamentConfig.teamRequirements.maxPlayers} players.
                  All players must be between {tournamentConfig.teamRequirements.minAge}-{tournamentConfig.teamRequirements.maxAge} years of age.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="font-sans">What are the prizes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The total prize pool is ₹{tournamentConfig.prizePool.toLocaleString()} with ₹{tournamentConfig.prizes.winner.toLocaleString()} for winners, ₹{tournamentConfig.prizes.runnerUp.toLocaleString()} for runners-up,
                  and ₹{tournamentConfig.prizes.bestPlayer.toLocaleString()} each for best player and best bowler awards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-sans mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait! Register your team today and be part of the most exciting cricket tournament.
          </p>
          <Button size="lg" variant="secondary" className="hover-lift" asChild>
            <Link href="/signup">Register Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
