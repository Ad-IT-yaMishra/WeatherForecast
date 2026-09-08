import AQICard from '../components/AQICard'
import ForecastChart from '../components/ForecastChart'

export default function Forecast() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Coupled AQI Predictions</h1>
        <span className="live-indicator">● LIVE</span>
      </header>

      <div className="dash-grid">
        <AQICard title="Current AQI" value={412} unit="Severe" color="#ef4444" />
        <AQICard title="PM 2.5" value={285} unit="µg/m³" color="#f97316" />
        <AQICard title="PM 10" value={410} unit="µg/m³" color="#f59e0b" />
        <AQICard title="Wind Speed" value={4.2} unit="km/h (NW)" color="#3b82f6" />

        <div className="card forecast-card">
          <h3>72-Hour Coupled AQI Forecast</h3>
          <ForecastChart />
        </div>
      </div>
    </div>
  )
}