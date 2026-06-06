import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Sidebar from './components/Sidebar'
import ExecutiveOverview from './pages/ExecutiveOverview'
import GenreIntelligence from './pages/GenreIntelligence'
import AudienceEngagement from './pages/AudienceEngagement'
import DirectorStarPower from './pages/DirectorStarPower'
import ContentROISimulator from './pages/ContentROISimulator'
import TimeIntelligence from './pages/TimeIntelligence'
import './index.css'

const DashboardLayout = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--color-bg)' }}>
    <Sidebar />
    <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {children}
      </div>
    </div>
  </div>
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<DashboardLayout><ExecutiveOverview /></DashboardLayout>} />
      <Route path="/genre-intelligence" element={<DashboardLayout><GenreIntelligence /></DashboardLayout>} />
      <Route path="/audience-engagement" element={<DashboardLayout><AudienceEngagement /></DashboardLayout>} />
      <Route path="/director-star-power" element={<DashboardLayout><DirectorStarPower /></DashboardLayout>} />
      <Route path="/content-roi-simulator" element={<DashboardLayout><ContentROISimulator /></DashboardLayout>} />
      <Route path="/time-intelligence" element={<DashboardLayout><TimeIntelligence /></DashboardLayout>} />
    </Routes>
  )
}

export default App
