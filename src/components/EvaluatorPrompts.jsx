import { useState } from 'react'
import data from '../data/evaluatorPrompts.json'

const results = data.reasoningAnalysis.results

const STORY_LABELS = {
  1: 'Childhood Home',
  2: 'Hospital Waiting Room',
  3: 'Doing Laundry',
  4: 'Waiting for Public Transit',
}

function GroupResults({ group }) {
  return (
    <div className="group-results">
      <h3>{group.label}</h3>
      <p className="group-condition">{group.condition}</p>

      <h4>Evaluator Reasoning Statements</h4>
      <div className="reasonings-list">
        {group.evaluatorReasonings.map((story) => (
          <details key={story.story} className="reasoning-details">
            <summary>Story {story.story}: {STORY_LABELS[story.story]} ({story.reasonings.length} reasoning statements)</summary>
            <ol className="reasoning-statements">
              {story.reasonings.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ol>
          </details>
        ))}
      </div>

      <h4>Analyst Summary</h4>
      <div className="analyst-summary">
        <div className="summary-field">
          <strong>Frequent Features</strong>
          <p>{group.analystSummary.frequentFeatures}</p>
        </div>
        <div className="summary-field">
          <strong>Vocabulary &amp; Framing</strong>
          <p>{group.analystSummary.vocabulary}</p>
        </div>
        <div className="summary-field">
          <strong>Implicit Categories</strong>
          <p>{group.analystSummary.implicitCategories}</p>
        </div>
        <div className="summary-field">
          <strong>Practical Meaning of &ldquo;Syntactic Estrangement&rdquo;</strong>
          <p>{group.analystSummary.practicalMeaning}</p>
        </div>
      </div>
    </div>
  )
}

function EvaluatorPrompts() {
  const [activeSection, setActiveSection] = useState('metrics')
  const [activeResultsTab, setActiveResultsTab] = useState('groupA')

  return (
    <div className="page">
      <h1>LLM Evaluator Prompts</h1>

      <div className="tab-bar">
        <button
          className={`tab ${activeSection === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveSection('metrics')}
        >
          Metric Scoring Prompts
        </button>
        <button
          className={`tab ${activeSection === 'reasoning' ? 'active' : ''}`}
          onClick={() => setActiveSection('reasoning')}
        >
          Blind Reasoning Analysis
        </button>
      </div>

      {activeSection === 'metrics' && (
        <section>
          <h2>{data.metricPrompts.title}</h2>
          <p className="page-description">{data.metricPrompts.description}</p>

          <div className="metrics-grid">
            {data.metricPrompts.metrics.map((metric) => (
              <div key={metric.name} className="metric-card">
                <h3>{metric.name}</h3>
                <div className="prompt-block">
                  <code>{metric.prompt}</code>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'reasoning' && (
        <section>
          <h2>{data.reasoningAnalysis.title}</h2>
          <p className="page-description">{data.reasoningAnalysis.description}</p>

          <div className="protocol-steps">
            {data.reasoningAnalysis.steps.map((step) => (
              <div key={step.step} className="step-card">
                <h3>Step {step.step}: {step.title}</h3>
                <p>{step.description}</p>
                {step.prompt && (
                  <details className="prompt-details">
                    <summary>View Prompt Template</summary>
                    <div className="prompt-block">
                      <code>{step.prompt}</code>
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>

          <div className="condition-labels">
            <h3>Condition Labels</h3>
            <p className="page-description">{data.reasoningAnalysis.conditionLabels.note}</p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {data.reasoningAnalysis.conditionLabels.groups.map((g) => (
                  <tr key={g.label}>
                    <td><strong>{g.label}</strong></td>
                    <td>{g.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="blind-results">
            <h2>Blind Analysis Results</h2>
            <p className="page-description">
              Below are the evaluator reasoning statements and the blind analyst&rsquo;s findings for each condition,
              followed by the cross-condition comparison.
            </p>

            <div className="results-tabs">
              <button
                className={`control-btn ${activeResultsTab === 'groupA' ? 'active' : ''}`}
                onClick={() => setActiveResultsTab('groupA')}
              >
                Group A (Prompted)
              </button>
              <button
                className={`control-btn ${activeResultsTab === 'groupB' ? 'active' : ''}`}
                onClick={() => setActiveResultsTab('groupB')}
              >
                Group B (Dual-Steered)
              </button>
              <button
                className={`control-btn ${activeResultsTab === 'comparison' ? 'active' : ''}`}
                onClick={() => setActiveResultsTab('comparison')}
              >
                Cross-Condition Comparison
              </button>
            </div>

            {activeResultsTab === 'groupA' && <GroupResults group={results.groupA} />}
            {activeResultsTab === 'groupB' && <GroupResults group={results.groupB} />}

            {activeResultsTab === 'comparison' && (
              <div className="comparison-results">
                <h3>{results.comparison.title}</h3>
                <p className="group-condition">{results.comparison.description}</p>

                <div className="comparison-findings">
                  {results.comparison.findings.map((finding, i) => (
                    <div key={i} className="finding-card">
                      <h4>{finding.question}</h4>
                      <div className="finding-answer">
                        {finding.answer.split('\n\n').map((paragraph, j) => (
                          <p key={j}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default EvaluatorPrompts
