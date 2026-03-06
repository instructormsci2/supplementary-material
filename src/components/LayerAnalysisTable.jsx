import { useState } from 'react'

const METRIC_LABELS = {
  consistency: 'Consistency',
  cosine_distance: 'Cosine Distance',
  relative_l2: 'Relative L2',
  direction_norm: 'Direction Norm',
}

function LayerAnalysisTable({ data }) {
  const [expanded, setExpanded] = useState(false)

  const { layers, selected_layer, description } = data

  // Top 5 by consistency
  const sorted = [...layers].sort((a, b) => b.consistency - a.consistency)
  const top5 = sorted.slice(0, 5)
  const top5Layers = new Set(top5.map(l => l.layer))

  const renderRow = (row, highlight) => {
    const isSelected = row.layer === selected_layer
    const cls = isSelected ? 'layer-row-selected' : highlight ? 'layer-row-top' : ''
    return (
      <tr key={row.layer} className={cls}>
        <td>
          {row.layer}
          {isSelected && <span className="selected-badge">selected</span>}
        </td>
        <td>{row.consistency.toFixed(4)}</td>
        <td>{row.cosine_distance.toFixed(4)}</td>
        <td>{row.relative_l2.toFixed(4)}</td>
        <td>{row.direction_norm.toFixed(4)}</td>
      </tr>
    )
  }

  return (
    <div className="layer-analysis">
      <p className="page-description">{description}</p>

      <h3>Top 5 Layers by Consistency</h3>
      <table className="data-table layer-table">
        <thead>
          <tr>
            <th>Layer</th>
            {Object.values(METRIC_LABELS).map(label => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {top5.map(row => renderRow(row, true))}
        </tbody>
      </table>

      <details
        className="full-table-details"
        open={expanded}
        onToggle={(e) => setExpanded(e.target.open)}
      >
        <summary>View all 32 layers</summary>
        <table className="data-table layer-table">
          <thead>
            <tr>
              <th>Layer</th>
              {Object.values(METRIC_LABELS).map(label => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {layers.map(row => renderRow(row, top5Layers.has(row.layer)))}
          </tbody>
        </table>
      </details>
    </div>
  )
}

export default LayerAnalysisTable
