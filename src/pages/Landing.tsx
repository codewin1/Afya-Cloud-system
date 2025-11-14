import { Link } from "react-router-dom";
import { Activity, Cloud, Shield, Users, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AfyaCloud</span>
          </div>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-primary py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary-foreground">
                <Heart className="mr-2 h-4 w-4" />
                Supporting UN SDG 3: Good Health and Well-being
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
                Cloud-Based Healthcare Data Management for Kenya
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
                Secure, reliable, and accessible patient records across all counties. 
                Empowering healthcare workers with real-time data synchronization.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg">
                  Access Platform
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Healthcare Solutions</h2>
              <p className="text-muted-foreground text-lg">
                Built for healthcare workers, designed for patient care excellence
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <Cloud className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Cloud Sync & Backup</h3>
                <p className="text-muted-foreground">
                  Automatic data synchronization and secure cloud backup ensure your patient 
                  records are always accessible and protected.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Shield className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Secure & Compliant</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with role-based access control. HIPAA-compliant 
                  data handling and encryption.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Users className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Multi-County Access</h3>
                <p className="text-muted-foreground">
                  Seamless data access across all Kenyan counties. Support for multiple 
                  healthcare facilities and staff management.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Activity className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Patient Management</h3>
                <p className="text-muted-foreground">
                  Complete CRUD functionality for patient records. Quick registration, 
                  updates, and comprehensive health history tracking.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <TrendingUp className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Real-time insights with visual charts and trends. Monitor patient 
                  distribution, health statistics, and operational metrics.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Heart className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">SDG 3 Aligned</h3>
                <p className="text-muted-foreground">
                  Contributing to universal health coverage and improved healthcare access 
                  across Kenya's communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted py-20">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Transform Healthcare?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join healthcare facilities across Kenya using AfyaCloud
            </p>
            <Link to="/auth">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 AfyaCloud. Supporting UN SDG 3 for better healthcare in Kenya.</p>
        </div>
      </footer>
    </div>
  );
}
