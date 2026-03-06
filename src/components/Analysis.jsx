import { useState } from 'react'
import data from '../data/analysisData.json'
import layerData from '../data/layerAnalysis.json'
import LayerAnalysisTable from './LayerAnalysisTable'

function Analysis() {
  const [activeTab, setActiveTab] = useState('steering')
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

      <div className="tab-bar">
        <button
          className={`tab ${activeTab === 'steering' ? 'active' : ''}`}
          onClick={() => setActiveTab('steering')}
        >
          First-Order Steering
        </button>
        <button
          className={`tab ${activeTab === 'dual' ? 'active' : ''}`}
          onClick={() => setActiveTab('dual')}
        >
          Dual-Layer Steering
        </button>
        <button
          className={`tab ${activeTab === 'agreement' ? 'active' : ''}`}
          onClick={() => setActiveTab('agreement')}
        >
          Cross-Evaluator Agreement
        </button>
      </div>

      {activeTab === 'steering' && (
        <section>
          <h2>First-Order Steering Results</h2>
          <p className="page-description">
            Metric scores across steering strengths (alpha) at Layer 13 with cosine decay, broken down by prompt–vector alignment tier (high, medium, low).
          </p>

          <h3>Positive vs. Negative Steering</h3>
          <p className="page-description">
            Negative alpha values steer away from the literary direction. The asymmetry confirms that the steering vector encodes a meaningful literary dimension rather than generic noise.
          </p>
          <div className="plot-container">
            <img src={`${import.meta.env.BASE_URL}pos_neg_l13.png`} alt="Positive vs negative steering comparison at Layer 13" className="plot-image" />
          </div>

          <h2>Layer Analysis</h2>
          <LayerAnalysisTable data={layerData.llama.first_order} />
        </section>
      )}

      {activeTab === 'dual' && (
        <section>
          <h2>Dual-Layer Steering Results</h2>
          <p className="page-description">
            All metrics as a function of Layer 14 alpha, with Layer 13 composite vector fixed at α=6.0. Three Layer 14 vector types are compared: composite, Lynchian, and Solaris.
          </p>

          <div className="plot-container">
            <img src={`${import.meta.env.BASE_URL}dual_all_metrics_grid.png`} alt="Dual-layer steering: all metrics vs Layer 14 alpha" className="plot-image" />
          </div>

          <h2>Layer Analysis (Second-Order)</h2>
          <LayerAnalysisTable data={layerData.llama.second_order} />
        </section>
      )}

      {activeTab === 'agreement' && (
        <section>
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
        </section>
      )}
    </div>
  )
}

export default Analysis
