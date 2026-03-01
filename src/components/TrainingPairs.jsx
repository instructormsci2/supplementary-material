import { useState } from 'react'
import data from '../data/trainingPairs.json'

function PairCard({ pair, index }) {
  return (
    <div className="pair-card">
      <h4>Pair {index + 1}</h4>
      <div className="pair-columns">
        <div className="pair-column neutral">
          <span className="pair-label">Neutral</span>
          <p>{pair.neutral}</p>
        </div>
        <div className="pair-column literary">
          <span className="pair-label">Literary</span>
          <p>{pair.literary}</p>
        </div>
      </div>
    </div>
  )
}

function TrainingPairs() {
  const [activeStudy, setActiveStudy] = useState('study1')
  const [activeCategory, setActiveCategory] = useState(0)

  const studyData = data[activeStudy]
  const categories = studyData.categories
  const currentCategory = categories[activeCategory]

  return (
    <div className="page">
      <h1>Training Pairs</h1>
      <p className="page-description">{data.study1.description}</p>

      <div className="tab-bar">
        <button
          className={`tab ${activeStudy === 'study1' ? 'active' : ''}`}
          onClick={() => { setActiveStudy('study1'); setActiveCategory(0) }}
        >
          {data.study1.title}
        </button>
        <button
          className={`tab ${activeStudy === 'study2' ? 'active' : ''}`}
          onClick={() => { setActiveStudy('study2'); setActiveCategory(0) }}
        >
          {data.study2.title}
        </button>
      </div>

      <p className="page-description">{studyData.description}</p>

      <div className="category-tabs">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            className={`category-tab ${activeCategory === i ? 'active' : ''}`}
            onClick={() => setActiveCategory(i)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="pairs-list">
        {currentCategory.pairs.map((pair, i) => (
          <PairCard key={i} pair={pair} index={i} />
        ))}
      </div>
    </div>
  )
}

export default TrainingPairs
