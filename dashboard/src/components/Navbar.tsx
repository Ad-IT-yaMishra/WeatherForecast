import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  return (
    <nav className={`navbar ${location.pathname === '/' ? 'has-rainbow' : ''}`}>
      <Link to="/">
        <img src="/67642.png" alt="Team Logo" className="nav-logo" />
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Project Overview
          </Link>
        </li>
        <li>
          <Link to="/forecast" className={`nav-link ${location.pathname === '/forecast' ? 'active' : ''}`}>
            AQI Forecast
          </Link>
        </li>
        <li>
          <Link to="/sources" className={`nav-link ${location.pathname === '/sources' ? 'active' : ''}`}>
            Fire Hotspots & Sources
          </Link>
        </li>
        <li>
          <Link to="/dynamics" className={`nav-link ${location.pathname === '/dynamics' ? 'active' : ''}`}>
            Atmospheric Dynamics
          </Link>
        </li>
      </ul>
    </nav>
  )
}