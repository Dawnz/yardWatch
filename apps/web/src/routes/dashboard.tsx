import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Outlet />
    </div>
  )
}
