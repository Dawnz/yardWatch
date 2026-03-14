import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="h-screen overflow-hidden bg-[#0C0C0C]">
      <Outlet />
    </div>
  )
}
