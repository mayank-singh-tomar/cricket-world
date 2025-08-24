import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🏏</span>
              </div>
              <span className="font-bold text-lg">All-Star Cricket</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The ultimate cricket tournament experience. Join teams from across the region for competitive cricket
              action.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary text-sm transition-colors">
                About Tournament
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tournament Info</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Registration Fee: ₹5,000</p>
              <p className="text-muted-foreground text-sm">Format: T20</p>
              <p className="text-muted-foreground text-sm">Teams: 16 max</p>
              <p className="text-muted-foreground text-sm">Prize Pool: ₹50,000</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">📧 info@allstarcricket.com</p>
              <p className="text-muted-foreground text-sm">📞 +91 98765 43210</p>
              <p className="text-muted-foreground text-sm">📍 Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2024 All-Star Cricket Tournament. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
