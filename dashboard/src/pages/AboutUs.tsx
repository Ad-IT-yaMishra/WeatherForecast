export default function AboutUs() {
  return (
    <div className="page-wrapper">
      <div className="glass-card about-card">
        <h1 className="about-title">Delhi NCR Air Pollution Observatory</h1>
        <p className="about-subtitle">Coupled Meteorology-Chemistry Forecasting & Source Apportionment</p>
        
        <div className="about-section">
          <h2>1. The Problem Statement: The Indo-Gangetic Air Basin Crisis</h2>
          <p>
            The National Capital Region (NCR) of Delhi faces an acute and persistent air quality emergency every winter. Positioned within the landlocked Indo-Gangetic Plain (IGP), Delhi sits inside a natural atmospheric sink bordered by the Himalayas to the north and the Aravalli range to the southwest.
          </p>
          <p>
            Between October and January, meteorological conditions undergo a drastic transition. Synoptic wind velocities drop below 2 m/s, causing prolonged surface stagnation. Radiative cooling during clear autumn nights triggers sharp nocturnal temperature inversions, trapping vehicular tailpipe emissions, construction dust, and transboundary smoke within a shallow Planetary Boundary Layer (PBL) barely 100 to 250 meters high.
          </p>
        </div>

        <div className="about-section">
          <h2>2. Public Health Impact & Societal Toll</h2>
          <p>
            According to the Air Quality Life Index (AQLI) published by the Energy Policy Institute at the University of Chicago (EPIC), prolonged exposure to fine particulate matter (PM2.5) reduces the life expectancy of Delhi residents by upwards of 10.2 years relative to WHO guidelines. 
          </p>
          <p>
            The ultra-fine particulate fraction ($PM_{2.5}$ and $PM_{1.0}$) crosses the alveolar-capillary membrane directly into the bloodstream, precipitating chronic obstructive pulmonary disease (COPD), severe ischemic heart disease, stroke, and pediatric bronchial hyperresponsiveness. During peak inversion episodes, emergency pediatric hospital admissions for acute respiratory distress surge by over 300%, while forced school closures disrupt the academic calendar.
          </p>
        </div>

        <div className="about-section">
          <h2>3. Our Solution: Coupled WRF-Chem & Diurnal Modeling</h2>
          <p>
            Traditional monitoring simply registers pollution that has already choked the city. Our platform implements an advance forecasting framework:
          </p>
          <ul className="about-list">
            <li>
              <strong>Coupled Diurnal Boundary-Layer Simulation:</strong> Simulates day-night cycles of thermal stability, predicting the exact nocturnal drop in planetary boundary layer height 72 hours ahead.
            </li>
            <li>
              <strong>High-Resolution Dispersion Modeling:</strong> Translates point-source agricultural fire detections from MODIS and VIIRS satellite sensors into plume trajectories crossing Haryana and Punjab towards the capital.
            </li>
            <li>
              <strong>Chemical Apportionment Matrix:</strong> Disentangles secondary inorganic aerosol formation (nitrates and sulfates) from primary vehicular black carbon using real-time gas precursors ($NO_2$, $SO_2$, $CO$, and $NH_3$).
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>4. Actionable Mitigation & Protection Protocols</h2>
          <div className="protocols-grid">
            <div className="protocol-box glass-pill">
              <h3>Individual Shielding</h3>
              <p>Mandatory use of certified N95 or FFP2 respirators; avoid non-certified cloth masks which offer zero filtration against sub-micron aerosol particles.</p>
            </div>
            <div className="protocol-box glass-pill">
              <h3>Micro-Environment Management</h3>
              <p>Employ sealed mechanical air purification with True HEPA grade filters. Ventilate indoor spaces strictly during peak solar hours (1 PM to 3 PM) when PBL height is maximized.</p>
            </div>
            <div className="protocol-box glass-pill">
              <h3>Civic Interventions</h3>
              <p>Enforce Graded Response Action Plan (GRAP IV) stage triggers before severe index saturation occurs, including restrictions on heavy diesel traffic and localized anti-smog misting.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>5. Foundational Scientific Literature & Research Citations</h2>
          <div className="citations-list">
            <div className="citation-item glass-pill">
              <span className="citation-badge">IIT Kanpur Report (2016)</span>
              <strong>Comprehensive Study on Air Pollution and Green House Gases in Delhi:</strong> Sharma, M. & Dikshit, O. Identified vehicular emissions, road dust resuspension, and transboundary biomass burning as primary contributors to Delhi's fine particulate mass.
            </div>
            <div className="citation-item glass-pill">
              <span className="citation-badge">SAFAR / IITM Pune (2020)</span>
              <strong>System of Air Quality and Weather Forecasting and Research:</strong> Beig, G. et al. Pioneered coupled high-resolution chemical transport modeling for early warning and agricultural stubble plume tracking across northern India.
            </div>
            <div className="citation-item glass-pill">
              <span className="citation-badge">The Lancet Planetary Health (2021)</span>
              <strong>Health and economic impact of air pollution in the states of India:</strong> Pandey, A. et al. Documented that 1.67 million deaths in India were attributable to toxic ambient air, generating economic output losses exceeding 1.36% of national GDP.
            </div>
            <div className="citation-item glass-pill">
              <span className="citation-badge">TERI & ARAI Source Apportionment (2018)</span>
              <strong>Source Apportionment of PM2.5 & PM10 in Delhi NCR:</strong> Demonstrated that up to 36% of Delhi’s winter PM2.5 originates outside territorial borders, establishing the urgent need for airshed-level regional governance.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}