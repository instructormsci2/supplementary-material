import { useState } from 'react'
import data from '../data/mistralStories.json'

const PROMPT_KEYS = Object.keys(data.prompts)

const CATEGORIES = [
  { key: 'baseline', label: 'Non-Steered (Baseline)', hasAlpha: false },
  { key: 'positive', label: 'Positive Steering', hasAlpha: true, alphas: ['2.0', '3.0', '4.0', '6.0'] },
  { key: 'negative', label: 'Negative Steering', hasAlpha: true, alphas: ['2.0', '3.0', '4.0', '6.0'] },
  {
    key: 'dual_steered',
    label: 'Dual-Layer Steering (L14=3.0)',
    hasAlpha: true,
    alphas: ['composite_2.5', 'composite_3.0', 'lynchian_2.5', 'lynchian_3.0', 'solaris_2.5', 'solaris_3.0'],
    alphaLabel: 'L17 Vector + Alpha',
    alphaDisplayLabels: {
      'composite_2.5': 'Composite α=2.5',
      'composite_3.0': 'Composite α=3.0',
      'lynchian_2.5': 'Lynchian α=2.5',
      'lynchian_3.0': 'Lynchian α=3.0',
      'solaris_2.5': 'Solaris α=2.5',
      'solaris_3.0': 'Solaris α=3.0',
    },
  },
]

function MistralStories() {
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPT_KEYS[0])
  const [selectedCategory, setSelectedCategory] = useState('baseline')
  const [selectedAlpha, setSelectedAlpha] = useState(null)

  const promptData = data.prompts[selectedPrompt]
  const category = CATEGORIES.find(c => c.key === selectedCategory)

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey)
    const cat = CATEGORIES.find(c => c.key === catKey)
    if (cat.hasAlpha) {
      setSelectedAlpha(cat.alphas[0])
    } else {
      setSelectedAlpha(null)
    }
  }

  const getStoryText = () => {
    const stories = promptData.categories[selectedCategory]
    if (!stories) return null
    if (selectedCategory === 'baseline') {
      return typeof stories === 'string' ? stories : stories.story || stories.text || stories
    }
    if (selectedAlpha && stories[selectedAlpha]) {
      return stories[selectedAlpha]
    }
    return null
  }

  const storyText = getStoryText()

  const getAlphaDisplay = (alpha) => {
    if (category.alphaDisplayLabels && category.alphaDisplayLabels[alpha]) {
      return category.alphaDisplayLabels[alpha]
    }
    return `α = ${alpha}`
  }

  return (
    <>
      <div className="story-controls">
        <div className="control-group">
          <label>Prompt</label>
          <div className="button-group">
            {PROMPT_KEYS.map((key) => (
              <button
                key={key}
                className={`control-btn ${selectedPrompt === key ? 'active' : ''}`}
                onClick={() => setSelectedPrompt(key)}
              >
                {data.prompts[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Category</label>
          <div className="button-group">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`control-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {category.hasAlpha && (
          <div className="control-group">
            <label>{category.alphaLabel || 'Alpha (α)'}</label>
            <div className="button-group">
              {category.alphas.map((alpha) => (
                <button
                  key={alpha}
                  className={`control-btn alpha-btn ${selectedAlpha === alpha ? 'active' : ''}`}
                  onClick={() => setSelectedAlpha(alpha)}
                >
                  {getAlphaDisplay(alpha)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="story-meta">
        <p><strong>Prompt:</strong> {promptData.prompt}</p>
        <p>
          <strong>Condition:</strong> {category.label}
          {selectedAlpha && (
            <span>
              {' '}&mdash; {category.alphaLabel || 'α'} = {getAlphaDisplay(selectedAlpha)}
            </span>
          )}
        </p>
      </div>

      <div className="story-display">
        {storyText ? (
          <div className="story-text">
            {storyText.split('\n').map((paragraph, i) => (
              paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
            ))}
          </div>
        ) : (
          <p className="no-story">Select a configuration to view a story.</p>
        )}
      </div>
    </>
  )
}

function MistralReplication() {
  const [activeTab, setActiveTab] = useState('stories')

  return (
    <div className="page">
      <h1>Mistral 7B Replication</h1>
      <p className="page-description">
        Replication of the activation steering experiments using Mistral-7B-Instruct-v0.3.
        Mistral uses Layer 14 (first-order) and Layer 17 (second-order) as optimal steering layers,
        compared to Layers 13 and 14 for Llama 3.1 8B.
      </p>

      <div className="tab-bar">
        <button
          className={`tab ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          Generated Stories
        </button>
        <button
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Analysis
        </button>
      </div>

      {activeTab === 'stories' && (
        <section>
          <h2>Generated Stories</h2>
          <p className="page-description">
            Stories generated from four prompts under different steering conditions.
            Select a prompt, then a category, and an alpha value to read the story.
          </p>
          <MistralStories />
        </section>
      )}

      {activeTab === 'analysis' && (
        <section>
          <h2>First-Order Steering</h2>
          <p className="page-description">
            Positive vs. negative steering at Layer 14 with cosine decay, across high, medium, and low alignment prompts.
          </p>
          <div className="plot-container">
            <img
              src={`${import.meta.env.BASE_URL}mistral/pos_neg_l14.png`}
              alt="Mistral positive vs negative steering at Layer 14"
              className="plot-image"
            />
          </div>

          <h2>Dual-Layer Steering</h2>
          <p className="page-description">
            All metrics as a function of Layer 17 alpha, with Layer 14 composite vector fixed at α=3.0. Three Layer 17 vector types are compared: composite, Lynchian, and Solaris.
          </p>
          <div className="plot-container">
            <img
              src={`${import.meta.env.BASE_URL}mistral/dual_all_metrics_grid.png`}
              alt="Mistral dual-layer steering: all metrics vs Layer 17 alpha"
              className="plot-image"
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default MistralReplication
