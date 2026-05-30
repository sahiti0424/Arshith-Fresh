import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Globe, MapPin } from 'lucide-react'
import { fadeUp, staggerSlow } from '../../lib/animations'

export default function GlobalPresence() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  
  return (
    <section style={{ background: 'var(--bg)', padding: '120px 60px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }} className="dot-grid" />
      
      <motion.div
        ref={ref}
        variants={staggerSlow}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}
      >
        <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(212,175,55,0.1)', borderRadius: 20, marginBottom: 24, border: '1px solid var(--accent-border)' }}>
          <Globe size={14} color="var(--accent)" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Global Reach
          </span>
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="text-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 20 }}>
          Impacting <span className="text-syne text-gold-gradient font-bold" style={{ fontStyle: 'normal' }}>18 Countries</span> Worldwide
        </motion.h2>
        
        <motion.p variants={fadeUp} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 60px' }}>
          From the heart of India to the rapidly growing economies of Southeast Asia and the Middle East, our infrastructure and technology solutions are shaping the global future.
        </motion.p>
        
        {/* Animated Map Graphic / Data Viz */}
        <motion.div variants={fadeUp} style={{ position: 'relative', width: '100%', height: 500, background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)', overflow: 'hidden' }} className="shadow-lg">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(20%) opacity(0.8)' }} />
          
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(242,247,244,0.4), rgba(242,247,244,0.2))' }} />
          
          {/* Animated pulsing markers */}
          {[
            { top: '40%', left: '30%', name: 'Europe' },
            { top: '35%', left: '70%', name: 'Asia Pacific' },
            { top: '60%', left: '20%', name: 'Americas' },
            { top: '50%', left: '60%', name: 'Middle East & India', active: true }
          ].map((marker, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5 + (i * 0.2), type: 'spring' }}
              style={{ position: 'absolute', top: marker.top, left: marker.left, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0, background: marker.active ? 'var(--accent)' : 'var(--text-tertiary)', borderRadius: '50%' }}
                />
                <div style={{ width: 10, height: 10, background: marker.active ? 'var(--accent)' : 'var(--text-secondary)', borderRadius: '50%', zIndex: 2 }} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 8, background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: 10 }}>
                {marker.name}
              </span>
            </motion.div>
          ))}
          
          {/* Stats Overlay */}
          <div style={{ position: 'absolute', bottom: 30, left: 30, right: 30, display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
            {[
              { label: 'Global Offices', value: '45+' },
              { label: 'Workforce', value: '85,000+' },
              { label: 'Live Projects', value: '120+' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>{stat.value}</div>
                <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
      </motion.div>
    </section>
  )
}
