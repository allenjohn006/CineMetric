import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const QUADRANT_LABELS = [
  { x: 'left', y: 'top',    label: 'NICHE GEMS',  sub: 'High quality · Low volume',  color: '#A78BFA' },
  { x: 'right', y: 'top',   label: 'STARS',       sub: 'High quality · High volume', color: 'var(--color-gold)' },
  { x: 'left', y: 'bottom', label: 'DOGS',        sub: 'Low quality · Low volume',   color: 'var(--color-danger)' },
  { x: 'right', y: 'bottom',label: 'CASH COWS',   sub: 'Low quality · High volume',  color: 'var(--color-blue)' },
]

const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={{
      background: 'var(--color-surface-nav)', border: '1px solid var(--color-border-mid)',
      borderRadius: '3px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem',
    }}>
      <p style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>{d.Primary_Genre}</p>
      <p style={{ color: 'var(--color-text-muted)' }}>Avg Rating: <span style={{ color: '#fff', fontWeight: 600 }}>{d.avgRating?.toFixed(2)}</span></p>
      <p style={{ color: 'var(--color-text-muted)' }}>Volume: <span style={{ color: '#fff', fontWeight: 600 }}>{d.volume} films</span></p>
    </div>
  )
}

const CustomDot = (props) => {
  const { cx, cy, payload } = props
  const fillColor = payload?.color || 'var(--color-blue)'
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill={fillColor} fillOpacity={0.85} stroke="var(--color-border-mid)" strokeWidth={1} />
      <text x={cx} y={cy - 12} fill="var(--color-text-muted)" fontSize={10} textAnchor="middle">
        {payload.Primary_Genre}
      </text>
    </g>
  )
}

const GenreIntelligence = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/genre-matrix')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner"></div><span>Loading genre matrix…</span></div>

  const sorted = [...data].sort((a, b) => a.volume - b.volume)
  const medVol = sorted[Math.floor(sorted.length / 2)]?.volume ?? 0
  const sortedR = [...data].sort((a, b) => a.avgRating - b.avgRating)
  const medRating = sortedR[Math.floor(sortedR.length / 2)]?.avgRating ?? 0

  const processedData = data.map(item => {
    let color = 'var(--color-blue)' // Default: Cash Cows (Blue)
    if (item.avgRating >= medRating && item.volume < medVol) {
      color = '#A78BFA' // Niche Gems (Purple)
    } else if (item.avgRating >= medRating && item.volume >= medVol) {
      color = 'var(--color-gold)' // Stars (Gold)
    } else if (item.avgRating < medRating && item.volume < medVol) {
      color = 'var(--color-danger)' // Dogs (Red)
    }
    return { ...item, color }
  })

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Genre Intelligence</h1>
        <p className="page-sub">BCG Matrix — Production Volume vs. Average Rating by Genre.</p>
      </div>

      {/* Quadrant legend */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {QUADRANT_LABELS.map(q => (
          <div key={q.label} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: '3px', padding: '0.3rem 0.75rem',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: q.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{q.label}</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-dim)' }}>{q.sub}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '1.5rem', position: 'relative', height: '520px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number" dataKey="volume" name="Volume"
              stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
              label={{ value: 'Production Volume (# Films)', position: 'insideBottom', offset: -15, fill: 'var(--color-text-dim)', fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="avgRating" name="Avg Rating"
              stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
              domain={['auto', 'auto']}
              label={{ value: 'Average Rating', angle: -90, position: 'insideLeft', fill: 'var(--color-text-dim)', fontSize: 11, dy: 50 }}
            />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine x={medVol} stroke="var(--color-border-mid)" strokeDasharray="4 4" />
            <ReferenceLine y={medRating} stroke="var(--color-border-mid)" strokeDasharray="4 4" />
            <Scatter name="Genres" data={processedData} shape={CustomDot} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default GenreIntelligence
