import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface AQICardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
}

export default function AQICard({ title, value, unit, color }: AQICardProps) {
  return (
    <Card 
      className="bg-slate-900 border-slate-700 shadow-md transition-all hover:shadow-lg" 
      style={{ borderTop: `4px solid ${color}` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight" style={{ color }}>
            {value}
          </span>
          <span className="text-slate-400 font-medium">
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}