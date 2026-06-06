import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, BarChart2, Users, Star,
  TrendingUp, Clock, Clapperboard
} from 'lucide-react'

const navItems = [
  { name: 'Overview',         path: '/dashboard',             icon: LayoutDashboard },
  { name: 'Genre Matrix',     path: '/genre-intelligence',    icon: BarChart2 },
  { name: 'Audience',         path: '/audience-engagement',   icon: Users },
  { name: 'Directors',        path: '/director-star-power',   icon: Star },
  { name: 'ROI Simulator',    path: '/content-roi-simulator', icon: TrendingUp },
  { name: 'Time Intelligence', path: '/time-intelligence',    icon: Clock },
]

const Sidebar = () => (
  <aside style={{
    width: '220px',
    minWidth: '220px',
    background: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  }}>
    {/* Logo */}
    <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Clapperboard size={18} color="var(--color-gold)" />
        <span style={{
          fontSize: '1.125rem',
          fontWeight: 800,
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
        }}>Cine<span style={{ color: 'var(--color-gold)' }}>Metric</span></span>
      </div>
      <p style={{
        fontSize: '0.625rem',
        color: 'var(--color-text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '0.25rem',
        fontWeight: 500,
      }}>Content Intelligence</p>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.75rem' }}>
      <p style={{
        fontSize: '0.625rem',
        color: 'var(--color-text-dim)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 600,
        padding: '0.5rem 0.5rem 0.375rem',
      }}>Analytics</p>
      {navItems.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          style={{ marginBottom: '2px', display: 'flex' }}
        >
          <Icon size={15} />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>

    {/* Footer */}
    <div style={{
      padding: '1rem 1.25rem',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        marginBottom: '0.25rem',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }}></div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Backend Connected</span>
      </div>
      <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-dim)' }}>IMDB Dataset · 368K Records</p>
    </div>
  </aside>
)

export default Sidebar
