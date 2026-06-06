import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Film, Star, TrendingUp, Award } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const MetricCard = ({ title, value, icon, delay }) => (
  <div className={`premium-card flex items-center gap-4 animate-slide-up`} style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}>
    <div className="p-4 bg-primary/20 rounded-xl text-primary">
      {icon}
    </div>
    <div>
      <p className="text-sm text-textMuted font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-text">{value}</h3>
    </div>
  </div>
)

const ExecutiveOverview = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/kpis')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Executive Overview</h1>
        <p className="text-textMuted">High-level insights into the IMDB content ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Movies Analyzed" value={data.totalMovies.toLocaleString()} icon={<Film size={28} />} delay={0.1} />
        <MetricCard title="Global Avg Rating" value={data.avgRating} icon={<Star size={28} />} delay={0.2} />
        <MetricCard title="Top Performing Genre" value={data.topGenre} icon={<TrendingUp size={28} />} delay={0.3} />
        <MetricCard title="Most Voted Film" value={data.mostVotedFilm} icon={<Award size={28} />} delay={0.4} />
      </div>

      <div className="premium-card mt-8 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <h3 className="text-lg font-semibold mb-6">Content Quality Trend (Avg Rating by Year)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.qualityTrend}>
              <defs>
                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="startYear" stroke="#94a3b8" />
              <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="averageRating" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRating)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveOverview
