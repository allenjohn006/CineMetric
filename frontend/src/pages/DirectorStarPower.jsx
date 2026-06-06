import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Star } from 'lucide-react'

const DirectorStarPower = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/directors-stars')
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
        <h1 className="text-3xl font-bold mb-2">Director & Star Power</h1>
        <p className="text-textMuted">Identify high-ROI creative talent based on historical consistency and average ratings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="premium-card h-[500px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Star className="text-warning" size={20} />
            Top Consistent Directors
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.topDirectors.map((dir, idx) => (
              <div key={idx} className="bg-surface/50 p-4 rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-lg">{dir.name}</p>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {dir.avgRating.toFixed(1)} Avg
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-textMuted">
                  <p>Films: <span className="text-white">{dir.films}</span></p>
                  <p>Consistency (± std dev): <span className="text-success">{dir.consistency.toFixed(2)}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card h-[500px]">
          <h3 className="text-lg font-semibold mb-6">Star Power Index</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data.topDirectors} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[0, 10]} stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="avgRating" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DirectorStarPower
