"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DatabaseTest() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const testDatabaseConnection = async () => {
    setLoading(true)
    setError("")
    setResults(null)

    try {
      // Test 1: Check if we can connect to the database
      console.log("Testing database connection...")
      const connectionResponse = await fetch('/api/auth/me')
      
      let authResult: any = { connected: false, error: null }
      if (connectionResponse.status === 401) {
        authResult = { connected: true, error: null, message: "Connected successfully (no auth token)" }
      } else if (connectionResponse.ok) {
        authResult = { connected: true, error: null, message: "Connected successfully" }
      } else {
        authResult = { connected: false, error: "Failed to connect" }
      }

      // Test 2: Check if users table exists by trying to create a test user
      console.log("Testing users table...")
      const testEmail = `test-${Date.now()}@example.com`
      const signupResponse = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'testpassword123',
          fullName: 'Test User',
          phone: '1234567890',
          address: 'Test Address',
          age: 25,
          aadharId: '123456789012',
          playerType: 'Batsman',
        }),
      })

      let usersResult: any = { success: false, error: null, data: null }
      if (signupResponse.ok) {
        const signupData = await signupResponse.json()
        usersResult = { success: true, error: null, data: signupData, message: "Successfully created test user and profile" }
      } else {
        const errorData = await signupResponse.json()
        usersResult = { success: false, error: errorData.error, data: null }
      }

      // Test 3: Test authentication
      console.log("Testing authentication...")
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: 'testpassword123'
        }),
      })

      let authTestResult: any = { success: false, error: null, data: null }
      if (loginResponse.ok) {
        const loginData = await loginResponse.json()
        authTestResult = { success: true, error: null, data: loginData, message: "Authentication system working" }
      } else {
        const errorData = await loginResponse.json()
        authTestResult = { success: false, error: errorData.error, data: null }
      }

      // Test 4: Test team creation
      console.log("Testing team creation...")
      const teamResponse = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Team',
          contactEmail: 'team@test.com',
          contactPhone: '1234567890',
          city: 'Test City',
          state: 'Test State',
        }),
      })

      let teamsResult: any = { success: false, error: null, data: null }
      if (teamResponse.ok) {
        const teamData = await teamResponse.json()
        teamsResult = { success: true, error: null, data: teamData, message: "Successfully created test team" }
      } else {
        const errorData = await teamResponse.json()
        teamsResult = { success: false, error: errorData.error, data: null }
      }

      // Test 5: Test contact messages
      console.log("Testing contact messages...")
      const messageResponse = await fetch('/api/admin/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Message',
          message: 'This is a test message',
        }),
      })

      let messagesResult: any = { success: false, error: null, data: null }
      if (messageResponse.ok) {
        const messageData = await messageResponse.json()
        messagesResult = { success: true, error: null, data: messageData, message: "Successfully created test message" }
      } else {
        const errorData = await messageResponse.json()
        messagesResult = { success: false, error: errorData.error, data: null }
      }

      setResults({
        connection: authResult,
        users: usersResult,
        authentication: authTestResult,
        teams: teamsResult,
        messages: messagesResult
      })

    } catch (err: any) {
      console.error("Database test error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Database Connection Test</CardTitle>
        <CardDescription>Test the local PostgreSQL database connection and table structure</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testDatabaseConnection} disabled={loading}>
          {loading ? "Testing..." : "Run Database Test"}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && (
          <div className="space-y-4">
            <h3 className="font-semibold">Test Results:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Database Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(results.connection, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Users & Profiles Tables</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(results.users, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(results.authentication, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Teams Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(results.teams, null, 2)}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Contact Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    {JSON.stringify(results.messages, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
