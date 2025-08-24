export interface TournamentConfig {
  name: string
  year: string
  registrationDeadline: string
  tournamentDates: string
  format: string
  maxTeams: number
  registrationFee: number
  prizePool: number
  prizes: {
    winner: number
    runnerUp: number
    bestPlayer: number
    bestBowler: number
  }
  venue: {
    name: string
    address: string
    city: string
    state: string
    pincode: string
  }
  contact: {
    phone: string
    email: string
    whatsapp: string
  }
  officeHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  teamRequirements: {
    minPlayers: number
    maxPlayers: number
    minAge: number
    maxAge: number
  }
  facilities: string[]
  rules: {
    teamRequirements: string[]
    matchRules: string[]
  }
}

export const tournamentConfig: TournamentConfig = {
  name: "All-Star Cricket",
  year: "2024",
  registrationDeadline: "March 15, 2024",
  tournamentDates: "March 20-25, 2024",
  format: "T20 (20 overs per side)",
  maxTeams: 16,
  registrationFee: 5000,
  prizePool: 50000,
  prizes: {
    winner: 25000,
    runnerUp: 15000,
    bestPlayer: 5000,
    bestBowler: 5000,
  },
  venue: {
    name: "Sports Complex Ground",
    address: "Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400069",
  },
  contact: {
    phone: "+91 98765 43210",
    email: "info@allstarcricket.com",
    whatsapp: "+91 98765 43210",
  },
  officeHours: {
    weekdays: "9:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  teamRequirements: {
    minPlayers: 11,
    maxPlayers: 15,
    minAge: 16,
    maxAge: 50,
  },
  facilities: [
    "Professional turf wicket",
    "Floodlights for day-night matches",
    "Changing rooms and shower facilities",
    "Refreshment stalls",
    "Parking facilities",
    "First aid medical support",
  ],
  rules: {
    teamRequirements: [
      "Minimum 11 players, maximum 15 players per team",
      "All players must be between 16-50 years of age",
      "Valid ID proof required for all players",
      "Team captain must be present during registration",
    ],
    matchRules: [
      "T20 format - 20 overs per side",
      "Powerplay: First 6 overs",
      "Maximum 4 overs per bowler",
      "DRS not available",
    ],
  },
}

export const getFormattedAddress = () => {
  const { venue } = tournamentConfig
  return `${venue.name}\n${venue.address}, ${venue.city} - ${venue.pincode}\n${venue.state}, India`
}

export const getFormattedContactInfo = () => {
  const { contact } = tournamentConfig
  return {
    phone: contact.phone,
    email: contact.email,
    whatsapp: contact.whatsapp,
  }
}

export const getFormattedOfficeHours = () => {
  const { officeHours } = tournamentConfig
  return [
    { day: "Monday - Friday", hours: officeHours.weekdays },
    { day: "Saturday", hours: officeHours.saturday },
    { day: "Sunday", hours: officeHours.sunday },
  ]
}


