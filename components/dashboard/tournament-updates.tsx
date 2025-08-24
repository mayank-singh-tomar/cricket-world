import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, FileText, Trophy } from "lucide-react"

interface Update {
  id: string
  title: string
  description: string
  date: string
  type: "announcement" | "schedule" | "document" | "result"
  isNew: boolean
}

export function TournamentUpdates() {
  const updates: Update[] = [
    {
      id: "1",
      title: "Tournament Schedule Released",
      description: "The complete match schedule has been published. Check your team's fixtures.",
      date: "2024-03-10",
      type: "schedule",
      isNew: true,
    },
    {
      id: "2",
      title: "Player Guidelines Updated",
      description: "New guidelines for player eligibility and documentation requirements.",
      date: "2024-03-08",
      type: "document",
      isNew: true,
    },
    {
      id: "3",
      title: "Venue Information",
      description: "Detailed venue information and directions have been shared.",
      date: "2024-03-05",
      type: "announcement",
      isNew: false,
    },
    {
      id: "4",
      title: "Registration Deadline Extended",
      description: "Registration deadline has been extended to March 15, 2024.",
      date: "2024-03-01",
      type: "announcement",
      isNew: false,
    },
  ]

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "schedule":
        return <Calendar className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      case "result":
        return <Trophy className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getUpdateColor = (type: string) => {
    switch (type) {
      case "schedule":
        return "bg-blue-100 text-blue-800"
      case "document":
        return "bg-green-100 text-green-800"
      case "result":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Tournament Updates
        </CardTitle>
        <CardDescription>Latest news and announcements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className={`p-2 rounded-full ${getUpdateColor(update.type)}`}>{getUpdateIcon(update.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{update.title}</h4>
                  {update.isNew && (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                <p className="text-xs text-muted-foreground">{update.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
