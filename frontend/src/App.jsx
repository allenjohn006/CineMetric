import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ExecutiveOverview from './pages/ExecutiveOverview'
import GenreIntelligence from './pages/GenreIntelligence'
import AudienceEngagement from './pages/AudienceEngagement'
import DirectorStarPower from './pages/DirectorStarPower'
import ContentROISimulator from './pages/ContentROISimulator'
import TimeIntelligence from './pages/TimeIntelligence'

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <Routes>
            <Route path="/" element={<ExecutiveOverview />} />
            <Route path="/genre-intelligence" element={<GenreIntelligence />} />
            <Route path="/audience-engagement" element={<AudienceEngagement />} />
            <Route path="/director-star-power" element={<DirectorStarPower />} />
            <Route path="/content-roi-simulator" element={<ContentROISimulator />} />
            <Route path="/time-intelligence" element={<TimeIntelligence />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
