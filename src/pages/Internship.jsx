import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants, fadeUp, blurIn, staggerSlow } from '../lib/animations'
import { Briefcase, Clock, MapPin, GraduationCap, ArrowRight, CheckCircle2, X, Send, User, Mail, GraduationCap as DegreeIcon, Calendar, DollarSign, Phone, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import ApplicationModal from '../components/ApplicationModal'

const INTERNSHIP_PROGRAMS = [
  {
    id: 1,
    detailId: 'construction',
    title: 'Construction Engineering Intern',
    department: 'Arshith Build',
    location: 'Mumbai, Delhi, Bangalore',
    duration: '3-6 months',
    type: 'Full-time',
    color: '#F97316',
    description: 'Work on real infrastructure projects, from highways to smart city developments.',
    requirements: [
      'Pursuing B.Tech/M.Tech in Civil Engineering',
      'Strong understanding of construction principles',
      'Proficiency in AutoCAD or similar tools',
      'Excellent communication skills'
    ]
  },
  {
    id: 2,
    detailId: 'tech',
    title: 'Software Development Intern',
    department: 'Arshith Tech',
    location: 'Bangalore, Hyderabad',
    duration: '3-6 months',
    type: 'Full-time',
    color: '#06B6D4',
    description: 'Build cutting-edge AI and cloud solutions for enterprise clients.',
    requirements: [
      'Pursuing B.Tech/M.Tech in Computer Science',
      'Strong programming skills (Python, Java, or JavaScript)',
      'Knowledge of cloud platforms (AWS/Azure)',
      'Problem-solving mindset'
    ]
  },
  {
    id: 3,
    detailId: 'operations',
    title: 'Healthcare Operations Intern',
    department: 'Arshith Health',
    location: 'Delhi, Chennai',
    duration: '3-6 months',
    type: 'Full-time',
    color: '#10B981',
    description: 'Support hospital operations and healthcare innovation initiatives.',
    requirements: [
      'Pursuing degree in Healthcare Management or related field',
      'Understanding of healthcare systems',
      'Strong analytical skills',
      'Passion for improving patient care'
    ]
  },
  {
    id: 4,
    detailId: 'operations',
    title: 'Supply Chain & Logistics Intern',
    department: 'Arshith Move',
    location: 'Mumbai, Pune',
    duration: '3-6 months',
    type: 'Full-time',
    color: '#8B5CF6',
    description: 'Optimize logistics operations and contribute to sustainable supply chain solutions.',
    requirements: [
      'Pursuing degree in Supply Chain, Operations, or related field',
      'Analytical and data-driven approach',
      'Familiarity with logistics software',
      'Team player with strong work ethics and work culture'
    ]
  }
]

function InternshipCard({ program, onApply }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        y: -12,
        boxShadow: `0 24px 56px ${program.color}30`,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        padding: 32,
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${program.color}40 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Animated top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${program.color}, ${program.color}80)`,
          transformOrigin: 'left',
        }}
      />

      {/* Floating particles effect */}
      {hovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, 50, 100],
              y: [0, -50, -100]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: program.color,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, -60, -120],
              y: [0, -40, -80]
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.3 }}
            style={{
              position: 'absolute',
              top: '60%',
              right: '15%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: program.color,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <motion.div
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, position: 'relative', zIndex: 1 }}
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: `${program.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            animate={{
              rotate: hovered ? [0, -10, 10, -10, 0] : 0,
              scale: hovered ? 1.15 : 1
            }}
            transition={{
              rotate: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
          >
            {/* Pulsing ring effect */}
            <motion.div
              animate={hovered ? {
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0]
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: 12,
                border: `2px solid ${program.color}`,
                pointerEvents: 'none',
              }}
            />
            <Briefcase size={28} color={program.color} strokeWidth={2.5} />
          </motion.div>
          <div>
            <motion.h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: 4
              }}
              animate={{
                color: hovered ? program.color : 'var(--text-primary)'
              }}
              transition={{ duration: 0.3 }}
            >
              {program.title}
            </motion.h3>
            <motion.span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: program.color,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              animate={{
                letterSpacing: hovered ? '2px' : '1px'
              }}
              transition={{ duration: 0.3 }}
            >
              {program.department}
            </motion.span>
          </div>
        </div>
      </motion.div>

      <motion.p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 15,
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: 24,
          position: 'relative',
          zIndex: 1
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {program.description}
      </motion.p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24, position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 8, background: `${program.color}10` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.08, x: 4, backgroundColor: `${program.color}20` }}
        >
          <motion.div
            animate={hovered ? { rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <MapPin size={16} color={program.color} />
          </motion.div>
          <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {program.location}
          </span>
        </motion.div>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 8, background: `${program.color}10` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.08, x: 4, backgroundColor: `${program.color}20` }}
        >
          <motion.div
            animate={hovered ? { rotate: 360 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Clock size={16} color={program.color} />
          </motion.div>
          <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {program.duration}
          </span>
        </motion.div>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 8, background: `${program.color}10` }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.08, x: 4, backgroundColor: `${program.color}20` }}
        >
          <motion.div
            animate={hovered ? { y: [-2, 2, -2] } : {}}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <GraduationCap size={16} color={program.color} />
          </motion.div>
          <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500 }}>
            {program.type}
          </span>
        </motion.div>
      </div>

      <motion.div
        style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.h4
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: 12
          }}
          animate={{
            color: hovered ? program.color : 'var(--text-tertiary)'
          }}
          transition={{ duration: 0.3 }}
        >
          Requirements
        </motion.h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {program.requirements.map((req, i) => (
            <motion.li
              key={i}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <CheckCircle2 size={18} color={program.color} style={{ marginTop: 2, flexShrink: 0 }} />
              </motion.div>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {req}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.button
        onClick={() => onApply(program)}
        whileHover={{
          backgroundColor: program.color,
          color: '#FFFFFF',
          scale: 1.02,
          boxShadow: `0 12px 32px ${program.color}50`
        }}
        whileTap={{ scale: 0.96 }}
        animate={{
          borderColor: hovered ? program.color : `${program.color}40`
        }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '16px 24px',
          background: `${program.color}20`,
          color: program.color,
          border: `2px solid ${program.color}40`,
          borderRadius: 10,
          fontFamily: "'Roboto', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          marginBottom: 12,
        }}
      >
        {/* Button shine effect */}
        <motion.div
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>Apply Now</span>
        <motion.div
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <ArrowRight size={18} strokeWidth={2.5} />
        </motion.div>
      </motion.button>
      <Link
        to={`/internship/${program.detailId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '12px 24px',
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          fontFamily: "'Roboto', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
        }}
      >
        View Full Details →
      </Link>
    </motion.div>
  )
}


export default function Internship() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleApply = (program) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProgram(null), 300)
  }

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
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)'
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.05, 0.02],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)'
        }}
      />

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div
            variants={fadeUp}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}
          >
            <motion.span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: 'var(--gold)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Career Development
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            Internship <motion.span
              style={{ color: 'var(--gold)', fontStyle: 'italic' }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(212, 175, 55, 0.3)',
                  '0 0 20px rgba(212, 175, 55, 0.5)',
                  '0 0 10px rgba(212, 175, 55, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Programs
            </motion.span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ width: 60, height: 2, background: 'var(--gold)', margin: '0 auto 32px' }}
          />

          <motion.p
            variants={blurIn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 700,
              margin: '0 auto 60px'
            }}
          >
            Launch your career with Arshith Group. Our internship programs offer hands-on experience in nation-building projects across construction, technology, healthcare, and logistics. Work alongside industry leaders and contribute to India's growth story.
          </motion.p>

          {/* Benefits Section */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
              maxWidth: 900,
              margin: '0 auto 80px',
              padding: '40px',
              background: 'var(--surface2)',
              borderRadius: 24,
              border: '1px solid var(--border-light)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(5px)'
            }}
          >
            {/* Animated border glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                inset: -1,
                background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)',
                borderRadius: 16,
                pointerEvents: 'none',
              }}
            />

            {[
              { value: '₹1K+', label: 'Program Fee', delay: 0, color: '#F97316' },
              { value: '100%', label: 'Real Projects', delay: 0.1, color: '#06B6D4' },
              { value: 'PPO', label: 'Opportunities', delay: 0.2, color: '#10B981' },
              { value: 'Mentorship', label: 'From Experts', delay: 0.3, color: '#8B5CF6' }
            ].map((item, i) => (
              <motion.div
                key={i}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  padding: '20px',
                  borderRadius: 12,
                  background: 'transparent'
                }}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: item.delay,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  backgroundColor: `${item.color}10`,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: 'absolute',
                    inset: -10,
                    background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                    borderRadius: 12,
                    pointerEvents: 'none',
                    filter: 'blur(20px)'
                  }}
                />

                <motion.div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: 'var(--gold)',
                    marginBottom: 8,
                    position: 'relative',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: item.delay + 0.2 }}
                  whileHover={{
                    scale: 1.2,
                    color: item.color,
                    textShadow: `0 0 20px ${item.color}80`,
                    transition: { duration: 0.3 }
                  }}
                >
                  {item.value}
                </motion.div>
                <motion.div
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 13,
                    color: 'var(--text-tertiary)',
                    fontWeight: 500,
                    position: 'relative',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: item.delay + 0.4 }}
                >
                  {item.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Internship Cards Grid */}
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: 32
          }}
        >
          {INTERNSHIP_PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <InternshipCard program={program} onApply={handleApply} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 80,
            padding: 60,
            background: 'var(--surface2)',
            borderRadius: 32,
            border: '1px solid var(--border-light)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(5px)'
          }}
        >
          {/* Background glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <motion.h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--gold)',
              marginBottom: 16,
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't See Your Field?
          </motion.h2>
          <motion.p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 16,
              color: 'var(--text-secondary)',
              marginBottom: 32,
              maxWidth: 600,
              margin: '0 auto 32px',
              position: 'relative',
              zIndex: 1
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We're always looking for talented individuals across all disciplines. Send us your resume and we'll reach out when a suitable position opens up.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(27, 246, 231, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => handleApply(null)}
            style={{
              padding: '16px 40px',
              background: 'var(--border)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              fontFamily: "'Roboto', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
              backdropFilter: 'blur(5px)'
            }}
          >
            Submit General Application
          </motion.button>
        </motion.div>
      </motion.div>

      <ApplicationModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.main>
  )
}
