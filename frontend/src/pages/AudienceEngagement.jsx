import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts'

const AudienceEngagement = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/audience-engagement')
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  if (loading) return <div className="flex h-full items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="glass-panel p-4">
          <p className="font-bold text-primary mb-2">{point.primaryTitle}</p>
          <p className="text-sm">Rating: <span className="font-semibold text-white">{point.averageRating}</span></p>
          <p className="text-sm">Votes: <span className="font-semibold text-white">{point.numVotes.toLocaleString()}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audience Engagement Analysis</h1>
        <p className="text-textMuted">Explore the correlation between audience size (votes) and critical reception (rating).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card h-[500px]">
          <h3 className="text-lg font-semibold mb-6">Votes vs. Rating Correlation</h3>
          <ResponsiveContainer width="100%" height="90%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="averageRating" name="Rating" domain={[1, 10]} stroke="#94a3b8" label={{ value: 'Average Rating', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
              <YAxis type="number" dataKey="numVotes" name="Votes" stroke="#94a3b8" label={{ value: 'Number of Votes', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
              <ZAxis type="number" range={[20, 20]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Movies" data={data.scatterData} fill="#3b82f6" fillOpacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Certificate Effect on Audience Size</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.certificateEffect.map((cert, idx) => (
              <div key={idx} className="bg-surface/50 p-4 rounded-lg border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {cert.Certificate}
                  </div>
                  <div>
                    <p className="text-sm text-textMuted">Avg. Votes</p>
                    <p className="font-semibold text-lg">{Math.round(cert.avgVotes).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceEngagement
