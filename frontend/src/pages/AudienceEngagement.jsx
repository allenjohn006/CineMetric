import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={{
      background: 'var(--color-surface-nav)', border: '1px solid var(--color-border-mid)',
      borderRadius: '3px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem',
    }}>
      <p style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>{d.primaryTitle}</p>
      <p style={{ color: 'var(--color-text-muted)' }}>Certificate: <span style={{ color: '#fff', fontWeight: 600 }}>{d.Certificate}</span></p>
      <p style={{ color: 'var(--color-text-muted)' }}>Rating: <span style={{ color: '#fff', fontWeight: 600 }}>{d.averageRating}</span></p>
      <p style={{ color: 'var(--color-text-muted)' }}>Votes: <span style={{ color: '#fff', fontWeight: 600 }}>{Number(d.numVotes).toLocaleString()}</span></p>
    </div>
  )
}

const CustomDot = (props) => {
  const { cx, cy, payload } = props
  let color = 'var(--color-blue)'
  if (payload?.Certificate === 'G') color = 'var(--color-success)'
  else if (payload?.Certificate === 'PG-13') color = 'var(--color-gold)'
  else if (payload?.Certificate === 'R') color = 'var(--color-danger)'
  
  return (
    <circle cx={cx} cy={cy} r={4} fill={color} fillOpacity={0.65} stroke="rgba(0, 0, 0, 0.2)" strokeWidth={0.5} />
  )
}

const AudienceEngagement = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/audience-engagement')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-screen"><div className="spinner"></div><span>Loading audience data…</span></div>

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Audience Engagement</h1>
        <p className="page-sub">Votes vs. Rating correlation — identifying high-reach, high-quality content.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>

        {/* Scatter plot */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <p className="section-title" style={{ marginBottom: '0.25rem' }}>Votes vs. Rating</p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }}></span> G
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-gold)' }}></span> PG-13
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-danger)' }}></span> R
                </span>
              </div>
            </div>
            <span className="tag tag-blue">{data?.scatterData?.length} Titles</span>
          </div>
          <div style={{ height: '380px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 24, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  type="number" dataKey="averageRating" name="Rating" domain={[1, 10]}
                  stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
                  label={{ value: 'Average Rating', position: 'insideBottom', offset: -12, fill: 'var(--color-text-dim)', fontSize: 11 }}
                />
                <YAxis
                  type="number" dataKey="numVotes" name="Votes"
                  stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false}
                />
                <Tooltip content={<ScatterTooltip />} />
                <Scatter data={data?.scatterData ?? []} shape={<CustomDot />} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificate breakdown */}
        <div className="card">
          <p className="section-title">Certificate Effect on Audience</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Average votes per rating certificate — measuring reach by content rating.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(data?.certificateEffect ?? []).map((cert, i) => {
              const maxVotes = Math.max(...(data?.certificateEffect ?? []).map(c => c.avgVotes))
              const pct = (cert.avgVotes / maxVotes) * 100
              let barColor = 'var(--color-blue)'
              if (cert.Certificate === 'G') barColor = 'var(--color-success)'
              else if (cert.Certificate === 'PG-13') barColor = 'var(--color-gold)'
              else if (cert.Certificate === 'R') barColor = 'var(--color-danger)'

              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text)' }}>{cert.Certificate}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{Math.round(cert.avgVotes).toLocaleString()} avg votes</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: barColor }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceEngagement
