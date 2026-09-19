import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Constituent = { name: string; value: number; unit: string; percentage: number }
type Gases = { no2: number; so2: number; co: number; o3: number }

type LocationData = {
  aqi: number
  pm25: number
  pm10: number
  windSpeed: number
  temperature: number
  lat?: number
  lng?: number
  forecast: any[]
  constituents: Constituent[]
  gases: Gases
}

type LocationContextType = {
  selectedLocation: string
  setSelectedLocation: (loc: string) => void
  locationData: LocationData | null
  allData: Record<string, LocationData>
  locations: string[]
  isLoading: boolean
}

export const STATION_COORDS: Record<string, [number, number]> = {
  "Anand Vihar": [28.6502, 77.3153],
  "Punjabi Bagh": [28.6738, 77.1307],
  "RK Puram": [28.5660, 77.1767],
  "Okhla": [28.5222, 77.2887],
  "Rohini": [28.7466, 77.1166],
  "ITO": [28.6284, 77.2405],
  "Dwarka": [28.5921, 77.0460],
  "Bawana": [28.8000, 77.0333],
  "Ghaziabad": [28.6692, 77.4538],
  "Noida": [28.5355, 77.3910],
  "Gurugram": [28.4595, 77.0266],
  "Gurgaon": [28.4595, 77.0266],
  "Faridabad": [28.4089, 77.3178],
  "Greater Noida": [28.4744, 77.5040],
  "Sonipat": [28.9931, 77.0151],
  "Meerut": [28.9845, 77.7064]
}

const generateDiurnalForecast = (currentAqi: number, currentTemp: number) => {
  const forecast: { time: string; aqi: number; temp: number; mixingHeight: number }[] = []
  const steps = [0, 12, 24, 36, 48, 60, 72]
  
  steps.forEach(hour => {
    const cycle = Math.cos(hour * Math.PI / 12)
    const variation = currentAqi * 0.15 
    
    let projectedAqi = Math.round(currentAqi + (cycle * variation))
    if (projectedAqi > 200) projectedAqi = 200
    if (projectedAqi < 10) projectedAqi = 10
    
    const projectedTemp = Math.round(currentTemp - (cycle * 5))
    
    forecast.push({
      time: `${hour < 10 ? '0' : ''}${hour}:00`,
      aqi: projectedAqi,
      temp: projectedTemp,
      mixingHeight: Math.max(50, Math.round(350 - (cycle * 200)))
    })
  })
  return forecast
}

const fallbackConstituents = [
  { name: 'Farm Fires (Biomass)', value: 172, unit: 'µg/m³', percentage: 38 },
  { name: 'Vehicular Emissions', value: 108, unit: 'µg/m³', percentage: 24 },
  { name: 'Construction Dust', value: 81, unit: 'µg/m³', percentage: 18 },
  { name: 'Industrial', value: 63, unit: 'µg/m³', percentage: 14 },
  { name: 'Others', value: 28, unit: 'µg/m³', percentage: 6 },
]

const fallbackGases = { no2: 45, so2: 18, co: 85, o3: 35 }

export const LocationContext = createContext<LocationContextType>({} as LocationContextType)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [locations, setLocations] = useState<string[]>([])
  const [apiData, setApiData] = useState<Record<string, LocationData>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://earwig-antler-cross.ngrok-free.dev/api/live', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => res.json())
      .then(data => {
        let rawData = data
        if (Array.isArray(data)) {
          rawData = {}
          data.forEach(item => {
            const locName = item.location || item.name || item.station || "Unknown"
            rawData[locName] = item
          })
        }

        const fetchedLocations = Object.keys(rawData)
        const processedData: Record<string, LocationData> = {}
        
        fetchedLocations.forEach(key => {
          const locData = rawData[key]
          
          const safeAqi = locData.aqi || 100
          const safeTemp = locData.temperature || locData.temp || 25

          processedData[key] = {
            ...locData,
            lat: locData.lat || locData.latitude,
            lng: locData.lng || locData.longitude || locData.lon,
            aqi: safeAqi > 200 ? 200 : safeAqi,
            pm25: locData.pm25 || 0,
            pm10: locData.pm10 || 0,
            windSpeed: locData.windSpeed || 0,
            temperature: safeTemp,
            forecast: locData.forecast?.length ? locData.forecast : generateDiurnalForecast(safeAqi > 200 ? 200 : safeAqi, safeTemp),
            constituents: locData.constituents?.length ? locData.constituents : fallbackConstituents,
            gases: locData.gases || {
              no2: locData.no2 || fallbackGases.no2,
              so2: locData.so2 || fallbackGases.so2,
              co: locData.co || fallbackGases.co,
              o3: locData.o3 || fallbackGases.o3
            }
          }
        })
        
        setLocations(fetchedLocations)
        setApiData(processedData)
        if (fetchedLocations.length > 0) {
          setSelectedLocation(fetchedLocations[0])
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <LocationContext.Provider value={{ 
      selectedLocation, 
      setSelectedLocation, 
      locationData: apiData[selectedLocation] || null, 
      allData: apiData,
      locations, 
      isLoading 
    }}>
      {children}
    </LocationContext.Provider>
  )
}