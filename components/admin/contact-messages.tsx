"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageSquare, Mail, Reply } from "lucide-react"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: string
}

interface ContactMessagesProps {
  messages: ContactMessage[]
}

export function ContactMessages({ messages }: ContactMessagesProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyText, setReplyText] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReply = () => {
    // Mock reply functionality
    console.log("Replying to:", selectedMessage?.email, "with:", replyText)
    setReplyText("")
    setSelectedMessage(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Contact Messages
        </CardTitle>
        <CardDescription>Manage inquiries and support requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium truncate">{message.name}</p>
                    <Badge className={getStatusColor(message.status)} variant="secondary">
                      {message.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {message.email} • {message.createdAt}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedMessage(message)}>
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Contact Message</DialogTitle>
                    <DialogDescription>
                      From {message.name} ({message.email}) • {message.createdAt}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Subject: {message.subject}</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Reply</h4>
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleReply} disabled={!replyText.trim()}>
                        <Reply className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                      <Button variant="outline">Mark as Read</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact messages yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
