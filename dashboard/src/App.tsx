import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './Dashboard.css' 
import Home from './pages/Home'
import AirQuality from './pages/AirQuality'
import Hotspots from './pages/Hotspots'
import AboutUs from './pages/AboutUs'
import Navbar from './components/Navbar'
import { LocationProvider } from './context/LocationContext'

export default function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/air-quality" element={<AirQuality />} />
            <Route path="/hotspots" element={<Hotspots />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Navbar />
        </div>
      </Router>
    </LocationProvider>
  )
}