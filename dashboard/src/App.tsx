import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Forecast from './pages/Forecast'
import Sources from './pages/Sources'
import Dynamics from './pages/Dynamics'
import './Dashboard.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="/dynamics" element={<Dynamics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}