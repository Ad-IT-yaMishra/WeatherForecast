import { useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import PollutionMap from '../components/PollutionMap'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#94a3b8']

export default function Sources() {
  const { selectedLocation, locationData, isLoading } = useContext(LocationContext)

  if (isLoading || !locationData) {
    return <div className="page-container"><p style={{marginTop: '100px', fontSize: '1.2rem'}}>Loading live API data...</p></div>
  }

  const safeConstituents = locationData.constituents || []
  const safeGases = locationData.gases || {}

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Source Apportionment - {selectedLocation}</h1>
      </header>

      <div className="sources-layout">
        <div className="card map-card-full" style={{ height: '450px', padding: '10px' }}>
          <PollutionMap />
        </div>

        <div className="sources-bottom-grid">
          <div className="card chart-card">
            <h3>Pollutant Constituents Breakdown</h3>
            <div style={{ width: '100%', height: '350px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={safeConstituents}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="percentage"
                    label={(entry: any) => `${Number(entry.percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {safeConstituents.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#cbd5e1' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card list-card">
            <h3>Live Environmental Metrics</h3>
            <div className="metrics-list">
              <div className="metric-row">
                <div className="metric-info">
                  <span className="metric-name" style={{ fontSize: '1.2rem', color: '#10b981' }}>
                    WIND SPEED
                  </span>
                </div>
                <div className="metric-values">
                  <span className="metric-qty">{Number(locationData.windSpeed).toFixed(2)} m/s</span>
                </div>
              </div>

              {Object.entries(safeGases).map(([gas, value]) => (
                <div className="metric-row" key={gas}>
                  <div className="metric-info">
                    <span className="metric-name" style={{ fontSize: '1.2rem', color: '#3b82f6' }}>
                      {gas.toUpperCase()}
                    </span>
                  </div>
                  <div className="metric-values">
                    <span className="metric-qty">{Number(value).toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}