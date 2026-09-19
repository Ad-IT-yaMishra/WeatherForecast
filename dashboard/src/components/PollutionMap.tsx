import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { useContext } from 'react'
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

const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function PollutionMap() {
  const { selectedLocation, setSelectedLocation, locations, allData } = useContext(LocationContext)

  const getCoords = (name: string, index: number): [number, number] => {
    const loc = allData[name]
    if (loc && loc.lat && loc.lng) {
      return [loc.lat, loc.lng]
    }

    const dictKey = Object.keys(STATION_COORDS).find(k => k.toLowerCase() === name.toLowerCase())
    if (dictKey) {
      return STATION_COORDS[dictKey]
    }

    const baseLat = 28.6139
    const baseLng = 77.2090
    const offsetLat = (index % 3) * 0.05 - 0.05 
    const offsetLng = Math.floor(index / 3) * 0.05 - 0.05
    
    return [baseLat + offsetLat, baseLng + offsetLng]
  }

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>
      <MapContainer 
        center={[28.6139, 77.2090]} 
        zoom={10} 
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; OSM &copy; CARTO'
        />
        
        <Circle center={[29.8, 76.4]} radius={20000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3 }} />
        <Circle center={[30.1, 76.8]} radius={15000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3 }} />
        <Circle center={[29.5, 76.9]} radius={25000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.3 }} />

        {locations.map((name, index) => {
          const coords = getCoords(name, index)
          
          return (
            <Marker 
              key={name} 
              position={coords} 
              icon={name === selectedLocation ? activeIcon : defaultIcon}
              eventHandlers={{
                click: () => setSelectedLocation(name)
              }}
            >
              <Popup>
                <strong style={{ color: '#000' }}>{name}</strong>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}