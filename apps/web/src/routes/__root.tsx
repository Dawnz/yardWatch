// src/routes/__root.tsx
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import React from "react"

import appCss from "@workspace/ui/globals.css?url"
import Sidebar from "../components/sidebar/Sidebar"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IslandSentinel | Disaster Intelligence" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-900 text-white">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content */}
          <main className="flex-1 relative">{children}</main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}