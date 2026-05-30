import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Businesses from './pages/Businesses'
import Leadership from './pages/Leadership'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Internship from './pages/Internship'
import InternshipDetail from './pages/InternshipDetail'
import FutureWorksDetail from './pages/FutureWorksDetail'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        {/* Routes */}
        <Route path="/about"      element={<About />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/internship/:id" element={<InternshipDetail />} />
        <Route path="/future-works/:id" element={<FutureWorksDetail />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/careers"    element={<Careers />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}
