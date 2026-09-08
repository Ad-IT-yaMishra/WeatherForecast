import InversionPanel from '../components/InversionPanel'

export default function Dynamics() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Atmospheric Dynamics & Trapping Mechanisms</h1>
      </header>

      <div className="dash-grid dynamics-grid">
        <div className="card">
          <h3>Real-Time Atmospheric Inversion Status</h3>
          <InversionPanel />
        </div>
        
        <div className="content-card">
          <h2>Why Inversion Matters</h2>
          <p>During the winter months in Delhi NCR, cold air descends and becomes trapped beneath a layer of warmer air above it. This acts like a lid on the city.</p>
          <ul>
            <li><strong>Mixing Height Drops:</strong> The vertical space where pollutants can disperse shrinks from kilometers to just a few hundred meters.</li>
            <li><strong>Ventilation Index Plummets:</strong> Low wind speeds combined with low mixing heights mean pollutants from stubble burning and local vehicles accumulate exponentially.</li>
            <li><strong>Coupled Effect:</strong> When northwest winds bring smoke from farm fires exactly as an inversion layer forms, AQI rapidly hits "Severe" levels within hours.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}