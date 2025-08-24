import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Edit, Plus, Loader2 } from "lucide-react"

interface Player {
  id: string
  name: string
  age: number
  position?: string
  player_type?: string
  experience?: number
  team?: string | null
  gender?: string
  nationality?: string
  photo_data?: Buffer | null
  photo_mime_type?: string | null
}

interface PlayersListProps {
  players: Player[]
  loading?: boolean
}

export function PlayersList({ players, loading = false }: PlayersListProps) {
  const getPositionColor = (position: string) => {
    const pos = position.toLowerCase()
    switch (pos) {
      case "batsman":
        return "bg-blue-100 text-blue-800"
      case "bowler":
        return "bg-green-100 text-green-800"
      case "all-rounder":
        return "bg-purple-100 text-purple-800"
      case "wicket-keeper":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Players
          </CardTitle>
          <CardDescription>Loading players...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Players ({players.length})
            </CardTitle>
            <CardDescription>Manage your team roster</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Players
            </Button>
            {players.length < 15 && (
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={player.photo_data ? `/api/photos/${player.id}` : undefined} 
                    alt={player.name} 
                  />
                  <AvatarFallback className="text-sm">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{player.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Age: {player.age}</span>
                    {player.gender && <span>• {player.gender}</span>}
                    {player.nationality && <span>• {player.nationality}</span>}
                  </div>
                  {player.team && (
                    <p className="text-xs text-blue-600 font-medium">{player.team}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(player.position || player.player_type) && (
                  <Badge className={getPositionColor(player.position || player.player_type || '')} variant="secondary">
                    {player.position || player.player_type}
                  </Badge>
                )}
                {player.experience && player.experience > 0 && (
                  <span className="text-xs text-muted-foreground">{player.experience} yrs</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {players.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No players found</p>
          </div>
        )}
        {players.length > 0 && players.length < 11 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ You need at least 11 players to complete registration. Currently you have {players.length} player(s).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
