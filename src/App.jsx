import { Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

// Forces a full remount of ProjectDetail on slug change, so all internal
// state (animations, hero, lightbox) resets cleanly between projects.
function ProjectDetailRoute() {
  const { slug } = useParams()
  return <ProjectDetail key={slug} />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/progetti/:slug" element={<ProjectDetailRoute />} />
    </Routes>
  )
}

export default App