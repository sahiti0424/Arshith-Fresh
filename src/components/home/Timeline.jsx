import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, staggerSlow } from '../../lib/animations'

const MILESTONES = [
  { year: '1994', title: 'The Foundation', desc: 'Arshith Group was established with a singular vision to redefine infrastructure.' },
  { year: '2005', title: 'National Expansion', desc: 'Secured the first major government contract for the Golden Quadrilateral project.' },
  { year: '2012', title: 'Tech & Green Integration', desc: 'Launched Arshith Tech and Green Energy verticals, pioneering smart city initiatives.' },
  { year: '2020', title: 'Global Presence', desc: 'Expanded operations into Southeast Asia and the Middle East, reaching 18 countries.' },
  { year: '2026', title: 'A New Era', desc: 'Awarded the ₹12,400 Cr Eastern Expressway and pushing zero-emission goals.' }
]

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '0px 0px -50px 0px' })

  return (
    <section ref={containerRef} style={{ background: 'var(--surface2)', padding: '120px 60px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background elements */}
      <div className="grain" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <motion.div style={{ y }} className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[var(--accent-muted)] rounded-full blur-[100px] pointer-events-none" />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <motion.div
          ref={ref}
          variants={staggerSlow}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <motion.h2 variants={fadeUp} className="text-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20 }}>
            Our Journey of <span className="text-syne text-gold-gradient font-bold" style={{ fontStyle: 'normal' }}>Excellence</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            Three decades of building the future. Every milestone represents a leap in innovation, scale, and commitment to the nation.
          </motion.p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 40, width: 2,
              background: 'linear-gradient(to bottom, transparent, var(--accent), var(--accent-light), transparent)',
              transformOrigin: 'top',
            }}
          />

          {MILESTONES.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 40, marginBottom: i === MILESTONES.length - 1 ? 0 : 60, position: 'relative' }}
              className="premium-card"
            >
              <div style={{ 
                width: 80, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 
              }}>
                <div style={{ 
                  width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', border: '4px solid var(--surface2)',
                  boxShadow: '0 0 20px var(--accent-glow)', marginTop: 6
                }} />
              </div>
              
              <div style={{ flex: 1, background: 'var(--surface)', padding: '32px', borderRadius: 16, border: '1px solid var(--border)' }} className="glass-card">
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--accent)', display: 'block', marginBottom: 8 }}>
                  {item.year}
                </span>
                <h3 className="text-display" style={{ fontSize: 28, color: 'var(--text-primary)', marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
