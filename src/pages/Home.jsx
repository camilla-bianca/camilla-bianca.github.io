import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProjectsSection from '../components/ProjectsSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import ShowreelModal from '../components/ShowreelModal'

function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false)

  return (
    <div>
      <Header />
      <Hero onWatchShowreel={() => setShowreelOpen(true)} />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      {showreelOpen && <ShowreelModal onClose={() => setShowreelOpen(false)} />}
    </div>
  )
}

export default Home