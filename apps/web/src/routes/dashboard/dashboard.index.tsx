import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/dashboard/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/apps/web/src/routes/dashboard/"!</div>
}
import { createRoute } from "@tanstack/react-router"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"

const incidents = [
  { id: "INC-1042", type: "Bridge Damage", severity: "High" },
  { id: "INC-1043", type: "Road Washout", severity: "Critical" },
  { id: "INC-1044", type: "Roof Collapse", severity: "Medium" },
]

// Page route: component must be a function
export const dashboardPageRoute = createRoute({
  path: "/",
  component: DashboardPage,
  getParentRoute: () => null
})

function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Heading */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Live Operations Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Monitor infrastructure damage and alerts.
          </p>
        </div>
        <Button>Refresh Feed</Button>
      </section>

      {/* Summary Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total Detections</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">126</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Critical Alerts</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">19</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Areas Monitored</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-semibold">8</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Model Status</CardTitle></CardHeader>
          <CardContent><Badge variant="secondary">Active</Badge></CardContent>
        </Card>
      </section>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_420px]">

        {/* Map */}
        <div>
          <Card>
            <CardHeader><CardTitle>Map Workspace</CardTitle></CardHeader>
            <CardContent>
              <div className="flex h-[520px] items-center justify-center rounded-xl border border-dashed bg-muted/30 text-sm text-muted-foreground">
                ArcGIS Map Will Appear Here Later
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">

          <Card>
            <CardHeader><CardTitle>Live Incident Feed</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>{incident.id}</TableCell>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell><Badge variant="secondary">{incident.severity}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Selected Issue</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Issue ID</p>
                <p className="font-medium">INC-1043</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Infrastructure Type</p>
                <p className="font-medium">Road</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Damage Indicator</p>
                <p className="font-medium">Washout</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="font-medium">97%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Portmore Coastal Road</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}
