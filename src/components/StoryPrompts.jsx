import data from '../data/storyPrompts.json'

function StoryPrompts() {
  return (
    <div className="page">
      <h1>Story Generation Prompts</h1>
      <p className="page-description">{data.description}</p>

      {data.tiers.map((tier) => (
        <section key={tier.name} className="tier-section">
          <h2>{tier.name}</h2>
          <p className="tier-description">{tier.description}</p>
          <ul className="prompt-list">
            {tier.prompts.map((prompt, i) => (
              <li key={i} className="prompt-item">
                <span className="prompt-number">{i + 1}.</span>
                <span className="prompt-text">{prompt}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default StoryPrompts
