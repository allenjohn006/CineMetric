import React, { useState } from 'react'
import axios from 'axios'
import { Calculator, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const ContentROISimulator = () => {
  const [formData, setFormData] = useState({ genre: 'Action', runtime: 120, certificate: 'PG-13' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/predict-roi', {
        genre: formData.genre,
        runtime: parseInt(formData.runtime),
        certificate: formData.certificate
      })
      setResult(res.data)
    } catch (err) {
      setError('Failed to fetch prediction. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const getSignalColor = (signal) => {
    if (signal === 'Green') return 'text-success border-success bg-success/10'
    if (signal === 'Yellow') return 'text-warning border-warning bg-warning/10'
    return 'text-danger border-danger bg-danger/10'
  }

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary', 'Crime', 'Adventure']
  const certs = ['G', 'PG', 'PG-13', 'R', 'NC-17']

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Content ROI Simulator</h1>
        <p className="text-textMuted">Predict audience reception and get a greenlight investment signal before production using our ML model.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Calculator className="text-primary" />
            Input Parameters
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Primary Genre</label>
              <select 
                className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={formData.genre}
                onChange={e => setFormData({...formData, genre: e.target.value})}
              >
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Runtime (Minutes)</label>
              <input 
                type="number" 
                className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={formData.runtime}
                onChange={e => setFormData({...formData, runtime: e.target.value})}
                min="10" max="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Target Certificate</label>
              <select 
                className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                value={formData.certificate}
                onChange={e => setFormData({...formData, certificate: e.target.value})}
              >
                {certs.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center gap-2 mt-4">
              {loading ? <span className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span> : 'Predict ROI'}
            </button>
            {error && <p className="text-danger text-sm mt-2">{error}</p>}
          </form>
        </div>

        <div className="premium-card flex flex-col justify-center items-center text-center relative overflow-hidden">
          {!result && !loading && (
            <div className="text-textMuted flex flex-col items-center">
              <Clock size={48} className="mb-4 opacity-50" />
              <p>Awaiting parameters to simulate ROI...</p>
            </div>
          )}

          {loading && (
            <div className="text-primary flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
              <p className="animate-pulse">Running Scikit-learn Regression Model...</p>
            </div>
          )}

          {result && !loading && (
            <div className={`w-full h-full flex flex-col justify-center p-8 rounded-xl border-2 ${getSignalColor(result.signal)} animate-slide-up`}>
              <h4 className="uppercase tracking-widest text-sm font-bold mb-2">Predicted Rating</h4>
              <div className="text-7xl font-black mb-4">
                {result.predicted_rating}
                <span className="text-2xl text-white/50 ml-1">/10</span>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 mb-6">
                <p className="text-sm uppercase tracking-wider mb-1 opacity-80">Expected Range</p>
                <p className="font-mono text-xl">{result.range[0]} - {result.range[1]}</p>
              </div>

              <div className="flex items-center justify-center gap-3 text-xl font-bold uppercase tracking-wider">
                {result.signal === 'Green' && <><CheckCircle size={28} /> GREENLIGHT - HIGH ROI</>}
                {result.signal === 'Yellow' && <><AlertCircle size={28} /> YELLOW - PROCEED WITH CAUTION</>}
                {result.signal === 'Red' && <><AlertCircle size={28} /> RED - HIGH RISK, LOW ROI</>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentROISimulator
