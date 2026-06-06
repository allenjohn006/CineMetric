import React, { useState } from 'react'
import axios from 'axios'
import { Cpu, ChevronRight, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const GENRES = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western']
const CERTS = ['G', 'PG-13', 'R']

const SignalIcon = ({ signal }) => {
  if (signal === 'Green') return <CheckCircle size={24} color="var(--color-success)" />
  if (signal === 'Yellow') return <AlertCircle size={24} color="var(--color-gold)" />
  return <XCircle size={24} color="var(--color-danger)" />
}

const ContentROISimulator = () => {
  const [form, setForm] = useState({ genre: 'Drama', runtime: 110, certificate: 'PG-13' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const signalColor = {
    Green: 'var(--color-success)', Yellow: 'var(--color-gold)', Red: 'var(--color-danger)'
  }
  const signalLabel = {
    Green: 'GREENLIGHT — High ROI Signal', Yellow: 'CAUTION — Moderate Risk', Red: 'HIGH RISK — Low ROI Signal'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/predict-roi', {
        genre: form.genre, runtime: parseInt(form.runtime), certificate: form.certificate,
      })
      setResult(res.data)
    } catch {
      setError('Prediction failed. Ensure the FastAPI backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="page-title">Content ROI Simulator</h1>
        <p className="page-sub">ML-powered rating prediction and investment signal — before you greenlight.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

        {/* Input Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Cpu size={16} color="var(--color-gold)" />
            <p className="section-title" style={{ marginBottom: 0 }}>Input Parameters</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Primary Genre</label>
              <select className="form-select" value={form.genre}
                onChange={e => setForm({ ...form, genre: e.target.value })}>
                {GENRES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Runtime (minutes)</label>
              <input type="number" className="form-input" min="30" max="360"
                value={form.runtime} onChange={e => setForm({ ...form, runtime: e.target.value })} />
              <div style={{ marginTop: '0.5rem', height: '3px', background: 'var(--color-surface-alt)', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${((form.runtime - 30) / 330) * 100}%`, background: 'var(--color-gold)', borderRadius: '2px', transition: 'width 0.2s' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
                <span>30 min</span><span>360 min</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Target Certificate</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {CERTS.map(c => (
                  <button key={c} type="button"
                    onClick={() => setForm({ ...form, certificate: c })}
                    style={{
                      flex: 1, padding: '0.5rem', borderRadius: '3px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', border: '1px solid',
                      borderColor: form.certificate === c ? 'var(--color-gold)' : 'var(--color-border-mid)',
                      background: form.certificate === c ? 'var(--color-gold-dim)' : 'var(--color-surface-nav)',
                      color: form.certificate === c ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      transition: 'all 0.15s',
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}>
              {loading
                ? <><span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #000', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite', display: 'inline-block' }}></span>Predicting…</>
                : <><ChevronRight size={16} />Run Prediction</>}
            </button>

            {error && <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-danger)' }}>{error}</p>}
          </form>
        </div>

        {/* Result */}
        <div className="card" style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!result && !loading && (
            <div style={{ textAlign: 'center', color: 'var(--color-text-dim)' }}>
              <Cpu size={36} style={{ marginBottom: '0.875rem', opacity: 0.4 }} />
              <p style={{ fontSize: '0.875rem' }}>Configure parameters and run the prediction model.</p>
            </div>
          )}
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Running RandomForestRegressor…</p>
            </div>
          )}
          {result && !loading && (
            <div style={{ animation: 'slideUp 0.4s ease-out' }}>
              {/* Signal */}
              <div style={{
                border: `1px solid ${signalColor[result.signal]}`,
                background: signalColor[result.signal] + '18',
                borderRadius: '3px',
                padding: '0.875rem 1.125rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <SignalIcon signal={result.signal} />
                <div>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: signalColor[result.signal], marginBottom: '0.125rem' }}>
                    Investment Signal
                  </p>
                  <p style={{ fontWeight: 700, color: signalColor[result.signal], fontSize: '0.9375rem' }}>
                    {signalLabel[result.signal]}
                  </p>
                </div>
              </div>

              {/* Predicted Rating */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <p className="kpi-label" style={{ marginBottom: '0.5rem' }}>Predicted IMDB Rating</p>
                <p style={{ fontSize: '5rem', fontWeight: 800, color: 'var(--color-gold)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {result.predicted_rating}
                  <span style={{ fontSize: '1.5rem', color: 'var(--color-text-dim)', fontWeight: 400 }}>/10</span>
                </p>
              </div>

              {/* Range */}
              <div style={{ background: 'var(--color-surface-nav)', border: '1px solid var(--color-border)', borderRadius: '3px', padding: '0.875rem 1rem' }}>
                <p className="kpi-label" style={{ marginBottom: '0.375rem' }}>Expected Range</p>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text)', fontFamily: 'monospace' }}>
                  {result.range[0]} – {result.range[1]}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
                  Based on RandomForestRegressor · RMSE ≈ 1.12
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentROISimulator
