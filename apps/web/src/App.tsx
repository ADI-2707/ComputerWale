import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Home from './pages/Home/Home'

// Temporary single-page App — React Router wired in Phase 9
export default function App() {
  return (
    <>
      <Navbar cartCount={0} />
      <Home />
      <Footer />
    </>
  )
}
