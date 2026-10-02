import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  return (
    <>
      <div className="vayu-logo-box">
        <img src="/67642.png" alt="VayuCast Logo" />
        <span>VayuCast</span>
      </div>

      <nav className="vayu-nav-bar">
        <Link to="/" className={`vayu-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill={location.pathname === '/' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </Link>
        <Link to="/air-quality" className={`vayu-nav-link ${location.pathname === '/air-quality' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill={location.pathname === '/air-quality' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span>Air Quality</span>
        </Link>
        <Link to="/hotspots" className={`vayu-nav-link ${location.pathname === '/hotspots' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill={location.pathname === '/hotspots' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          <span>Hotspot</span>
        </Link>
        <Link to="/about" className={`vayu-nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill={location.pathname === '/about' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>About Us</span>
        </Link>
      </nav>
    </>
  )
}