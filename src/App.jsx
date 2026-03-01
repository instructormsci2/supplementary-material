import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import TrainingPairs from './components/TrainingPairs'
import StoryPrompts from './components/StoryPrompts'
import GeneratedStories from './components/GeneratedStories'
import EvaluatorPrompts from './components/EvaluatorPrompts'
import Analysis from './components/Analysis'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="training-pairs" element={<TrainingPairs />} />
        <Route path="story-prompts" element={<StoryPrompts />} />
        <Route path="generated-stories" element={<GeneratedStories />} />
        <Route path="evaluator-prompts" element={<EvaluatorPrompts />} />
        <Route path="analysis" element={<Analysis />} />
      </Route>
    </Routes>
  )
}

export default App
