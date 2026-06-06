import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const ChartTooltip = ({ active, payload, label, type }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-surface-nav)', border: '1px solid var(--color-border-mid)',
      borderRadius: '3px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem',
    }}>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{label}s</p>
      <p style={{ color: type === 'rating' ? 'var(--color-gold)' : 'var(--color-blue)', fontWeight: 700 }}>
        {type === 'rating' ? `${payload[0].value?.toFixed(2)} avg rating` : `${Number(payload[0].value).toLocaleString()} films`}
      </p>
    </div>
  )
}

const TimeIntelligence = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/time-intelligence')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner"></div><span>Loading time trends…</span></div>

  const decades = data?.decadeTrend ?? []
  // Find peak decade by volume
  const peakDecade = [...decades].sort((a, b) => b.volume - a.volume)[0]
  const maxVol = Math.max(...decades.map(d => d.volume))

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Time Intelligence</h1>
        <p className="page-sub">Decade-by-decade quality trends and production volume analysis.</p>
      </div>

      {/* Mini-stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Decades Covered', value: `${decades.length}` },
          { label: 'Peak Volume Era', value: peakDecade ? `${peakDecade.decade}s` : '—' },
          { label: 'Peak Film Count', value: peakDecade ? peakDecade.volume.toLocaleString() : '—' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <p className="kpi-label">{s.label}</p>
            <p className="kpi-value" style={{ fontSize: '1.625rem', marginTop: '0.375rem' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quality Trend Line Chart */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p className="section-title" style={{ marginBottom: 0 }}>Avg Rating by Decade</p>
          <span className="tag tag-gold">Quality Trend</span>
        </div>
        <div style={{ height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={decades} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="decade" stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
                tickFormatter={v => `${v}s`} />
              <YAxis stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip content={<ChartTooltip type="rating" />} />
              <Line type="monotone" dataKey="avgRating" stroke="var(--color-gold)" strokeWidth={3}
                dot={{ r: 5, fill: 'var(--color-gold)', stroke: '#000', strokeWidth: 2 }}
                activeDot={{ r: 7, fill: 'var(--color-gold)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Volume Bar Chart */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p className="section-title" style={{ marginBottom: 0 }}>Production Volume by Decade</p>
          <span className="tag tag-blue">Film Count</span>
        </div>
        <div style={{ height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={decades} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="decade" stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
                tickFormatter={v => `${v}s`} />
              <YAxis stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip type="volume" />} cursor={{ fill: 'var(--color-surface-nav)' }} />
              <Bar dataKey="volume" radius={[2, 2, 0, 0]} barSize={32}>
                {decades.map((d, i) => (
                  <Cell key={i}
                    fill={d.volume === maxVol ? 'var(--color-gold)' : 'var(--color-blue)'}
                    fillOpacity={d.volume === maxVol ? 1 : 0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginTop: '0.75rem', textAlign: 'center' }}>
          Gold bar = Peak production decade
        </p>
      </div>
    </div>
  )
}

export default TimeIntelligence
