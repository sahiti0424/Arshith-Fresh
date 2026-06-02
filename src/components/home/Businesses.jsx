import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Cpu, HeartPulse, Truck, ArrowRight, X, CheckCircle2, Target, Trophy, ChevronDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { fadeUp, staggerGrid, wordReveal, staggerSlow } from '../../lib/animations'

const COMPANIES = [
  {
    id: 1,
    number: '01',
    icon: Building2,
    sector: 'Construction & Infrastructure',
    name: 'Arshith Build',
    description: "Engineering India's skyline — from smart highways to mega urban projects.",
    color: '#F97316',
    colorLight: '#032478ff',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    details: {
      about: "Arshith Build is at the forefront of modern infrastructure development. We specialize in high-impact projects including national expressways, smart city development, and large-scale commercial complexes. Our engineering excellence ensures that every project not only meets but exceeds global standards for safety and sustainability.",
      mission: "To construct the physical backbone of the economy, fostering connectivity and sustainable urban expansion.",
      achievements: [
        "Constructed over 5,000 km of national expressways.",
        "Pioneered zero-emission building sites in urban centers.",
        "Awarded 'Infrastructure Company of the Year' 2025."
      ],
      services: [
        "Highway & Expressway Engineering",
        "Urban Smart City Development",
        "Commercial Skyscraper Construction",
        "Sustainable Architecture Practices"
      ]
    }
  },
  {
    id: 2,
    number: '02',
    icon: Cpu,
    sector: 'Technology & Innovation',
    name: 'Arshith Tech',
    description: 'Pioneering enterprise digital transformation and secure cloud infrastructure.',
    color: '#06B6D4',
    colorLight: '#22D3EE',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    details: {
      about: "Arshith Tech drives the digital backbone of our modern enterprises. From AI-driven analytics platforms to robust cybersecurity infrastructure, we build the technology that powers tomorrow's global economy, enabling businesses to scale securely and efficiently.",
      mission: "Driving the digital frontier through innovative, scalable, and secure smart systems.",
      achievements: [
        "Deployed AI-driven analytics for 500+ global enterprises.",
        "Maintained a flawless zero-breach record for our hybrid cloud architecture.",
        "Developed proprietary IoT grids for smart city integrations."
      ],
      services: [
        "Enterprise AI Integration",
        "IoT & Smart Infrastructure",
        "Hybrid Cloud Transformation",
        "Advanced Cybersecurity"
      ]
    }
  },
  {
    id: 3,
    number: '03',
    icon: HeartPulse,
    sector: 'Healthcare & Life Sciences',
    name: 'Arshith Health',
    description: 'Building world-class medical facilities and advancing biotech research.',
    color: '#10B981',
    colorLight: '#01100aff',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
    details: {
      about: "Arshith Health is committed to elevating the standard of care globally. We design, build, and operate state-of-the-art hospitals, cutting-edge research centers, and efficient pharmaceutical manufacturing hubs, ensuring healthcare accessibility reaches new heights.",
      mission: "Elevating global healthcare accessibility through innovation, research, and world-class patient care.",
      achievements: [
        "Operating 15+ multi-specialty research hospitals globally.",
        "Pioneered highly accessible rural telemedicine platforms.",
        "Leading breakthroughs in localized biotechnology research."
      ],
      services: [
        "Hospital Design & Operations",
        "Biomedical Research Facilities",
        "Pharmaceutical Supply Chain",
        "Advanced Patient Care Platforms"
      ]
    }
  },
  {
    id: 4,
    number: '04',
    icon: Truck,
    sector: 'Logistics & Mobility',
    name: 'Arshith Move',
    description: 'Orchestrating seamless, intelligent, and green global supply chains.',
    color: '#2b028bff',
    colorLight: '#08011dff',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    details: {
      about: "Arshith Move operates one of the most advanced logistics networks in the region. Combining green fleets with AI-driven routing, we ensure timely, eco-friendly delivery at scale. Our automated warehousing solutions redefine supply chain efficiency.",
      mission: "Delivering seamless, intelligent, and environmentally sustainable global mobility solutions.",
      achievements: [
        "Managing over 2 million sq.ft. of fully automated warehousing.",
        "Operating a fleet that is 60% electric, reducing carbon footprint significantly.",
        "Achieved 99.8% on-time global freight delivery rate."
      ],
      services: [
        "Global Freight Forwarding",
        "Automated Warehousing Systems",
        "Electric Last-Mile Delivery",
        "Supply Chain Consulting"
      ]
    }
  },
]

/* ── Inline detail panel (mobile) ──────────────────────────────────────────── */
function InlineDetail({ company, onClose }) {
  const Icon = company.icon
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderTop: 'none',
        borderRadius: '0 0 20px 20px',
        padding: '24px 20px 28px',
      }}>
        {/* Close row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(21,128,61,0.08)',
              border: '1px solid var(--accent-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color="var(--accent)" strokeWidth={1.5} />
            </div>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {company.name}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
                {company.sector}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--bg-warm)', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <X size={16} color="var(--text-primary)" strokeWidth={2} />
          </button>
        </div>

        {/* About */}
        <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
          {company.details.about}
        </p>

        {/* Mission */}
        <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 14, marginBottom: 24 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 6 }}>
            Mission
          </div>
          <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.6 }}>
            "{company.details.mission}"
          </p>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Trophy size={13} color="var(--accent)" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Key Achievements
            </span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {company.details.achievements.map((a, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <CheckCircle2 size={13} color="var(--accent)" />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Core Capabilities
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {company.details.services.map((s, i) => (
              <div key={i} style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                padding: '12px 10px',
                borderRadius: 10,
                fontFamily: "'Roboto', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-primary)',
                textAlign: 'center',
              }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '14px',
          background: 'var(--accent)',
          color: 'var(--text-inverse)',
          border: 'none',
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Partner with {company.name}
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  )
}

/* ── Business Card ─────────────────────────────────────────────────────────── */
function BusinessCard({ company, index, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const Icon = company.icon

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }
    }
  }

  const handleClick = () => {
    if (isMobile) {
      setMobileOpen((v) => !v)
    } else {
      onClick()
    }
  }

  return (
    <motion.div variants={cardVariants} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Card face */}
      <motion.div
        onClick={handleClick}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        style={{
          position: 'relative',
          minHeight: isMobile ? 'auto' : 420,
          borderRadius: mobileOpen ? '20px 20px 0 0' : 20,
          overflow: 'hidden',
          cursor: 'pointer',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderBottom: mobileOpen ? 'none' : '1px solid var(--border)',
          boxShadow: hovered ? '0 30px 60px rgba(42,36,31,0.08)' : '0 10px 30px rgba(42,36,31,0.03)',
          display: 'flex',
          flexDirection: 'column',
        }}
        animate={(!isMobile && hovered) ? { y: -8 } : { y: 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Top Image Section */}
        <div style={{ position: 'relative', height: isMobile ? 160 : 220, overflow: 'hidden' }}>
          <motion.div
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${company.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.2), transparent)' }} />
          <div style={{
            position: 'absolute', top: 20, right: 20,
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <Icon size={22} strokeWidth={1.5} color="var(--accent)" />
          </div>
        </div>

        {/* Bottom Content */}
        <div style={{ padding: isMobile ? '20px 18px' : '32px 24px', display: 'flex', flexDirection: 'column', flex: 1, background: 'var(--surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
              {company.sector}
            </span>
          </div>

          <h3 className="text-display" style={{ fontSize: isMobile ? 24 : 32, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.1 }}>
            {company.name}
          </h3>

          <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
            {company.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-primary)' }}>
              {isMobile ? (mobileOpen ? 'Show Less' : 'View Details') : 'Explore Vertical'}
            </span>
            <motion.div animate={isMobile ? { rotate: mobileOpen ? 180 : 0 } : { x: hovered ? 4 : 0 }} transition={{ duration: 0.22 }}>
              {isMobile
                ? <ChevronDown size={16} strokeWidth={2} color="var(--accent)" />
                : <ArrowRight size={16} strokeWidth={1.5} color="var(--accent)" />
              }
            </motion.div>
          </div>
        </div>

        {/* Hover bottom accent (desktop only) */}
        {!isMobile && (
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'var(--grad-gold)', transformOrigin: 'left' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Inline detail panel (mobile only) */}
      {isMobile && (
        <AnimatePresence>
          {mobileOpen && <InlineDetail company={company} onClose={() => setMobileOpen(false)} />}
        </AnimatePresence>
      )}
    </motion.div>
  )
}

/* ── Desktop Modal ─────────────────────────────────────────────────────────── */
function Modal({ company, onClose }) {
  if (!company) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)', padding: 20 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'clamp(320px, 95vw, 1000px)', maxWidth: 1000, background: 'var(--surface)', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh', boxShadow: '0 24px 60px rgba(0,0,0,0.8)', position: 'relative', border: '1px solid var(--border)' }}
      >
        <div style={{ height: 260, position: 'relative' }}>
          <img src={company.image} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface) 5%, transparent 100%)' }} />
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} color="var(--text-primary)" />
          </button>
        </div>

        <div style={{ padding: '0 24px 48px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: -32, position: 'relative', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(212,175,55,0.1)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}>
              <company.icon size={40} color="var(--accent)" />
            </div>
            <div style={{ paddingTop: 32 }}>
              <h2 className="text-display" style={{ fontSize: 40, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>{company.name}</h2>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>{company.sector}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, marginTop: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div>
                <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 12 }}>Corporate Overview</h4>
                <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.8 }}>{company.details.about}</p>
              </div>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16 }}>
                  <Target size={16} color="var(--accent)" /> Our Mission
                </h4>
                <p className="text-display" style={{ fontSize: 24, color: 'var(--text-primary)', lineHeight: 1.4, paddingLeft: 16, borderLeft: '2px solid var(--accent)' }}>
                  "{company.details.mission}"
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  <Trophy size={16} color="var(--accent)" /> Key Achievements
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {company.details.achievements.map((achievement, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: "'Roboto', sans-serif", fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 8, flexShrink: 0, boxShadow: '0 0 10px var(--accent-glow)' }} />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  <CheckCircle2 size={16} color="var(--accent)" /> Core Capabilities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {company.details.services.map((service, i) => (
                    <div key={i} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: '16px', borderRadius: 12, fontFamily: "'Roboto', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <button
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px', background: 'var(--accent)', color: 'var(--bg)', border: 'none', borderRadius: 4, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Partner with {company.name} <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main Section ──────────────────────────────────────────────────────────── */
export default function Businesses() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '0px 0px -60px 0px' })
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ padding: '120px 0 60px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <motion.div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', marginBottom: 80, textAlign: 'center', position: 'relative', zIndex: 1 }}
        variants={staggerSlow}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,0.05)', border: '1px solid var(--accent-border)', borderRadius: 20, padding: '6px 16px', marginBottom: 16 }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)' }}>OUR VERTICALS</span>
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <motion.h2
            className="text-display"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ fontSize: 'clamp(40px, 5vw, 72px)', color: 'var(--text-primary)', lineHeight: 1.1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 12px', marginBottom: 14 }}
          >
            {['Group', 'of', 'Companies'].map((word, i) => (
              <span key={word} className="word-wrap">
                <motion.span variants={wordReveal} style={{ display: 'inline-block' }} className={i === 2 ? 'text-gold-gradient text-syne font-bold' : ''}>{word}</motion.span>
              </span>
            ))}
          </motion.h2>
        </div>

        <motion.p variants={fadeUp} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 18, fontWeight: 300, color: 'var(--text-secondary)', maxWidth: 700, lineHeight: 1.7 }}>
          Each vertical is a self-sustaining engine of growth, interconnected by shared values of precision, innovation, and long-term nation-building.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={staggerGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-12 max-w-[1800px] mx-auto"
        style={{ width: '100%' }}
      >
        {COMPANIES.map((company, i) => (
          <BusinessCard
            key={company.id}
            company={company}
            index={i}
            isMobile={isMobile}
            onClick={() => setSelectedCompany(company)}
          />
        ))}
      </motion.div>

      {/* Desktop Modal */}
      <AnimatePresence>
        {!isMobile && selectedCompany && (
          <Modal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
