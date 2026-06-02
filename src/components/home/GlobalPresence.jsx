import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Globe, Building, Users, Briefcase } from 'lucide-react'
import { fadeUp, staggerSlow } from '../../lib/animations'

const MARKERS = [
  { top: '38%', left: '28%', name: 'Europe' },
  { top: '32%', left: '68%', name: 'Asia Pacific' },
  { top: '58%', left: '18%', name: 'Americas' },
  { top: '48%', left: '58%', name: 'India & ME', active: true },
]

const STATS = [
  { label: 'Global Offices', value: '45+',     icon: Building },
  { label: 'Workforce',      value: '85,000+', icon: Users },
  { label: 'Live Projects',  value: '120+',    icon: Briefcase },
]

export default function GlobalPresence() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 60px)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }} className="dot-grid" />

      <motion.div
        ref={ref}
        variants={staggerSlow}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(21,128,61,0.1)', borderRadius: 20, marginBottom: 24, border: '1px solid var(--accent-border)' }}>
          <Globe size={14} color="var(--accent)" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Global Reach
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-display"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 16 }}
        >
          Impacting <span className="text-syne text-gold-gradient font-bold" style={{ fontStyle: 'normal' }}>18 Countries</span> Worldwide
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{ fontFamily: "'Roboto', sans-serif", fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}
        >
          From the heart of India to the rapidly growing economies of Southeast Asia and the Middle East, our infrastructure and technology solutions are shaping the global future.
        </motion.p>

          {/* Map card — no overflow clips, stats live outside */}
        <motion.div variants={fadeUp}>
          {/* Map image container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(200px, 40vw, 400px)',
            background: 'var(--surface)',
            borderRadius: '20px 20px 0 0',
            border: '1px solid var(--border)',
            borderBottom: 'none',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(21,128,61,0.08)',
          }}>
            {/* Map image */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(15%) brightness(0.95)',
            }} />

            {/* Soft tint */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(242,247,244,0.10) 0%, rgba(21,128,61,0.06) 100%)',
            }} />

            {/* Markers */}
            {MARKERS.map((marker, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.18, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                  position: 'absolute',
                  top: marker.top,
                  left: marker.left,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              >
                <div style={{ position: 'relative', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: marker.active ? 'var(--accent)' : 'var(--text-tertiary)',
                      borderRadius: '50%',
                    }}
                  />
                  <div style={{
                    width: marker.active ? 13 : 9,
                    height: marker.active ? 13 : 9,
                    background: marker.active ? 'var(--accent)' : 'var(--text-secondary)',
                    borderRadius: '50%',
                    border: `2px solid ${marker.active ? 'rgba(21,128,61,0.3)' : 'rgba(255,255,255,0.6)'}`,
                    zIndex: 2,
                    boxShadow: marker.active ? '0 0 12px rgba(21,128,61,0.5)' : 'none',
                  }} />
                </div>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(9px, 1.8vw, 11px)',
                  fontWeight: 700,
                  color: marker.active ? 'var(--accent)' : 'var(--text-primary)',
                  background: marker.active ? 'rgba(21,128,61,0.08)' : 'rgba(255,255,255,0.88)',
                  border: `1px solid ${marker.active ? 'var(--accent-border)' : 'rgba(205,224,212,0.6)'}`,
                  padding: '2px 7px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(4px)',
                }}>
                  {marker.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats bar — sits flush below the map, never clipped */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '0 0 20px 20px',
            boxShadow: '0 12px 40px rgba(21,128,61,0.08)',
            overflow: 'hidden',
          }}>
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.0 + i * 0.12 }}
                  style={{
                    flex: '1 1 30%',
                    minWidth: 100,
                    textAlign: 'center',
                    padding: 'clamp(16px, 3vw, 28px) clamp(8px, 2vw, 20px)',
                    borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(21,128,61,0.08)', marginBottom: 8,
                  }}>
                    <Icon size={16} color="var(--accent)" strokeWidth={1.8} />
                  </div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(20px, 3.5vw, 32px)',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 'clamp(9px, 1.4vw, 11px)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: 'var(--text-secondary)',
                    marginTop: 5,
                    whiteSpace: 'nowrap',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}
