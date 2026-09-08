export default function InversionPanel() {
  return (
    <div className="inversion-panel">
      <div className="inversion-status alert">
        <strong>⚠️ Surface Inversion Active</strong>
        <p>Cold air trapped below warmer air mass.</p>
      </div>
      
      <div className="metrics-grid">
        <div className="metric">
          <span className="label">Mixing Height</span>
          <span className="value text-red">150m</span>
          <span className="baseline">Normal: {'>'}800m</span>
        </div>
        <div className="metric">
          <span className="label">Ventilation Index</span>
          <span className="value text-red">1,200</span>
          <span className="baseline">Normal: {'>'}6,000</span>
        </div>
      </div>
      
      <div className="inversion-graphic">
        <div className="layer warm">Warm Air (Trapping)</div>
        <div className="layer cold">Trapped Cold Air + PM 2.5</div>
        <div className="layer surface">Surface Level (Delhi)</div>
      </div>
    </div>
  )
}