import { motion } from 'framer-motion'
import { pageVariants, fadeUp, blurIn, staggerSlow } from '../lib/animations'
import { Building2, Zap, Truck, Landmark } from 'lucide-react'

const SECTORS = [
  { name: 'Infrastructure', desc: 'Building robust highways, bridges, and urban transport systems.', icon: Building2 },
  { name: 'Green Energy', desc: 'Investing in solar and wind power to transition towards a sustainable future.', icon: Zap },
  { name: 'Logistics', desc: 'Seamless supply chain solutions powering national commerce.', icon: Truck },
  { name: 'Real Estate', desc: 'Developing premium commercial and residential spaces.', icon: Landmark }
]

export default function Businesses() {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        paddingTop: 140,
        paddingBottom: 100,
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: 'var(--gold)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              Market Verticals
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: 24,
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Our <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Businesses</span>
          </motion.h1>

          <motion.p
            variants={blurIn}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 760,
              margin: '0 auto 24px',
            }}
          >
            Arshith Group brings together specialized business units focused on infrastructure, clean energy, logistics, and real estate, forming a resilient portfolio designed to deliver value across evolving markets.
          </motion.p>

          <motion.p
            variants={blurIn}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 760,
              margin: '0 auto 60px',
            }}
          >
            Each vertical leverages deep domain expertise and strategic partnerships to create projects that advance infrastructure resilience, environmental sustainability, logistics efficiency, and premium living and working environments.
          </motion.p>

          <motion.div variants={fadeUp} style={{ width: 60, height: 2, background: 'var(--gold)', margin: '0 auto 20px' }} />
        </div>

        <motion.div
          variants={staggerSlow}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}
        >
          {SECTORS.map((sector, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -8, borderColor: 'var(--gold)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              style={{
                background: 'var(--surface)',
                padding: 56,
                borderRadius: 16,
                border: '1px solid var(--border)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <sector.icon size={48} color="var(--gold)" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
                {sector.name}
              </h3>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Integrated Delivery</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Our businesses operate with end-to-end capabilities that combine engineering, funding, execution, and post-launch support for every project.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Strategic Partnerships</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We partner with global technology leaders, local supply chains, and government agencies to accelerate delivery and maximize economic impact.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Future Growth</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              By reinvesting in research, talent, and scalable systems, we maintain a leadership position in markets poised for long-term expansion.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
