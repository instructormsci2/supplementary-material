function Home() {
  return (
    <div className="home-page">
      <div className="banner-container">
        <img
          src={import.meta.env.BASE_URL + "banner.jpeg"}
          alt="Activation Steering Research"
          className="banner-image"
        />
      </div>

      <div className="home-content">
        <p className="supp-label">Supplementary Material Website</p>

        <h1 className="paper-title">
          Activation Steering for Creative Estrangement: Generating Evocative
          Narrative Through Controlled Disruption of Language Models
        </h1>

        <div className="abstract">
          <h2>Abstract</h2>
          <p>
            We investigate activation steering as a method for generating extended narrative that can function as a textual environment for creative inspiration. Using contrastive pairs derived from the aesthetics of Tarkovsky and Lynch, we construct steering vectors encoding modes of perceptual estrangement and apply them to Llama 3.1 8B Instruct. Single-layer steering operates in two regimes: a moderate regime that elevates literary register without producing estrangement, and a high regime where estrangement emerges but coherence collapses. Dual-layer steering resolves this by applying a compositional vector at layer 13 simultaneously with a content-level vector at layer 14, accessing a region where estrangement and coherence coexist. The dual-steered outputs exhibit emergent disruptions (temporal self-contradiction, identity instability, logical impossibility) absent from all training data, arising from competing representational pressures during generation. Comparing steered outputs against explicitly prompted fragmentation reveals two qualitatively distinct modes: prompting produces conventional fragmentation devices, while steering produces intact sentences whose content is self-contradicting. A blind analysis of evaluator reasoning texts and human reader feedback confirm this distinction. Human readers tend to perceive dual-steered outputs as stranger than prompted outputs, suggesting that occasional and surprising disruption within coherent prose is more estranging than pervasive and categorizable fragmentation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
