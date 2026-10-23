import { useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import TopHeader from '../components/TopHeader'

export default function Home() {
  const { locationData } = useContext(LocationContext)

  const weeklyDays = [
    { day: 'Mon', date: '21 Sep', min: 23, max: 34, icon: '☀️', condition: 'Sunny' },
    { day: 'Tue', date: '22 Sep', min: 24, max: 35, icon: '☀️', condition: 'Clear Sky' },
    { day: 'Wed', date: '23 Sep', min: 23, max: 33, icon: '🌤️', condition: 'Partly Hazy' },
    { day: 'Thu', date: '24 Sep', min: 22, max: 32, icon: '⛅', condition: 'Overcast' },
    { day: 'Fri', date: '25 Sep', min: 21, max: 30, icon: '🌧️', condition: 'Light Rain' },
    { day: 'Sat', date: '26 Sep', min: 20, max: 29, icon: '🌦️', condition: 'Scattered Mist' },
    { day: 'Sun', date: '27 Sep', min: 22, max: 31, icon: '🌤️️', condition: 'Moderate Fog' }
  ]

  const getPollutantStatus = (val: number, goodLimit: number, modLimit: number) => {
    if (val <= goodLimit) return { label: 'Good', color: '#4ade80' }
    if (val <= modLimit) return { label: 'Moderate', color: '#facc15' }
    return { label: 'Poor', color: '#ef4444' }
  }

  const pollutants = [
    { name: 'PM2.5', val: locationData.pm25, unit: 'µg/m³', status: getPollutantStatus(locationData.pm25, 30, 60) },
    { name: 'PM10', val: locationData.pm10, unit: 'µg/m³', status: getPollutantStatus(locationData.pm10, 50, 100) },
    { name: 'NO2', val: locationData.gases.no2, unit: 'µg/m³', status: getPollutantStatus(locationData.gases.no2, 40, 80) },
    { name: 'SO2', val: locationData.gases.so2, unit: 'µg/m³', status: getPollutantStatus(locationData.gases.so2, 40, 80) },
    { name: 'CO', val: locationData.gases.co, unit: 'mg/m³', status: getPollutantStatus(locationData.gases.co, 1, 2) },
    { name: 'O3', val: locationData.gases.o3, unit: 'µg/m³', status: getPollutantStatus(locationData.gases.o3, 50, 100) },
    { name: 'NH3', val: locationData.gases.nh3, unit: 'µg/m³', status: getPollutantStatus(locationData.gases.nh3, 200, 400) },
    { name: 'CO2', val: locationData.gases.co2, unit: 'ppm', status: getPollutantStatus(locationData.gases.co2, 600, 1000) },
  ]

  return (
    <div className="page-wrapper">
      <TopHeader />
      
      <div className="home-top-grid">
        <div className="glass-card current-temp-card">
          <div className="temp-header">Current Temperature</div>
          <div className="temp-main">
            <span className="temp-icon">⛅</span>
            <span className="temp-value">{locationData.temperature}°C</span>
          </div>
          <div className="temp-footer">Feels like {locationData.weather.feelsLike}°C • Dew Point 19°C</div>
        </div>
        
        <div className="weather-side-widgets">
          <div className="glass-card mini-widget">
            <span className="mini-icon">💧</span>
            <div className="mini-text">
              <div className="mini-label">Rain Probability</div>
              <div className="mini-val">{locationData.weather.rainProbability}%</div>
            </div>
          </div>
          <div className="glass-card mini-widget">
            <span className="mini-icon">💨</span>
            <div className="mini-text">
              <div className="mini-label">Wind Speed</div>
              <div className="mini-val">{locationData.weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card forecast-widget">
        <div className="widget-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          24-Hour Diurnal Dynamics (2-Hour Interval Steps)
        </div>
        <div className="hourly-dense-grid">
          {locationData.forecast.map((f, i) => (
            <div className="hour-item glass-pill" key={i}>
              <div className="hour-time">{f.time}</div>
              <div className="hour-icon">{f.icon}</div>
              <div className="hour-temp">{f.temp}°C</div>
              <div className="hour-aqi-pill" style={{ color: f.aqi > 150 ? '#f87171' : '#facc15' }}>
                AQI {f.aqi}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-bottom-split">
        <div className="glass-card weekly-card-compact">
          <div className="widget-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            7-Day Synoptic Weather
          </div>
          <div className="weekly-rows-container">
            {weeklyDays.map((d, i) => (
              <div className="weekly-row-item" key={i}>
                <span className="week-day-tag">{d.day}</span>
                <span className="week-date-tag">{d.date}</span>
                <span className="week-icon-tag">{d.icon}</span>
                <span className="week-condition-tag">{d.condition}</span>
                <div className="temp-range-bar">
                  <span className="temp-low">{d.min}°</span>
                  <div className="range-indicator"></div>
                  <span className="temp-high">{d.max}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card pollutants-widget-home">
          <div className="widget-title">
            <span className="leaf-icon">🍃</span> Air Pollutants
          </div>
          <div className="pollutants-grid-home">
            {pollutants.map(p => (
              <div className="glass-pill p-card" key={p.name}>
                <div className="p-name">{p.name}</div>
                <div className="p-val">{p.val} <span className="p-unit">{p.unit}</span></div>
                <div className="p-status">
                  <span className="dot" style={{ backgroundColor: p.status.color }}></span>
                  <span style={{ color: p.status.color }}>{p.status.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}