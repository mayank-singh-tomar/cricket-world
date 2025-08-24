import { DatabaseTest } from "@/components/debug/database-test"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Database Debug</h1>
          <p className="text-muted-foreground">
            Test database connection and troubleshoot issues
          </p>
        </div>
        
        <DatabaseTest />
      </div>
      
      <Footer />
    </div>
  )
}

