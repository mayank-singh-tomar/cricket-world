"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

interface Team {
  id: string
  name: string
  captain: string
  email: string
  phone: string
  city: string
  category: string
  playersCount: number
  registrationStatus: "pending" | "confirmed" | "rejected"
  paymentStatus: "pending" | "completed" | "failed"
  registrationDate: string
}

interface TeamsTableProps {
  teams: Team[]
}

export function TeamsTable({ teams }: TeamsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTeams, setFilteredTeams] = useState(teams)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = teams.filter(
      (team) =>
        team.name.toLowerCase().includes(term.toLowerCase()) ||
        team.captain.toLowerCase().includes(term.toLowerCase()) ||
        team.city.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredTeams(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Registrations</CardTitle>
            <CardDescription>Manage all team registrations and their status</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Captain</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{team.captain}</p>
                      <p className="text-sm text-muted-foreground">{team.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{team.city}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{team.category}</Badge>
                  </TableCell>
                  <TableCell>{team.playersCount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(team.registrationStatus)} variant="secondary">
                      {team.registrationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(team.paymentStatus)} variant="secondary">
                      {team.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{team.registrationDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredTeams.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No teams found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
