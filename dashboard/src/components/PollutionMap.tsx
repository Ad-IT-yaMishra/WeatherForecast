import { MapContainer, TileLayer, CircleMarker, Popup, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const center: [number, number] = [28.6139, 77.2090]

const hotspots = [
  { id: 1, pos: [30.3165, 74.9257], intensity: 'High' },
  { id: 2, pos: [29.9695, 75.3856], intensity: 'Severe' },
  { id: 3, pos: [30.2110, 76.3995], intensity: 'Moderate' },
]

const plumeCoords: [number, number][] = [
  [30.5, 74.5], [29.8, 75.5], [28.8, 77.0], [28.4, 77.5], [29.0, 78.0], [30.8, 75.0]
]

export default function PollutionMap() {
  return (
    <div className="map-container" style={{ height: '350px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />
        
        <Polygon positions={plumeCoords} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.3, weight: 1 }} />

        {hotspots.map((spot) => (
          <CircleMarker 
            key={spot.id} 
            center={spot.pos as [number, number]} 
            radius={6} 
            pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.8 }}
          >
            <Popup>Fire Intensity: {spot.intensity}</Popup>
          </CircleMarker>
        ))}

        <CircleMarker center={center} radius={10} pathOptions={{ color: '#fff', fillColor: '#3b82f6', fillOpacity: 1, weight: 3 }}>
          <Popup>Delhi NCR (Receptor)</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  )
}