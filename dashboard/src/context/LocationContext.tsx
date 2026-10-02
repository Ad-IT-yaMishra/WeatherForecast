import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type Constituent = { name: string; value: number; unit: string; percentage: number }
type Gases = { no2: number; so2: number; co: number; o3: number; nh3: number; co2: number }
type Weather = { 
  rainProbability: number
  windSpeed: number
  feelsLike: number
  humidity: number
  visibility: number
  pressure: number
  uvIndex: number
  pblHeight: number
  ventilationIndex: number
  inversionStrength: number
  surfaceRoughness: number
}

type ForecastItem = { time: string; temp: number; aqi: number; icon: string }
type Forecast72h = { time: string; aqi: number }

type LocationData = {
  aqi: number
  pm25: number
  pm10: number
  temperature: number
  weather: Weather
  forecast: ForecastItem[]
  forecast72h: Forecast72h[]
  constituents: Constituent[]
  gases: Gases
  lat?: number
  lng?: number
}

type LocationContextType = {
  selectedLocation: string
  setSelectedLocation: (loc: string) => void
  locationData: LocationData
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
}

const generateTwelveIntervalForecast = (baseTemp: number, baseAqi: number): ForecastItem[] => {
  const intervals = [
    { time: '12 AM', tempDiff: -8, aqiMult: 1.25, icon: '🌙' },
    { time: '02 AM', tempDiff: -9, aqiMult: 1.35, icon: '🌙' },
    { time: '04 AM', tempDiff: -10, aqiMult: 1.40, icon: '🌙' },
    { time: '06 AM', tempDiff: -8, aqiMult: 1.30, icon: '🌅' },
    { time: '08 AM', tempDiff: -4, aqiMult: 1.15, icon: '🌤' },
    { time: '10 AM', tempDiff: 0, aqiMult: 0.95, icon: '☀️' },
    { time: '12 PM', tempDiff: 3, aqiMult: 0.80, icon: '☀️' },
    { time: '02 PM', tempDiff: 4, aqiMult: 0.75, icon: '☀️' },
    { time: '04 PM', tempDiff: 2, aqiMult: 0.85, icon: '🌤️' },
    { time: '06 PM', tempDiff: -2, aqiMult: 1.05, icon: '🌆' },
    { time: '08 PM', tempDiff: -5, aqiMult: 1.18, icon: '🌙' },
    { time: '10 PM', tempDiff: -7, aqiMult: 1.22, icon: '🌙' },
  ]

  return intervals.map(item => ({
    time: item.time,
    temp: Math.round(baseTemp + item.tempDiff),
    aqi: Math.min(400, Math.round(baseAqi * item.aqiMult)),
    icon: item.icon
  }))
}

const generate72hForecast = (baseAqi: number): Forecast72h[] => {
  const data = []
  for (let i = 0; i <= 72; i += 6) {
    const diurnalFluctuation = Math.sin(i / 12 * Math.PI) * 40
    data.push({
      time: `+${i}h`,
      aqi: Math.max(50, Math.min(400, Math.round(baseAqi + diurnalFluctuation + (Math.random() * 15 - 7.5))))
    })
  }
  return data
}

const fallbackGases: Gases = { no2: 18, so2: 6, co: 0.8, o3: 56, nh3: 12, co2: 412 }

const createMockStation = (
  aqi: number, 
  temp: number, 
  pm25: number, 
  pm10: number, 
  lat: number, 
  lng: number,
  pbl: number,
  ventilation: number
): LocationData => ({
  aqi,
  pm25,
  pm10,
  temperature: temp,
  weather: { 
    rainProbability: 10, 
    windSpeed: 14.5, 
    feelsLike: temp + 2, 
    humidity: 62,
    visibility: 3.2,
    pressure: 1012,
    uvIndex: 6,
    pblHeight: pbl,
    ventilationIndex: ventilation,
    inversionStrength: 4.8,
    surfaceRoughness: 0.8
  },
  forecast: generateTwelveIntervalForecast(temp, aqi),
  forecast72h: generate72hForecast(aqi),
  constituents: [
    { name: 'PM2.5', value: pm25, unit: 'µg/m³', percentage: 35 },
    { name: 'PM10', value: pm10, unit: 'µg/m³', percentage: 45 },
    { name: 'O3', value: 56, unit: 'µg/m³', percentage: 12 },
    { name: 'NO2', value: 18, unit: 'µg/m³', percentage: 8 }
  ],
  gases: fallbackGases,
  lat,
  lng
})

const INITIAL_MOCK_DATA: Record<string, LocationData> = {
  "Anand Vihar": createMockStation(145, 33, 55, 98, 28.6502, 77.3153, 220, 1650),
  "Punjabi Bagh": createMockStation(162, 34, 62, 110, 28.6738, 77.1307, 190, 1420),
  "RK Puram": createMockStation(132, 32, 45, 85, 28.5660, 77.1767, 280, 2100),
  "Okhla": createMockStation(150, 33, 58, 102, 28.5222, 77.2887, 240, 1800),
  "Rohini": createMockStation(175, 35, 68, 120, 28.7466, 77.1166, 170, 1310),
  "ITO": createMockStation(155, 34, 60, 105, 28.6284, 77.2405, 230, 1720),
  "Dwarka": createMockStation(128, 31, 42, 80, 28.5921, 77.0460, 310, 2450),
  "Bawana": createMockStation(185, 35, 75, 130, 28.8000, 77.0333, 150, 1150),
}

export const LocationContext = createContext<LocationContextType>({} as LocationContextType)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [apiData, setApiData] = useState<Record<string, LocationData>>(INITIAL_MOCK_DATA)
  const [locations, setLocations] = useState<string[]>(Object.keys(INITIAL_MOCK_DATA))
  const [selectedLocation, setSelectedLocation] = useState<string>("Anand Vihar")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('https://earwig-antler-cross.ngrok-free.dev/api/live', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => {
        if (!res.ok) throw new Error("API Connection Failed")
        return res.json()
      })
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
        if (fetchedLocations.length > 0) {
          const processedData: Record<string, LocationData> = {}
          
          fetchedLocations.forEach(key => {
            const locData = rawData[key]
            const baseFallback = INITIAL_MOCK_DATA[key] || INITIAL_MOCK_DATA["Anand Vihar"]
            const currentAqi = Math.min(400, locData.aqi || baseFallback.aqi)
            const currentTemp = locData.temperature || locData.temp || baseFallback.temperature

            processedData[key] = {
              aqi: currentAqi,
              pm25: locData.pm25 || baseFallback.pm25,
              pm10: locData.pm10 || baseFallback.pm10,
              temperature: currentTemp,
              weather: {
                ...baseFallback.weather,
                ...(locData.weather || {}),
                windSpeed: locData.windSpeed || baseFallback.weather.windSpeed,
                feelsLike: locData.feelsLike || baseFallback.weather.feelsLike
              },
              forecast: generateTwelveIntervalForecast(currentTemp, currentAqi),
              forecast72h: generate72hForecast(currentAqi),
              constituents: locData.constituents?.length ? locData.constituents : baseFallback.constituents,
              gases: { ...fallbackGases, ...(locData.gases || {}) },
              lat: locData.lat || locData.latitude || baseFallback.lat,
              lng: locData.lng || locData.longitude || baseFallback.lng,
            }
          })
          
          setApiData(processedData)
          setLocations(fetchedLocations)
          if (!fetchedLocations.includes(selectedLocation)) {
            setSelectedLocation(fetchedLocations[0])
          }
        }
      })
      .catch(() => {
        setApiData(INITIAL_MOCK_DATA)
        setLocations(Object.keys(INITIAL_MOCK_DATA))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      locationData: apiData[selectedLocation] || INITIAL_MOCK_DATA["Anand Vihar"],
      allData: apiData,
      locations,
      isLoading
    }}>
      {children}
    </LocationContext.Provider>
  )
}