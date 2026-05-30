import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap, Building, Leaf } from 'lucide-react'
import { pageVariants, fadeUp, staggerSlow } from '../lib/animations'

const FUTURE_PROJECTS_DATA = {
  'mega-parks': {
    title: 'Green Energy Mega-Parks',
    tagline: 'Powering Millions of Homes by 2030',
    description: 'Developing 10GW of solar and wind energy capacity across arid regions. Our Green Energy Mega-Parks are designed to revolutionize the renewable energy landscape by harnessing the raw power of nature. We are setting up state-of-the-art wind turbines and ultra-efficient solar arrays that will reduce carbon emissions by millions of tons annually.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000',
    details: [
      '10GW combined capacity target',
      'Over 5 million homes to be powered entirely on renewables',
      'Advanced battery storage solutions for round-the-clock power',
      'Creation of 20,000+ green jobs in local communities'
    ]
  },
  'eco-cities': {
    title: 'Eco-Smart Cities',
    tagline: 'The Future of Sustainable Urban Living',
    description: 'Pioneering zero-carbon urban developments that integrate IoT, vertical forests, and sustainable transit systems. Our Eco-Smart Cities aim to prove that modern living does not have to come at the expense of the environment. Every building is LEED-certified, and urban mobility is 100% electric.',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=2000',
    details: [
      '100% electric autonomous public transit',
      'Zero-waste management systems and circular economy',
      'Vertical forests to naturally cool the city and purify air',
      'AI-driven energy grids to minimize waste'
    ]
  },
  'biodegradables': {
    title: 'Next-Gen Biodegradables',
    tagline: 'Ending the Era of Single-Use Plastics',
    description: 'Investing in cutting-edge R&D facilities to replace single-use plastics with plant-based, fully compostable alternatives in our supply chain. From packaging to construction materials, we are exploring bio-polymers that return safely to the earth without leaving microplastics behind.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000',
    details: [
      'Development of seaweed and starch-based polymers',
      'Full elimination of single-use plastic across all group companies by 2028',
      'Commercialization of compostable packaging for logistics',
      'Partnerships with leading marine biology institutes'
    ]
  }
}

export default function FutureWorksDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = FUTURE_PROJECTS_DATA[id]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) {
      navigate('/')
    }
  }, [id, navigate, project])

  if (!project) return null

  const Icon = project.icon

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ background: 'var(--bg)', minHeight: '100vh', padding: '120px 20px 60px' }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 40 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div variants={staggerSlow} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(21, 128, 61, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={32} color="var(--accent)" />
            </div>
            <div>
              <h1 className="text-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                {project.title}
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>
                {project.tagline}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} style={{ width: '100%', height: 400, borderRadius: 24, overflow: 'hidden', marginBottom: 40, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            <div>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, color: 'var(--text-primary)', marginBottom: 16, fontWeight: 700 }}>Overview</h2>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {project.description}
              </p>
            </div>
            
            <div style={{ background: 'var(--surface)', padding: 32, borderRadius: 16, border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 24, fontWeight: 700 }}>Key Objectives</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {project.details.map((detail, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: "'Roboto', sans-serif", fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 8, flexShrink: 0 }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  )
}
