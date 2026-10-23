import { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationContext, STATION_COORDS } from '../context/LocationContext'

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function Hotspots() {
  const { locations, allData, locationData } = useContext(LocationContext)

  const getCoords = (name: string, index: number): [number, number] => {
    const loc = allData[name]
    if (loc && loc.lat && loc.lng) return [loc.lat, loc.lng]
    const dictKey = Object.keys(STATION_COORDS).find(k => k.toLowerCase() === name.toLowerCase())
    if (dictKey) return STATION_COORDS[dictKey]
    return [28.6139 + ((index % 3) * 0.05 - 0.05), 77.2090 + (Math.floor(index / 3) * 0.05 - 0.05)]
  }

  return (
    <div className="page-wrapper">
      <div className="glass-card map-container-glass">
        <div className="widget-title"><span className="icon">🔥</span> Active Fire Hotspots & Sources</div>
        <div className="map-frame">
          <MapContainer center={[28.6139, 77.2090]} zoom={9} style={{ height: '100%', width: '100%' }}>

            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              className="dark-map-tiles"
            />
            <Circle center={[29.8, 76.4]} radius={20000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.4 }}>
               <Popup>Haryana Harvesting Fires</Popup>
            </Circle>
            <Circle center={[30.1, 76.8]} radius={15000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.4 }}>
               <Popup>Punjab Biomass Burning</Popup>
            </Circle>
            {locations.map((name, index) => (
              <Marker key={name} position={getCoords(name, index)} icon={defaultIcon}>
                <Popup><strong style={{ color: '#000' }}>{name}</strong></Popup>
              </Marker>
          ))}  
          </MapContainer>
        </div>
      </div>

      <div className="glass-card dynamics-metrics-card-full">
        <div className="widget-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          </svg>
          Atmospheric Dispersion & Inversion Metrics
        </div>
        <div className="dynamics-indicators-grid-2x4">
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Boundary Layer (PBL)</div>
            <div className="indicator-value">{locationData.weather.pblHeight} m</div>
            <div className="indicator-status text-critical">Shallow Trap Active</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Ventilation Index</div>
            <div className="indicator-value">{locationData.weather.ventilationIndex} m²/s</div>
            <div className="indicator-status text-warning">Poor Stagnation Risk</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Horizontal Visibility</div>
            <div className="indicator-value">{locationData.weather.visibility} km</div>
            <div className="indicator-status text-normal">Moderate Haze</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Relative Humidity</div>
            <div className="indicator-value">{locationData.weather.humidity}%</div>
            <div className="indicator-status text-normal">Aerosol Growth Factor</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Barometric Pressure</div>
            <div className="indicator-value">{locationData.weather.pressure} hPa</div>
            <div className="indicator-status text-normal">High Pressure Ridge</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Solar Radiation UV</div>
            <div className="indicator-value">{locationData.weather.uvIndex} UVI</div>
            <div className="indicator-status text-normal">Photochemical Trigger</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Inversion Strength</div>
            <div className="indicator-value">{locationData.weather.inversionStrength} °C/km</div>
            <div className="indicator-status text-critical">Strong Cap Formed</div>
          </div>
          <div className="indicator-box glass-pill">
            <div className="indicator-title">Surface Roughness</div>
            <div className="indicator-value">{locationData.weather.surfaceRoughness} m</div>
            <div className="indicator-status text-warning">High Friction Zone</div>
          </div>
        </div>
      </div>

      <div className="glass-card info-card">
        <div className="widget-title">
           <svg viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
           Regional Impact: Agricultural Biomass Burning
        </div>
        <p className="regional-info-text">
          During the post-monsoon harvesting season (October to November), farmers in the neighboring states of <strong>Punjab and Haryana</strong> burn millions of tons of paddy crop residue to quickly clear fields for winter wheat sowing. 
          Driven by north-westerly prevailing winds, these massive smoke plumes travel directly into the Indo-Gangetic Plain. When combined with Delhi's dropping winter temperatures, shallow atmospheric boundary layers, and local vehicular emissions, this creates a severe particulate trap—forcing the AQI into hazardous levels.
        </p>
      </div>
    </div>
  )
}