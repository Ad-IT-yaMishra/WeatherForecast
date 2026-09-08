import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const forecastData = [
  { time: '00:00', aqi: 412, temp: 12, mixingHeight: 150 },
  { time: '12:00', aqi: 380, temp: 22, mixingHeight: 800 },
  { time: '24:00', aqi: 450, temp: 10, mixingHeight: 100 },
  { time: '36:00', aqi: 420, temp: 24, mixingHeight: 900 },
  { time: '48:00', aqi: 500, temp: 9, mixingHeight: 50 },
  { time: '60:00', aqi: 460, temp: 21, mixingHeight: 750 },
  { time: '72:00', aqi: 480, temp: 11, mixingHeight: 120 },
]

export default function ForecastChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis yAxisId="left" stroke="#ef4444" label={{ value: 'AQI', angle: -90, position: 'insideLeft', fill: '#ef4444' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" label={{ value: 'Temp (°C)', angle: 90, position: 'insideRight', fill: '#3b82f6' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
          <Line yAxisId="left" type="monotone" dataKey="aqi" stroke="#ef4444" strokeWidth={3} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}