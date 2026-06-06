import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const TimeIntelligence = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/time-intelligence')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Time Intelligence</h1>
        <p className="text-textMuted">Analyze historical production volume and quality trends over decades.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="premium-card h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Quality Trend (Avg Rating by Decade)</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data.decadeTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="decade" stroke="#94a3b8" tickFormatter={(val) => `${val}s`} />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                labelFormatter={(val) => `${val}s`}
              />
              <Line type="monotone" dataKey="avgRating" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#1e293b' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card h-[400px]">
          <h3 className="text-lg font-semibold mb-6">Production Volume by Decade</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data.decadeTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="decade" stroke="#94a3b8" tickFormatter={(val) => `${val}s`} />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
                labelFormatter={(val) => `${val}s`}
              />
              <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default TimeIntelligence
