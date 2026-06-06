import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-surface-nav)', border: '1px solid var(--color-border-mid)',
      borderRadius: '3px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem',
    }}>
      <p style={{ color: 'var(--color-text-muted)' }}>Avg Rating: <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{payload[0].value?.toFixed(2)}</span></p>
    </div>
  )
}

const DirectorStarPower = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/directors-stars')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner"></div><span>Loading director data…</span></div>

  const directors = data?.topDirectors ?? []
  const ranked = [...directors].sort((a, b) => b.avgRating - a.avgRating)

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Director & Star Power</h1>
        <p className="page-sub">Ranking creative talent by average rating and consistency score.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

        {/* Ranked list */}
        <div className="card">
          <p className="section-title">Consistency Leaderboard</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {ranked.map((dir, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.875rem 0',
                borderBottom: i < ranked.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontWeight: 700, width: 20, textAlign: 'right' }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.125rem' }}>{dir.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {dir.films} films · consistency ±{dir.consistency.toFixed(2)}
                  </p>
                </div>
                <span style={{
                  background: 'var(--color-gold-dim)',
                  color: 'var(--color-gold)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  padding: '0.2rem 0.625rem',
                  borderRadius: '3px',
                  letterSpacing: '-0.01em',
                }}>
                  ★ {dir.avgRating.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="card">
          <p className="section-title">Star Power Index</p>
          <div style={{ height: '340px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ranked} layout="vertical" margin={{ top: 4, right: 24, left: 10, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 10]} stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} width={130} />
                <Tooltip content={<BarTooltip />} cursor={{ fill: 'var(--color-surface-nav)' }} />
                <Bar dataKey="avgRating" radius={[0, 2, 2, 0]} barSize={22}>
                  {ranked.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-gold)' : 'var(--color-blue)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectorStarPower
