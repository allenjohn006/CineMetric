import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clapperboard, TrendingUp, BarChart2, Cpu, ChevronRight, Star, Users, Clock, Activity } from 'lucide-react'

const STATS = [
  { value: '368K+', label: 'Films Analyzed' },
  { value: '7 Decades', label: 'Historical Coverage' },
  { value: '27 Genres', label: 'Genre Categories' },
  { value: 'ML-Powered', label: 'ROI Prediction' },
]

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Genre BCG Matrix',
    desc: 'Map every genre across a 4-quadrant Stars / Cash Cows / Niche Gems / Dogs scatter plot. Know exactly where to allocate acquisition budgets.',
    color: 'var(--color-blue)',
  },
  {
    icon: Cpu,
    title: 'ML ROI Simulator',
    desc: 'Input genre, runtime, and certificate target. Our scikit-learn RandomForest model returns a predicted rating range and a Green/Yellow/Red investment signal.',
    color: 'var(--color-gold)',
  },
  {
    icon: TrendingUp,
    title: 'Audience Intelligence',
    desc: 'Visualize the correlation between vote counts and critical ratings. Identify engagement tiers and certificate effects on audience size.',
    color: 'var(--color-success)',
  },
  {
    icon: Users,
    title: 'Director Star Power',
    desc: 'Rank directors by average rating and consistency score. Surface talent whose track record signals reliable, high-quality output.',
    color: '#A78BFA',
  },
  {
    icon: Clock,
    title: 'Time Intelligence',
    desc: 'Decade-by-decade production volume and quality trend charts. Identify golden eras and spot genre cycles before your competitors.',
    color: '#FB7185',
  },
  {
    icon: Activity,
    title: 'Executive KPIs',
    desc: 'A single-screen stakeholder view — total titles, average ratings, top genre, most-voted film, and quality trend lines at a glance.',
    color: 'var(--color-gold)',
  },
]

const Landing = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>

      {/* ── TOP NAV ─────────────────────────────────────────────── */}
      <nav style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2.5rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clapperboard size={18} color="var(--color-gold)" />
          <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.02em' }}>
            Cine<span style={{ color: 'var(--color-gold)' }}>Metric</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="https://github.com/allenjohn006/CineMetric" target="_blank" rel="noreferrer"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            GitHub
          </a>
          <button className="btn-gold" onClick={() => navigate('/dashboard')} style={{ fontSize: '0.8125rem', padding: '0.4rem 1.1rem' }}>
            Open Dashboard
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '7rem 2rem 5rem',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--color-gold-dim)',
          border: '1px solid rgba(245,197,24,0.25)',
          borderRadius: '3px',
          padding: '0.3rem 0.9rem',
          marginBottom: '2rem',
        }}>
          <Star size={11} color="var(--color-gold)" fill="var(--color-gold)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Enterprise Content Intelligence
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--color-text)',
          marginBottom: '1.5rem',
        }}>
          Cine <span style={{ color: 'var(--color-gold)' }}>Metric</span><br />
        </h1>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--color-text)',
          marginBottom: '1.5rem',
        }}>
          Data-Driven Decisions For Modern OTT.
        </h2>

        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-muted)',
          maxWidth: '640px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
          fontWeight: 400,
        }}>
          CineMetric transforms 368,000 IMDB records into acquisition signals.
          Analyze genre performance, predict ratings with machine learning, and
          surface high-ROI talent — all in one platform built for OTT strategy teams.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold"
            onClick={() => navigate('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem', padding: '0.75rem 2rem' }}>
            Launch Dashboard <ChevronRight size={16} />
          </button>
          <button className="btn-outline"
            onClick={() => navigate('/content-roi-simulator')}
            style={{ fontSize: '0.9375rem', padding: '0.75rem 2rem' }}>
            Try ROI Simulator
          </button>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '0',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: '1.75rem 2rem',
              borderRight: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ───────────────────────────────────────── */}
      <section style={{ maxWidth: '980px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Six Intelligence Modules
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
            Every panel purpose-built for content acquisition decisions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border)' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'var(--color-surface)',
              padding: '2rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-nav)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '4px',
                background: f.color + '1A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <f.icon size={18} color={f.color} />
              </div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text)' }}>{f.title}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.875rem' }}>
          Ready to start acquiring smarter?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginBottom: '2rem' }}>
          No sales call required. Open the dashboard and start exploring your data.
        </p>
        <button className="btn-gold"
          onClick={() => navigate('/dashboard')}
          style={{ fontSize: '0.9375rem', padding: '0.875rem 2.5rem' }}>
          Open CineMetric →
        </button>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '1.5rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clapperboard size={14} color="var(--color-text-dim)" />
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-dim)', fontWeight: 600 }}>
            CineMetric
          </span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
          Built with FastAPI · scikit-learn · React · Recharts
        </p>
      </footer>
    </div>
  )
}

export default Landing
