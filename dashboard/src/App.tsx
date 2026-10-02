import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LocationProvider } from './context/LocationContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AirQuality from './pages/AirQuality'
import Hotspots from './pages/Hotspots'
import AboutUs from './pages/AboutUs'
import './Dashboard.css'

export default function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="app-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/air-quality" element={<AirQuality />} />
              <Route path="/hotspots" element={<Hotspots />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
          <Navbar />
        </div>
      </Router>
    </LocationProvider>
  )
}