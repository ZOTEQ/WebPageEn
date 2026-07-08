import BubbleBackground from './sections/BubbleBackground'
import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import PhilosophySection from './sections/PhilosophySection'
import ProductCatalog from './sections/ProductCatalog'
import OriginsSection from './sections/OriginsSection'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#f0f7f4' }}>
      <BubbleBackground />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <PhilosophySection />
        <ProductCatalog />
        <OriginsSection />
        <Footer />
      </div>
    </div>
  )
}
