import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ForecastChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
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