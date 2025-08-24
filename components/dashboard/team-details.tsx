import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Users, Calendar } from "lucide-react"

interface TeamDetailsProps {
  teamDetails: {
    name: string
    captain: string
    players: number
    registrationDate: string
    status: string
  }
}

export function TeamDetails({ teamDetails }: TeamDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{teamDetails.name}</CardTitle>
            <CardDescription>Team Registration Details</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Captain</label>
              <p className="text-sm font-medium">{teamDetails.captain}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Team Status</label>
              <div>
                <Badge variant="secondary">{teamDetails.status}</Badge>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Players</label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">{teamDetails.players} players</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">{teamDetails.registrationDate}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Team Status:</span>
            <Badge variant="outline">{teamDetails.status}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
