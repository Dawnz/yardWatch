// src/components/sidebar/Sidebar.tsx
import React from "react"
import { Link } from "@tanstack/react-router"

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-gray-800 p-6 w-64 flex-shrink-0">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">🌪 IslandSentinel</h2>

      <div className="mb-6">
        <h3 className="text-orange-400 font-semibold mb-2">Navigation</h3>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="hover:text-white">Dashboard</Link>
          <Link to="/reports" className="hover:text-white">Reports</Link>
        </nav>
      </div>

      <div className="mb-6">
        <h3 className="text-orange-400 font-semibold mb-2">Tools</h3>
        <button className="tool-btn">Select Area</button>
        <button className="tool-btn">Draw Polygon</button>
        <button className="tool-btn">Run Damage Scan</button>
      </div>

      <div>
        <h3 className="text-orange-400 font-semibold mb-2">Layers</h3>
        <button className="tool-btn">Satellite</button>
        <button className="tool-btn">Roads</button>
        <button className="tool-btn">Damage Heatmap</button>
      </div>
    </div>
  )
}

export default Sidebar