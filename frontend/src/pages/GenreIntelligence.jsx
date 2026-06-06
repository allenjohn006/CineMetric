import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts'

const GenreIntelligence = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/genre-matrix')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  // Calculate medians for quadrant lines
  const medianVolume = data.length ? [...data].sort((a,b) => a.volume - b.volume)[Math.floor(data.length/2)].volume : 0
  const medianRating = data.length ? [...data].sort((a,b) => a.avgRating - b.avgRating)[Math.floor(data.length/2)].avgRating : 0

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-4 outline-none">
          <p className="font-bold text-accent mb-2">{data.Primary_Genre}</p>
          <p className="text-sm">Avg Rating: <span className="font-semibold text-white">{data.avgRating.toFixed(2)}</span></p>
          <p className="text-sm">Volume: <span className="font-semibold text-white">{data.volume} films</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Genre Intelligence (BCG Matrix)</h1>
        <p className="text-textMuted">Analyze content strategy by mapping production volume against average audience rating.</p>
      </div>

      <div className="premium-card h-[600px] flex flex-col relative">
        {/* Quadrant Labels */}
        <div className="absolute top-8 left-8 text-white/40 font-bold text-2xl tracking-wider pointer-events-none z-0">NICHE GEMS<br/><span className="text-sm font-normal">(High Rating, Low Vol)</span></div>
        <div className="absolute top-8 right-8 text-right text-success/40 font-bold text-2xl tracking-wider pointer-events-none z-0">STARS<br/><span className="text-sm font-normal">(High Rating, High Vol)</span></div>
        <div className="absolute bottom-16 left-8 text-danger/40 font-bold text-2xl tracking-wider pointer-events-none z-0">DOGS<br/><span className="text-sm font-normal">(Low Rating, Low Vol)</span></div>
        <div className="absolute bottom-16 right-8 text-right text-warning/40 font-bold text-2xl tracking-wider pointer-events-none z-0">CASH COWS<br/><span className="text-sm font-normal">(Low Rating, High Vol)</span></div>

        <ResponsiveContainer width="100%" height="100%" className="relative z-10">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" dataKey="volume" name="Volume" stroke="#94a3b8" label={{ value: 'Production Volume (Count)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
            <YAxis type="number" dataKey="avgRating" name="Avg Rating" stroke="#94a3b8" domain={['auto', 'auto']} label={{ value: 'Average Rating', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            
            <ReferenceLine x={medianVolume} stroke="#475569" strokeDasharray="5 5" />
            <ReferenceLine y={medianRating} stroke="#475569" strokeDasharray="5 5" />
            
            <Scatter name="Genres" data={data} fill="#8b5cf6">
               <LabelList dataKey="Primary_Genre" position="top" fill="#cbd5e1" fontSize={11} offset={8} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GenreIntelligence
