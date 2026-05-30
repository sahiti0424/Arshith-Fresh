import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Megaphone, Palette, Monitor, Settings, Trophy, Star } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApplicationModal from '../ApplicationModal'

const STATS = [
  { prefix: '₹', value: 2.4, suffix: 'L Cr', decimals: 1, label: 'Annual Revenue', separator: ',' },
  { prefix: '', value: 85000, suffix: '+', decimals: 0, label: 'Employees Worldwide', separator: ',' },
  { prefix: '', value: 180, suffix: '', decimals: 0, label: 'Countries Served', separator: '' },
  { prefix: '', value: 30, suffix: '+', decimals: 0, label: 'Years of Excellence', separator: '' },
  { prefix: '', value: 5000, suffix: '+', decimals: 0, label: 'Projects Delivered', separator: ',' },
  { prefix: '₹', value: 1240, suffix: ' Cr', decimals: 0, label: 'Largest Contract', separator: ',' },
]

function StatItem({ prefix, value, suffix, decimals, label, separator, inView }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        padding: '0 12px',
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <div style={{
        fontFamily: "'Lora', serif",
        fontSize: 'clamp(20px, 2.2vw, 32px)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {prefix}
        {inView ? (
          <CountUp end={value} duration={2.2} separator={separator} decimals={decimals} useEasing />
        ) : '0'}
        {suffix}
      </div>
      <div style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        fontSize: 10,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        lineHeight: 1.4,
        fontWeight: 500,
      }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ─── INTERNSHIP SECTION ─────────────────────────────────────────────────────── */
const INTERNSHIPS = [
  {
    role: 'Marketing Intern',
    duration: '3 Months',
    mode: 'Hybrid',
    color: '#F97316',
    icon: Megaphone,
    detailId: 'marketing',
  },
  {
    role: 'Design Intern',
    duration: '3 Months',
    mode: 'Remote',
    color: 'var(--accent)',
    icon: Palette,
    detailId: 'design',
  },
  {
    role: 'Tech Intern',
    duration: '6 Months',
    mode: 'Hybrid',
    color: '#06B6D4',
    icon: Monitor,
    detailId: 'tech',
  },
  {
    role: 'Operations Intern',
    duration: '4 Months',
    mode: 'On-site',
    color: '#8B5CF6',
    icon: Settings,
    detailId: 'operations',
  },
]

function InternshipCard({ role, duration, mode, color, icon: Icon, onApply, detailId }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(15,23,42,0.14)` }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hovered ? color + '40' : 'var(--border)'}`,
        borderRadius: 16,
        padding: '28px 24px',
        flex: '1 1 200px',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        cursor: 'pointer',
        transition: 'border-color 200ms',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: color,
          transformOrigin: 'left',
          borderRadius: '16px 16px 0 0',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon size={24} color={color} strokeWidth={2} />
        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 10, fontWeight: 500,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: mode === 'Remote' ? '#10B981' : mode === 'Hybrid' ? color : 'var(--text-secondary)',
          background: mode === 'Remote' ? 'rgba(16,185,129,0.1)' : `${color}12`,
          padding: '4px 10px', borderRadius: 20,
        }}>
          {mode}
        </span>
      </div>

      <div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 6,
        }}>
          {role}
        </div>
        <div style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12, color: 'var(--text-tertiary)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {duration}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <motion.button
          onClick={() => onApply({ role, color })}
          whileHover={{ backgroundColor: color, color: '#fff' }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: color,
            background: `${color}12`,
            border: `1.5px solid ${color}30`,
            padding: '10px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'background 180ms, color 180ms',
          }}
        >
          Apply Now →
        </motion.button>
        <Link
          to={`/internship/${detailId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 10, fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            textAlign: 'center',
            padding: '8px 16px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            display: 'block',
            transition: 'border-color 180ms, color 180ms',
          }}
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}


export default function StatsBar() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const { ref: internRef, inView: internInView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleApply = (program) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* ── Compact Stats Bar ── */}
      <motion.div
        ref={ref}
        initial={{ y: 50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          marginTop: -80,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(21, 128, 61, 0.15)',
          borderRadius: 24,
          padding: '20px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          boxShadow: '0 25px 50px rgba(21, 128, 61, 0.1)',
          maxWidth: 1200,
          margin: '-80px auto 80px', // Pulled up over the hero
          overflow: 'hidden'
        }}
      >
        {/* Subtle glow behind stats */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top, rgba(21, 128, 61, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', flex: 1, alignItems: 'center', position: 'relative', zIndex: 1 }}>
            <StatItem {...stat} inView={inView} />
            {i < STATS.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08 + 0.2 }}
                style={{
                  width: 1, height: 48,
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
                  flexShrink: 0,
                  marginLeft: 'auto',
                  transformOrigin: 'top',
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* ── Internship Opportunities Section ── */}
      <motion.section
        ref={internRef}
        initial={{ opacity: 0, y: 40 }}
        animate={internInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--bg)',
          padding: '80px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: -60, right: -60,
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21, 128, 61, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={internInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(21, 128, 61, 0.08)',
                border: '1px solid rgba(21, 128, 61, 0.18)',
                borderRadius: 20, padding: '5px 14px',
                marginBottom: 16,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Now Recruiting
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={internInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 14,
              }}
            >
              Start Your Journey with<br />
              <span style={{ color: 'var(--accent)' }}>Arshith Groups</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={internInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 16, fontWeight: 300,
                color: 'var(--text-secondary)', maxWidth: 520,
                lineHeight: 1.65,
              }}
            >
              Gain real-world experience at one of India's leading conglomerates. Work alongside industry experts, shape landmark projects, and accelerate your career from day one.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {INTERNSHIPS.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 24 }}
                animate={internInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                style={{ flex: '1 1 200px', minWidth: 0 }}
              >
                <InternshipCard {...item} onApply={handleApply} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Marquee Strip — Bigger & Bolder ── */}
      <div style={{
        background: 'var(--surface)',
        borderTop: '2px solid var(--border)',
        borderBottom: '2px solid var(--border)',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Left fade */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 160,
          background: 'linear-gradient(to right, var(--surface) 60%, transparent)',
          zIndex: 2, display: 'flex', alignItems: 'center', paddingLeft: 28,
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '3px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Recognition
          </span>
        </div>
        {/* Right fade */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--surface), transparent)', zIndex: 2 }} />

        <style>{`
          @keyframes marquee-bold {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-bold {
            display: flex;
            width: max-content;
            animation: marquee-bold 28s linear infinite;
          }
          .marquee-bold:hover { animation-play-state: paused; }
        `}</style>

        <div className="marquee-bold" style={{ paddingLeft: 160 }}>
          {[
            'Infrastructure Company of the Year 2025',
            'ISO 9001:2015 Certified',
            'Fortune India 500 — Ranked #38',
            'GRIHA 5-Star Green Rating',
            'BSE Listed — NIFTY 50 Constituent',
            'CII National Award for Excellence',
            'Infrastructure Company of the Year 2025',
            'ISO 9001:2015 Certified',
            'Fortune India 500 — Ranked #38',
            'GRIHA 5-Star Green Rating',
            'BSE Listed — NIFTY 50 Constituent',
            'CII National Award for Excellence',
          ].map((award, i) => (
            <span key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.3px',
              marginRight: 72,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <Star size={14} color="var(--gold)" fill="var(--gold)" />
              {award}
            </span>
          ))}
        </div>
      </div>
      <ApplicationModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
