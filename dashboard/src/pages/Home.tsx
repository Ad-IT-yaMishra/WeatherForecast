import bgImage from '../assets/67307.jpg'

export default function Home() {
  return (
    <div 
      className="home-container" 
      style={{ 
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.75) 100%), url(${bgImage})` 
      }}
    >
      <div className="content-wrapper">
        
        <header className="header-block">
          <div className="typewriter-container">
            <h1 className="typewriter-text">Delhi NCR Air Pollution Forecast</h1>
          </div>
          <p className="subtitle">Coupled Weather & Emission Predictive Dashboard</p>
        </header>

        <div className="section-block">
          <h2 className="heightened-heading">The Problem Statement</h2>
          <p className="section-text">
            Delhi NCR suffers from severe winter air pollution. The root cause is a dangerous mix of trapped cold weather and heavy smoke from nearby farm fires. Current tools struggle to predict exactly when and where sudden weather changes will trap this smoke and cause pollution levels to spike dangerously.
          </p>
        </div>

        <div className="section-block">
          <h2 className="heightened-heading">Our Solution</h2>
          <p className="section-text">
            We built a real-time, 72-hour forecasting dashboard that connects weather dynamics with regional pollution sources. This gives policymakers a clear, actionable view of exactly what is happening in the air.
          </p>
          
          <ul className="bullet-list">
            <li className="bullet-item">
              <span className="bullet-bold">Predictive Modeling: </span> 
              Forecasts pollution levels 72 hours in advance by calculating how local wind and temperature changes will affect incoming smoke.
            </li>
            <li className="bullet-item">
              <span className="bullet-bold">Live Hotspot Mapping: </span> 
              Tracks active agricultural farm fires in neighboring states and maps the exact path the wind will blow the smoke.
            </li>
            <li className="bullet-item">
              <span className="bullet-bold">Inversion Alerts: </span> 
              Detects when cold air acts like a "lid" over the city, trapping pollutants at the surface level so authorities can take emergency action.
            </li>
            <li className="bullet-item">
              <span className="bullet-bold">Pollutant Breakdown: </span> 
              Identifies the exact percentage of pollution coming from fires, traffic, construction, and industry in real-time.
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}