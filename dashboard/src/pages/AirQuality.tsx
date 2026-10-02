import { useContext } from 'react'
import { LocationContext } from '../context/LocationContext'
import TopHeader from '../components/TopHeader'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AirQuality() {
  const { locationData } = useContext(LocationContext)

  const getAqiDetails = (aqi: number) => {
    if (aqi <= 100) return { label: 'Good', color: '#4ade80', desc: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' }
    if (aqi <= 150) return { label: 'Moderate', color: '#facc15', desc: 'Air quality is acceptable; however, there may be a risk for some people.' }
    return { label: 'Severe', color: '#ef4444', desc: 'Health alert: everyone may experience more serious health effects.' }
  }

  const aqiInfo = getAqiDetails(locationData.aqi)
  const aqiPercentage = Math.min(locationData.aqi, 300) / 300
  const dashOffset = 125.6 - (125.6 * aqiPercentage)

  return (
    <div className="page-wrapper">
      <TopHeader />
      
      <div className="aqi-top-grid">
        <div className="glass-card aqi-gauge-card">
          <div className="aqi-left-label">
            AQI
          </div>
          
          <div className="aqi-gauge-container">
            <svg viewBox="0 0 100 50" className="gauge-svg">
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="rgba(255,255,255,0.15)" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="url(#gaugeGrad)" 
                strokeWidth="12" 
                strokeLinecap="round" 
                strokeDasharray="125.6" 
                strokeDashoffset={dashOffset} 
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="gauge-content">
              <span className="gauge-val-small" style={{ color: aqiInfo.color }}>
                {locationData.aqi}
              </span>
              <span className="gauge-status" style={{ color: aqiInfo.color }}>
                {aqiInfo.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className="glass-card aqi-summary-card">
          <div className="summary-title">
            <span className="leaf-icon">🍃</span> Air Quality
          </div>
          <p>{aqiInfo.desc}</p>
        </div>
      </div>

      <div className="glass-card weather-strip">
        <div className="strip-item"><span className="icon">💧</span> Rain Probability {locationData.weather.rainProbability}%</div>
        <div className="strip-item"><span className="icon">💨</span> Wind {locationData.weather.windSpeed} km/h</div>
        <div className="strip-item">Feels like {locationData.weather.feelsLike}°C</div>
      </div>

      <div className="glass-card chart-card">
        <div className="widget-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          72-Hour AQI Predictive Model
        </div>
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer>
            <LineChart data={locationData.forecast72h}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" fontSize={12} tickMargin={10} />
              <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="aqi" 
                stroke="url(#lineGrad)" 
                strokeWidth={4} 
                dot={false}
                activeDot={{ r: 6, fill: '#fff', stroke: '#ef4444' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card advisory-widget">
        <div className="widget-title">
          <span className="heart-icon">❤️</span> Health Advisory
        </div>
        <p>Air quality is {aqiInfo.label.toLowerCase()} for most people. Sensitive groups should monitor outdoor activities.</p>
      </div>
    </div>
  )
}