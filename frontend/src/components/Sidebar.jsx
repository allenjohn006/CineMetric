import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PieChart, Users, Star, TrendingUp, Clock } from 'lucide-react'

const Sidebar = () => {
  const navItems = [
    { name: 'Executive Overview', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Genre Intelligence', path: '/genre-intelligence', icon: <PieChart size={20} /> },
    { name: 'Audience Engagement', path: '/audience-engagement', icon: <Users size={20} /> },
    { name: 'Director & Star Power', path: '/director-star-power', icon: <Star size={20} /> },
    { name: 'Content ROI Simulator', path: '/content-roi-simulator', icon: <TrendingUp size={20} /> },
    { name: 'Time Intelligence', path: '/time-intelligence', icon: <Clock size={20} /> },
  ]

  return (
    <div className="w-64 glass-panel border-l-0 border-t-0 border-b-0 rounded-none h-full flex flex-col relative z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-1 tracking-tight">
          CineMetric
        </h1>
        <p className="text-xs text-textMuted uppercase tracking-wider font-semibold">Content Intelligence</p>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                      : 'text-textMuted hover:bg-white/5 hover:text-text'
                  }`
                }
              >
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 mt-auto">
        <div className="glass-panel p-4 rounded-xl text-xs text-textMuted text-center border-white/5 bg-black/20">
          Powered by ML<br />IMDB Dataset Analysis
        </div>
      </div>
    </div>
  )
}

export default Sidebar
