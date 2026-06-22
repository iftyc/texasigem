import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Survey from './pages/Survey.jsx'
import Analytics from './pages/Analytics.jsx'
import Placeholder from './pages/Placeholder.jsx'
import './App.css'

/* ---------- nav structure (mirrors Lambert GA) ---------- */
const NAV = [
  {
    label: 'Project',
    items: [
      { to: '/project/description',  label: 'Description' },
      { to: '/project/design',        label: 'Design' },
      { to: '/project/results',       label: 'Results' },
      { to: '/project/proof',         label: 'Proof of Concept' },
      { to: '/project/contribution',  label: 'Contribution' },
    ],
  },
  {
    label: 'Wet Lab',
    items: [
      { to: '/wetlab/engineering',  label: 'Engineering' },
      { to: '/wetlab/experiments',  label: 'Experiments' },
      { to: '/wetlab/notebook',     label: 'Notebook' },
      { to: '/wetlab/safety',       label: 'Safety' },
    ],
  },
  {
    label: 'Dry Lab',
    items: [
      { to: '/drylab/model',      label: 'Model' },
      { to: '/drylab/software',   label: 'Software' },
      { to: '/analytics',         label: 'Analytics' },
    ],
  },
  {
    label: 'Human Practices',
    items: [
      { to: '/hp/overview',     label: 'Overview' },
      { to: '/hp/integrated',   label: 'Integrated HP' },
      { to: '/hp/education',    label: 'Education' },
      { to: '/survey',          label: 'Survey' },
    ],
  },
  {
    label: 'Team',
    items: [
      { to: '/team',               label: 'Members' },
      { to: '/team/attributions',  label: 'Attributions' },
      { to: '/team/collaborations',label: 'Collaborations' },
    ],
  },
  {
    label: 'Awards',
    to: '/awards',
  },
]

/* ---------- Dropdown item ---------- */
function DropdownMenu({ nav, closeAll }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (nav.to) {
    // leaf item (Awards)
    return (
      <NavLink
        to={nav.to}
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        onClick={closeAll}
      >
        {nav.label}
      </NavLink>
    )
  }

  const isGroupActive = nav.items.some(
    (item) => window.location.pathname.startsWith(item.to)
  )

  return (
    <div
      ref={ref}
      className={`nav-dropdown${open ? ' open' : ''}${isGroupActive ? ' group-active' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="nav-link nav-dropdown-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {nav.label}
        <svg className="nav-chevron" viewBox="0 0 10 6" width="10" height="6">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <div className="nav-dropdown-menu">
        {nav.items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-dropdown-item${isActive ? ' active' : ''}`}
            onClick={() => { setOpen(false); closeAll() }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

/* ---------- Mobile nav item ---------- */
function MobileNavItem({ nav, closeAll }) {
  const [open, setOpen] = useState(false)

  if (nav.to) {
    return (
      <NavLink
        to={nav.to}
        className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
        onClick={closeAll}
      >
        {nav.label}
      </NavLink>
    )
  }

  return (
    <div className={`mobile-nav-group${open ? ' open' : ''}`}>
      <button
        className="mobile-nav-link mobile-nav-group-btn"
        onClick={() => setOpen((v) => !v)}
      >
        {nav.label}
        <svg className="nav-chevron" viewBox="0 0 10 6" width="10" height="6">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="mobile-nav-sub">
          {nav.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-nav-sub-link${isActive ? ' active' : ''}`}
              onClick={closeAll}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <div className="app">
      {/* ---- Navbar ---- */}
      <header className="navbar">
        <Link to="/" className="navbar-brand">
          Texas iGEM <span>Collective</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {NAV.map((item) => (
            <DropdownMenu key={item.label} nav={item} closeAll={() => {}} />
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-nav">
          {NAV.map((item) => (
            <MobileNavItem
              key={item.label}
              nav={item}
              closeAll={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}

      {/* ---- Routes ---- */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Project */}
          <Route path="/project/description"  element={<Placeholder section="Project" title="Description" />} />
          <Route path="/project/design"       element={<Placeholder section="Project" title="Design" />} />
          <Route path="/project/results"      element={<Placeholder section="Project" title="Results" />} />
          <Route path="/project/proof"        element={<Placeholder section="Project" title="Proof of Concept" />} />
          <Route path="/project/contribution" element={<Placeholder section="Project" title="Contribution" />} />

          {/* Wet Lab */}
          <Route path="/wetlab/engineering"   element={<Placeholder section="Wet Lab" title="Engineering" />} />
          <Route path="/wetlab/experiments"   element={<Placeholder section="Wet Lab" title="Experiments" />} />
          <Route path="/wetlab/notebook"      element={<Placeholder section="Wet Lab" title="Notebook" />} />
          <Route path="/wetlab/safety"        element={<Placeholder section="Wet Lab" title="Safety" />} />

          {/* Dry Lab */}
          <Route path="/drylab/model"    element={<Placeholder section="Dry Lab" title="Model" />} />
          <Route path="/drylab/software" element={<Placeholder section="Dry Lab" title="Software" />} />
          <Route path="/analytics"       element={<Analytics />} />

          {/* Human Practices */}
          <Route path="/hp/overview"   element={<Placeholder section="Human Practices" title="Overview" />} />
          <Route path="/hp/integrated" element={<Placeholder section="Human Practices" title="Integrated HP" />} />
          <Route path="/hp/education"  element={<Placeholder section="Human Practices" title="Education" />} />
          <Route path="/survey"        element={<Survey />} />

          {/* Team */}
          <Route path="/team"                  element={<AboutUs />} />
          <Route path="/team/attributions"     element={<Placeholder section="Team" title="Attributions" />} />
          <Route path="/team/collaborations"   element={<Placeholder section="Team" title="Collaborations" />} />

          {/* Awards */}
          <Route path="/awards" element={<Placeholder section="" title="Awards" />} />

          {/* Legacy / fallback */}
          <Route path="/about" element={<Navigate to="/team" replace />} />
          <Route path="*"      element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        &copy; {new Date().getFullYear()} Texas iGEM Collective &mdash; A 501(c)(3) nonprofit.
      </footer>
    </div>
  )
}
