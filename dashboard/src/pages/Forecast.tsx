import { useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import AQICard from '../components/AQICard'
import ForecastChart from '../components/ForecastChart'

export default function Forecast() {
  const { selectedLocation, setSelectedLocation, locationData, locations, isLoading } = useContext(LocationContext)

  const getAQIColor = (aqi: number) => {
    if (aqi > 400) return "#ef4444"
    if (aqi > 300) return "#f97316"
    if (aqi > 200) return "#eab308"
    if (aqi > 100) return "#eab308"
    return "#8ac926"
  }

  const getAQILabel = (aqi: number) => {
    if (aqi > 400) return "Severe"
    if (aqi > 300) return "Very Poor"
    if (aqi > 200) return "Poor"
    if (aqi > 100) return "Moderate"
    return "Good"
  }

  if (isLoading || !locationData) {
    return <div className="page-container"><p style={{marginTop: '100px', fontSize: '1.2rem'}}>Loading live API data...</p></div>
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-left">
          <h1>Coupled AQI Predictions</h1>
          <div className="location-selector">
            <label htmlFor="location-select">Monitoring Station:</label>
            <select 
              id="location-select" 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="location-dropdown"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        <span className="live-indicator">● LIVE / HISTORICAL</span>
      </header>

      <div className="dash-grid">
        <AQICard 
          title="Current AQI" 
          value={locationData.aqi} 
          unit={` ${getAQILabel(locationData.aqi)}`} 
          color={getAQIColor(locationData.aqi)} 
        />
        <AQICard 
          title="PM 2.5" 
          value={locationData.pm25} 
          unit="µg/m³" 
          color="#f97316" 
        />
        <AQICard 
          title="PM 10" 
          value={locationData.pm10} 
          unit="µg/m³" 
          color="#f59e0b" 
        />
        <AQICard 
          title="Temperature" 
          value={Number(Number(locationData.temperature).toFixed(2))} 
          unit="°C" 
          color="#3b82f6" 
        />

        <div className="card forecast-card">
          <h3>72-Hour Coupled AQI Forecast - {selectedLocation}</h3>
          <ForecastChart data={locationData.forecast} />
        </div>
      </div>
    </div>
  )
}