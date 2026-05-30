import { motion } from 'framer-motion'
import { pageVariants, fadeUp, blurIn } from '../lib/animations'

export default function About() {
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
              Corporate Overview
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
            About <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Arshith Group</span>
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
              maxWidth: 800,
              margin: '0 auto 24px',
            }}
          >
            Established in 1994, Arshith Group has steadily evolved into a leading diversified conglomerate, driving transformative growth across India's core economic sectors.
          </motion.p>

          <motion.p
            variants={blurIn}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 800,
              margin: '0 auto 60px',
            }}
          >
            Our work spans infrastructure, energy, logistics, and real estate, where we combine local insight with global standards to deliver lasting impact, sustainable outcomes, and meaningful value for communities.
          </motion.p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 32 }}>
          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--surface)',
              padding: 48,
              borderRadius: 12,
              border: '1px solid var(--border)',
              transition: 'all 0.3s ease'
            }}
          >
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Our Vision</h2>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              To be the premier catalyst for sustainable infrastructure development, pioneering innovations that shape the future of urban and industrial spaces.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--surface)',
              padding: 48,
              borderRadius: 12,
              border: '1px solid var(--border)',
              transition: 'all 0.3s ease'
            }}
          >
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>Our Mission</h2>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              To deliver world-class projects with uncompromising quality, integrating eco-friendly practices and empowering local communities in every endeavor.
            </p>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Sustainability</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We embed environmental stewardship across our portfolios, from green energy projects to low-carbon construction and lasting community benefits.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Innovation</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We embrace new construction technologies, digital logistics, and energy-efficient design to keep our projects agile and future-ready.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: 40, borderRadius: 16, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>Community</h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Our projects are designed to support economic growth, local employment, and social infrastructure that uplift neighborhoods for the long term.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
