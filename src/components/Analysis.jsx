import { useState } from 'react'
import data from '../data/analysisData.json'

function Analysis() {
  const [activeMetric, setActiveMetric] = useState(null)

  const metrics = ['imagery', 'indeterminacy', 'originality', 'register', 'coherence', 'estrangement', 'syntactic_estrangement']
  const metricLabels = {
    imagery: 'Imagery',
    indeterminacy: 'Indeterminacy',
    originality: 'Originality',
    register: 'Register',
    coherence: 'Coherence',
    estrangement: 'Estrangement',
    syntactic_estrangement: 'Syntactic Estrangement',
  }

  return (
    <div className="page">
      <h1>Analysis</h1>

      <section className="analysis-section">
        <h2>{data.interraterAgreement.title}</h2>
        <p className="page-description">{data.interraterAgreement.description}</p>

        <div className="summary-points">
          {data.interraterAgreement.summary.map((point, i) => (
            <p key={i} className="summary-point">{point}</p>
          ))}
        </div>

        <h3>Agreement Table</h3>
        <table className="data-table agreement-table">
          <thead>
            <tr>
              {data.interraterAgreement.agreementTable.columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.interraterAgreement.agreementTable.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="analysis-section">
        <h2>{data.conditionMeans.title}</h2>
        <p className="page-description">
          Select a metric to compare Claude Sonnet 4.5 and GPT-4o ratings across all experimental conditions.
        </p>

        <div className="button-group metric-selector">
          {metrics.map((m) => (
            <button
              key={m}
              className={`control-btn ${activeMetric === m ? 'active' : ''}`}
              onClick={() => setActiveMetric(activeMetric === m ? null : m)}
            >
              {metricLabels[m]}
            </button>
          ))}
        </div>

        {activeMetric && (
          <table className="data-table condition-table">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Claude</th>
                <th>GPT-4o</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              {data.conditionMeans.data.map((row, i) => {
                const m = row.metrics[activeMetric]
                if (!m) return null
                const diff = (m.claude - m.gpt4o).toFixed(2)
                return (
                  <tr key={i}>
                    <td>{row.condition}</td>
                    <td>{m.claude.toFixed(2)}</td>
                    <td>{m.gpt4o.toFixed(2)}</td>
                    <td className={parseFloat(diff) >= 0 ? 'positive-diff' : 'negative-diff'}>
                      {diff}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default Analysis
