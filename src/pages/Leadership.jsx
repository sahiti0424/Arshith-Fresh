import { motion } from 'framer-motion'
import { pageVariants, fadeUp, staggerSlow } from '../lib/animations'

export default function Leadership() {
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
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
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
              Executive Team
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
            Our <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Leadership</span>
          </motion.h1>
          
          <motion.div variants={fadeUp} style={{ width: 60, height: 2, background: 'var(--gold)', margin: '0 auto 60px' }} />
        </div>

        <motion.div variants={staggerSlow}>
          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--surface)',
              padding: 60,
              borderRadius: 20,
              border: '1px solid var(--border)',
              maxWidth: 800,
              margin: '0 auto 40px',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: 160, height: 160, borderRadius: '50%', background: 'var(--border-light)', margin: '0 auto 32px', overflow: 'hidden', border: '4px solid var(--gold)'
            }} />
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Dr. Anand Rao</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold)', marginBottom: 32 }}>
              Founder & Chairman
            </p>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', maxWidth: 600, margin: '0 auto' }}>
              "Building the nation is not just a business for us; it is a profound responsibility to leave a lasting legacy for future generations."
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 40 }}
          >
            <div style={{ background: 'var(--surface)', padding: 36, borderRadius: 16, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Ms. Priya Menon</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold)', marginBottom: 16 }}>
                Chief Operating Officer
              </p>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Oversees operations, delivery excellence, and cross-vertical coordination to ensure every project meets its strategic and financial goals.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', padding: 36, borderRadius: 16, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Mr. Vivek Shah</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold)', marginBottom: 16 }}>
                Chief Investment Officer
              </p>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Leads capital strategy and investment planning with a strong focus on sustainable returns and long-term enterprise value.
              </p>
            </div>

            <div style={{ background: 'var(--surface)', padding: 36, borderRadius: 16, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Dr. Kala Iyer</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold)', marginBottom: 16 }}>
                Chief Sustainability Officer
              </p>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Drives sustainability initiatives, ESG governance, and green performance measures across every business unit.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  )
}
