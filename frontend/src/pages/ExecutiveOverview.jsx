import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Film, Star, TrendingUp, Award, ArrowUpRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const KPICard = ({ title, value, icon: Icon, delay }) => (
  <div className="card card-hover" style={{
    animationName: 'slideUp', animationDuration: '0.5s', animationFillMode: 'both',
    animationDelay: `${delay}s`,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p className="kpi-label">{title}</p>
        <p className="kpi-value" style={{ marginTop: '0.5rem', fontSize: '1.875rem' }}>{value}</p>
      </div>
      <div style={{
        width: 36, height: 36, background: 'var(--color-gold-dim)',
        borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={16} color="var(--color-gold)" />
      </div>
    </div>
    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-dim)', fontSize: '0.75rem' }}>
      <ArrowUpRight size={12} />
      <span>IMDB Dataset · 368K Records</span>
    </div>
  </div>
)

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-surface-nav)', border: '1px solid var(--color-border-mid)',
      borderRadius: '3px', padding: '0.625rem 0.875rem', fontSize: '0.8125rem',
    }}>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{payload[0].value?.toFixed(2)} avg rating</p>
    </div>
  )
}

const ExecutiveOverview = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/kpis')
      .then(res => { setData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <span>Loading executive overview…</span>
    </div>
  )

  if (!data) return (
    <div className="loading-screen">
      <span style={{ color: 'var(--color-danger)' }}>Failed to connect to API. Is the backend running?</span>
    </div>
  )

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Executive Overview</h1>
        <p className="page-sub">High-level content intelligence for stakeholder decisions.</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <KPICard title="Total Titles" value={data.totalMovies?.toLocaleString()} icon={Film} delay={0.05} />
        <KPICard title="Global Avg Rating" value={data.avgRating} icon={Star} delay={0.1} />
        <KPICard title="Top Genre" value={data.topGenre} icon={TrendingUp} delay={0.15} />
        <KPICard title="Most Voted" value={data.mostVotedFilm?.slice(0, 18) + (data.mostVotedFilm?.length > 18 ? '…' : '')} icon={Award} delay={0.2} />
      </div>

      {/* Chart */}
      <div className="card" style={{ animationName: 'slideUp', animationDuration: '0.5s', animationFillMode: 'both', animationDelay: '0.25s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <p className="section-title" style={{ marginBottom: 0 }}>Content Quality Trend</p>
          <span className="tag tag-gold">By Year</span>
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.qualityTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
              <defs>
                <linearGradient id="gold-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C518" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="startYear" stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-dim)" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 0.3', 'dataMax + 0.3']} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="averageRating" stroke="#F5C518" strokeWidth={2.5} fill="url(#gold-fill)" dot={false} activeDot={{ r: 4, fill: '#F5C518', stroke: '#000' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveOverview
