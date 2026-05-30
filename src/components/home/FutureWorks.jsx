import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Leaf, Zap, Building, ArrowRight } from 'lucide-react'
import { fadeUp, staggerSlow } from '../../lib/animations'

const FUTURE_PROJECTS = [
  {
    id: 'mega-parks',
    title: 'Green Energy Mega-Parks',
    description: 'Developing 10GW of solar and wind energy capacity across arid regions to power millions of homes by 2030.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'eco-cities',
    title: 'Eco-Smart Cities',
    description: 'Pioneering zero-carbon urban developments that integrate IoT, vertical forests, and sustainable transit systems.',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'biodegradables',
    title: 'Next-Gen Biodegradables',
    description: 'Investing in R&D facilities to replace single-use plastics with plant-based, fully compostable alternatives in our supply chain.',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
  }
]

export default function FutureWorks() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section style={{ background: 'var(--surface2)', padding: '100px 60px', position: 'relative' }}>
      <motion.div
        ref={ref}
        variants={staggerSlow}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(21, 128, 61, 0.1)', borderRadius: 20, marginBottom: 24, border: '1px solid var(--accent-border)' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Looking Ahead
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20 }}>
            Our <span className="text-syne text-gold-gradient font-bold" style={{ fontStyle: 'normal' }}>Future Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            Committed to a sustainable tomorrow, we are aggressively investing in projects that harmonize human progress with ecological balance.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {FUTURE_PROJECTS.map((project, idx) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                  <div style={{ position: 'absolute', top: 16, right: 16, width: 48, height: 48, background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Icon size={20} color="var(--accent)" />
                  </div>
                </div>
                <div style={{ padding: '32px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>
                    {project.description}
                  </p>
                  <Link to={`/future-works/${project.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Learn More <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
