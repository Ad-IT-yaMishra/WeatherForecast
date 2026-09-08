import PollutionMap from '../components/PollutionMap'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const constituentData = [
  { name: 'Farm Fires (Biomass)', value: 38 },
  { name: 'Vehicular Emissions', value: 24 },
  { name: 'Construction Dust', value: 18 },
  { name: 'Industrial', value: 14 },
  { name: 'Others', value: 6 },
]

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#94a3b8']

export default function Sources() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Fire Intensity & Pollution Constituents</h1>
      </header>

      <div className="dash-grid split-grid">
        <div className="card map-card">
          <h3>Regional Fire Hotspots & Plume Dispersion</h3>
          <PollutionMap />
        </div>

        <div className="card chart-card">
          <h3>Current Pollutant Breakdown (Delhi NCR)</h3>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={constituentData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {constituentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#cbd5e1' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}