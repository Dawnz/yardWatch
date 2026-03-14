import { Outlet, Link, createRoute } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"

// Correct: component is a function, not JSX
export const dashboardRoute = createRoute({
  path: "/dashboard",
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm text-muted-foreground">YardWatch</p>
            <h1 className="text-xl font-semibold">Disaster Assessment Platform</h1>
          </div>
          <nav>
            <Button variant="outline">
              <Link to="/dashboard">Operations</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}
