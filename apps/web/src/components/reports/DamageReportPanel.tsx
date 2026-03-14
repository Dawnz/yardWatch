// src/components/reports/DamageReportPanel.tsx
import React from "react"

type DamageData = {
  severe: number
  moderate: number
  minor: number
  accessibleRoutes: number
}

const mockData: DamageData = {
  severe: 14,
  moderate: 32,
  minor: 48,
  accessibleRoutes: 3,
}
type DamageReportPanelProps = {
  selectedArea?: Array<{ lat: number; lng: number }>
}

const DamageReportPanel: React.FC<DamageReportPanelProps> = ({ selectedArea }) => {
  const data = {
    severe: 14,
    moderate: 32,
    minor: 48,
    accessibleRoutes: 3,
  }

  return (
    <div className="report-panel absolute top-0 right-0 w-80 h-full bg-gray-900 border-l border-gray-700 p-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-orange-400 mb-4">Damage Report</h2>

      {selectedArea && (
        <div className="mb-3">
          <strong>Selected Area Coordinates:</strong>
          <pre className="text-xs">{JSON.stringify(selectedArea, null, 2)}</pre>
        </div>
      )}

      <div className="damage-card bg-gray-800 p-3 mb-3">
        <strong>Severe Damage</strong>
        <p className="text-red-500">{data.severe} buildings</p>
      </div>
      <div className="damage-card bg-gray-800 p-3 mb-3">
        <strong>Moderate Damage</strong>
        <p className="text-yellow-400">{data.moderate} buildings</p>
      </div>
      <div className="damage-card bg-gray-800 p-3 mb-3">
        <strong>Minor Damage</strong>
        <p className="text-green-500">{data.minor} buildings</p>
      </div>

      <div className="damage-card bg-gray-800 p-3 mb-3">
        <strong>Accessible Roads</strong>
        <p className="text-green-400">{data.accessibleRoutes} routes</p>
      </div>

      <button className="tool-btn mt-4 w-full">Generate Report</button>
    </div>
  )
}

export default DamageReportPanel