import { useState } from 'react'
import data from '../data/generatedStories.json'

const PROMPT_KEYS = Object.keys(data.prompts)

const INSTRUCTION_PROMPTS = {
  fragmented: 'Write in a fragmented, syntactically experimental style. Use person shifts, broken grammar, and self-contradicting sentences.',
  experimental: 'Write in the style of experimental literary fiction. The syntax should fracture and dissolve. Reality should feel unstable.',
  consciousness: 'Write this as if consciousness itself is breaking down. Grammar and perspective should be unreliable.',
}

const CATEGORIES = [
  { key: 'baseline', label: 'Non-Steered (Baseline)', hasAlpha: false },
  { key: 'positive', label: 'Positive Steering', hasAlpha: true, alphas: ['4.0', '6.0', '7.5', '8.0'] },
  { key: 'negative', label: 'Negative Steering', hasAlpha: true, alphas: ['4.0', '6.0', '7.5', '8.0'] },
  { key: 'prompted', label: 'Prompted (No Steering)', hasAlpha: true, alphas: ['consciousness', 'experimental', 'fragmented'], alphaLabel: 'Instruction' },
  { key: 'dual_steered', label: 'Dual-Layer Steering (L13=6.0)', hasAlpha: true, alphas: ['4.5', '5.0'], alphaLabel: 'L14 Alpha' },
]

function GeneratedStories() {
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

  return (
    <div className="page">
      <h1>Generated Stories</h1>
      <p className="page-description">
        Stories generated from four prompts under different steering conditions.
        Select a prompt, then a category, and an alpha/instruction to read the story.
      </p>

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
                  {category.key === 'prompted' ? alpha : `α = ${alpha}`}
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
              {' '}&mdash; {category.alphaLabel || 'α'} = {selectedAlpha}
            </span>
          )}
        </p>
        {selectedCategory === 'prompted' && selectedAlpha && INSTRUCTION_PROMPTS[selectedAlpha] && (
          <p><strong>Instruction:</strong> <em>{INSTRUCTION_PROMPTS[selectedAlpha]}</em></p>
        )}
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
    </div>
  )
}

export default GeneratedStories
