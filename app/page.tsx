"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { tournamentConfig } from "@/lib/tournament-config"
import { SignupModal } from "@/components/auth/signup-modal"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/cricket-stadium-aerial.png')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-secondary/20" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4 animate-bounce-gentle">
            🏏 Registration Open
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-sans text-foreground mb-6 animate-fade-in-up">
            {tournamentConfig.name}
            <span className="text-primary block animate-slide-in-left">Tournament {tournamentConfig.year}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Join the ultimate cricket tournament experience. Compete with the best teams, win amazing prizes, and create
            unforgettable memories on the field.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <SignupModal>
              <Button size="lg" className="hover-lift">
                Register Your Team
              </Button>
            </SignupModal>
            <Button size="lg" variant="outline" className="hover-lift bg-transparent" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Tournament Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience professional-level cricket with top-notch facilities and exciting competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift animate-scale-in">
              <CardHeader>
                <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="/golden-cricket-trophy.png" alt="Prize Trophy" className="w-12 h-12 object-cover" />
                </div>
                <CardTitle className="font-sans">₹{tournamentConfig.prizePool.toLocaleString()} Prize Pool</CardTitle>
                <CardDescription>Attractive cash prizes for winners and runners-up</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover-lift animate-scale-in">
              <CardHeader>
                <div className="relative w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="/cricket-ball-motion.png" alt="T20 Format" className="w-12 h-12 object-cover" />
                </div>
                <CardTitle className="font-sans">{tournamentConfig.format}</CardTitle>
                <CardDescription>Fast-paced, exciting cricket matches</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover-lift animate-scale-in">
              <CardHeader>
                <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img src="/modern-cricket-stadium.png" alt="Professional Venue" className="w-12 h-12 object-cover" />
                </div>
                <CardTitle className="font-sans">Professional Venue</CardTitle>
                <CardDescription>Top-quality cricket ground with all facilities</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{
            backgroundImage: `url('/cricket-victory-celebration.png')`,
          }}
        />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold font-sans text-foreground mb-4">Easy Registration Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get your team registered in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Create Account",
                desc: "Sign up with your team details",
                image: "/user-registration-cricket-helmet.png",
              },
              {
                step: "2",
                title: "Add Players",
                desc: `Register your team members (${tournamentConfig.teamRequirements.minPlayers}-${tournamentConfig.teamRequirements.maxPlayers} players)`,
                image: "/placeholder-36joc.png",
              },
              {
                step: "3",
                title: "Make Payment",
                desc: `Secure online payment (₹${tournamentConfig.registrationFee.toLocaleString()})`,
                image: "/secure-cricket-payment.png",
              },
              {
                step: "4",
                title: "You're In!",
                desc: "Receive confirmation & updates",
                image: "/cricket-match-confirmation.png",
              },
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up hover-scale">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-semibold font-sans text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('/placeholder-9jl1k.png')`,
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-sans mb-4 animate-fade-in-up">Ready to Join the Action?</h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up">
            Don't miss out on the cricket tournament of the year. Register your team today!
          </p>
          <SignupModal>
            <Button size="lg" variant="secondary" className="hover-lift animate-scale-in">
              Register Now
            </Button>
          </SignupModal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
