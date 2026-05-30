import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Award, Shield, Globe, Building2, Cpu, HeartPulse, Truck, Landmark, TrendingUpIcon } from 'lucide-react'
import { useMagnetic } from '../../hooks/useMouseTracking'
import { staggerSlow, blurIn, fadeUp, fadeLeft, wordReveal } from '../../lib/animations'

function MagneticButton({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const { x, y } = useMagnetic(ref, strength)
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-flex' }}>
      {children}
    </motion.div>
  )
}

const TRUST_ITEMS = [
  { icon: Award, label: 'Infrastructure Company of the Year, 2025' },
  { icon: Shield, label: 'ISO 9001 & ISO 14001 Certified' }, 
  { icon: Globe, label: 'Operations across 18 Countries' }
]

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroTextY = useTransform(scrollY, [0, 800], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const imgScale = useTransform(scrollY, [0, 1000], [1, 1.15])

  return (
    <motion.section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {/* Massive Cinematic Background */}
      <motion.div style={{ position: 'absolute', inset: 0, scale: imgScale, zIndex: 0, transformOrigin: 'center' }}>
        <img
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80"
          alt="Green Sustainable Background"
        />
        {/* Green-tinted Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, rgba(242,247,244,0.7) 40%, rgba(242,247,244,0.9) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(21,128,61,0.1) 0%, var(--bg) 100%)' }} />
        <div className="grain" style={{ position: 'absolute', inset: 0 }} />
      </motion.div>

      {/* Main Centered Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 40px',
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          y: heroTextY,
          opacity: heroOpacity
        }}
      >
        <motion.section variants={staggerSlow} initial="hidden" animate="visible" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 32, padding: '8px 24px', borderRadius: 999, border: '1px solid var(--accent-border)', background: 'rgba(21,128,61,0.05)', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
              Est. 1994 · Pioneering Green Infrastructure
            </span>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          </motion.div>

          {/* Main Heading — Cinematic & Massive */}
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }} style={{ marginBottom: 40, width: '100%' }}>
            <div style={{ overflow: 'hidden', lineHeight: 1.1 }}>
              <motion.h1 
                variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-display" 
                style={{ fontSize: 'clamp(50px, 8vw, 130px)', color: 'var(--text-primary)', margin: 0 }}
              >
                Building a <span className="text-syne text-gold-gradient" style={{ fontStyle: 'normal', fontWeight: 700 }}>Sustainable</span>
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', lineHeight: 1.1 }}>
              <motion.h1 
                variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
                className="text-display" 
                style={{ fontSize: 'clamp(50px, 8vw, 130px)', color: 'var(--text-primary)', margin: 0 }}
              >
                Future Today
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtext */}
          <motion.p variants={blurIn} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 700, margin: '0 auto 48px' }}>
            A diversified conglomerate focused on green energy, eco-friendly construction, and innovative logistics to shape a better tomorrow.
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
            <motion.div variants={fadeUp}>
              <MagneticButton strength={0.2}>
                <Link to="/businesses" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(21, 128, 61, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily: "'Roboto', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--bg)', background: 'var(--accent)', border: 'none', padding: '18px 40px', borderRadius: 4, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s'
                    }}
                  >
                    Explore Verticals
                    <ArrowRight size={16} strokeWidth={2} />
                  </motion.button>
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp}>
              <MagneticButton strength={0.2}>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ background: 'rgba(21, 128, 61, 0.05)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily: "'Roboto', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border)', padding: '18px 40px', borderRadius: 4, cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    Our Story
                  </motion.button>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Trust badges - Centered */}
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center' }}>
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.label} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: 100, backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <Icon size={16} color="var(--accent)" strokeWidth={1.5} />
                  <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>
                    {item.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

        </motion.section>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--text-tertiary)' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'var(--border)', overflow: 'hidden' }}>
          <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} style={{ width: '100%', height: '50%', background: 'var(--accent)' }} />
        </div>
      </motion.div>
    </motion.section>
  )
}
