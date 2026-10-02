import { useContext, useState, useEffect, useRef } from 'react'
import { LocationContext } from '../context/LocationContext'

export default function TopHeader() {
  const { selectedLocation, setSelectedLocation, locations } = useContext(LocationContext)
  const [dateTime, setDateTime] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }
      const dateStr = now.toLocaleDateString('en-US', options)
      const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      setDateTime(`${dateStr} | ${timeStr}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="glass-card header-widget-row">
      <div className="datetime-row-left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="calendar-icon-large">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>{dateTime}</span>
      </div>

      <div 
        className="location-select-wrapper" 
        onClick={() => setIsOpen(!isOpen)}
        ref={dropdownRef}
      >
        <svg viewBox="0 0 24 24" fill="#fef08a" stroke="none" className="location-icon-yellow">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
        </svg>
        
        <div className="custom-selected-value">{selectedLocation}</div>
        
        <svg viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>

        {isOpen && (
          <div className="custom-options-container">
            {locations.map(loc => (
              <div 
                key={loc} 
                className={`custom-option ${loc === selectedLocation ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedLocation(loc)
                  setIsOpen(false)
                }}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}