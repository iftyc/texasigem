import { useState } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Survey from './pages/Survey.jsx'
import Analytics from './pages/Analytics.jsx'
import './App.css'

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/survey', label: 'Survey' },
  { to: '/analytics', label: 'Analytics' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-brand">Texas IGEM</div>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
              end={tab.to === '/'}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
