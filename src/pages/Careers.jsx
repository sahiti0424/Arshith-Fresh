import { motion } from 'framer-motion'
import { pageVariants, fadeUp, blurIn } from '../lib/animations'

export default function Careers() {
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
              Join Our Mission
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
            Join <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Our Team</span>
          </motion.h1>

          <motion.div variants={fadeUp} style={{ width: 60, height: 2, background: 'var(--gold)', margin: '0 auto 40px' }} />

          <motion.p
            variants={blurIn}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 700,
              margin: '0 auto 60px'
            }}
          >
            We are constantly looking for visionary thinkers and driven professionals who want to make a tangible impact on India's growth story.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          style={{
            background: 'var(--surface)',
            padding: 56,
            borderRadius: 16,
            border: '1px solid var(--border)',
            maxWidth: 800,
            margin: '0 auto'
          }}
        >
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Why Arshith?</h2>
          <ul style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 2, textAlign: 'left', listStylePosition: 'outside', paddingLeft: 20 }}>
            <li>Work on nation-building mega projects that shape the future.</li>
            <li>Commitment to continuous learning and rapid career advancement.</li>
            <li>Inclusive, dynamic, and forward-thinking work culture.</li>
            <li>Industry-leading benefits and comprehensive compensation.</li>
          </ul>
        </motion.div>
      </div>
    </motion.main>
  )
}
