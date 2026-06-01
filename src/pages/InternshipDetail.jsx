import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, MapPin, Clock, Briefcase, IndianRupee,
  CheckCircle2, Star, Calendar, Users, BookOpen,
  Wifi, Coffee, Award, Zap, ChevronRight, ArrowRight, X
} from 'lucide-react'
import ApplicationModal from '../components/ApplicationModal'
import { pageVariants, fadeUp, staggerSlow, blurIn } from '../lib/animations'

const PAYMENT_METHODS = [
  { id: 'bank', label: 'Bank Transfer (NEFT/IMPS)', icon: '🏦', desc: 'Directly transfer to our corporate account.' },
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'Scan and pay via Google Pay, PhonePe or BHIM UPI.' },
]

const INTERNSHIP_DETAILS = [
  {
    id: 'marketing',
    role: 'Marketing Intern',
    department: 'Arshith Brand & Communications',
    location: 'Hyderabad (Hybrid)',
    duration: '3 Months',
    mode: 'Hybrid',
    color: '#F97316',
    stipend: '₹15,000',
    openings: 4,
    startDate: 'June 2026',
    stipendTiers: [
      { months: '2 Months', amount: '₹1,000', note: 'Short-term project fee' },
      { months: '4 Months', amount: '₹2,000', note: 'Standard internship fee' },
      { months: '6 Months (Full)', amount: '₹3,000', note: 'Comprehensive program fee' },
    ],
    tagline: 'Shape the voice of a conglomerate trusted by millions.',
    overview:
      'Join the Brand & Communications team at Arshith Group and get hands-on exposure to enterprise-level marketing campaigns, brand strategy, content production, and digital analytics. You will collaborate directly with senior brand managers and work on live campaigns that reach millions.',
    responsibilities: [
      'Assist in planning and executing multi-channel marketing campaigns',
      'Create and manage social media content calendars',
      'Conduct market research and competitive analysis',
      'Support production of brand collateral (brochures, presentations, videos)',
      'Analyze campaign performance data and generate reports',
      'Coordinate with internal teams and external vendors',
    ],
    requirements: [
      'Pursuing a degree in Marketing, Mass Communication, or Business Administration',
      'Strong written and verbal communication skills',
      'Familiarity with social media platforms and digital marketing tools',
      'Proficiency in Canva, PowerPoint, or similar design tools is a plus',
      'Proactive attitude and ability to work in a fast-paced environment',
    ],
    perks: [
      { icon: IndianRupee, label: 'Program Fee', value: 'Starting at ₹1,000' },
      { icon: Calendar, label: 'Duration', value: '3 Months' },
      { icon: Wifi, label: 'Mode', value: 'Hybrid (3 days office)' },
      { icon: Coffee, label: 'Meals', value: 'Office lunch provided on-site days' },
      { icon: Award, label: 'Certificate', value: 'Completion certificate issued' },
      { icon: Star, label: 'PPO Opportunity', value: 'Top performers get Pre-Placement Offers' },
    ],
    selectionProcess: [
      'Online Application',
      'Shortlisting based on resume & portfolio',
      'Virtual Aptitude & Communication Round',
      'HR Interview',
      'Offer Letter',
    ],
  },
  {
    id: 'design',
    role: 'Design Intern',
    department: 'Arshith Creative Studio',
    location: 'Remote',
    duration: '3 Months',
    mode: 'Remote',
    color: '#D4AF37',
    stipend: '₹12,000',
    openings: 3,
    startDate: 'June 2026',
    stipendTiers: [
      { months: '2 Months', amount: '₹1,000', note: 'Short-term project fee' },
      { months: '4 Months', amount: '₹2,000', note: 'Standard internship fee' },
      { months: '6 Months (Full)', amount: '₹3,000', note: 'Comprehensive program fee' },
    ],
    overview:
      'Work remotely with Arshith\'s in-house creative studio and contribute to the visual identity of one of India\'s most recognizable conglomerates. From UI design and motion graphics to printed collateral, you\'ll contribute to real deliverables used across all business verticals.',
    responsibilities: [
      'Create visual assets for digital and print campaigns',
      'Design UI screens for internal tools and client-facing portals',
      'Develop motion graphic content for social media and presentations',
      'Maintain and evolve the brand style guide',
      'Collaborate with the marketing team on integrated campaigns',
      'Present concepts and iterate based on feedback',
    ],
    requirements: [
      'Pursuing a degree in Design, Fine Arts, or related discipline',
      'Proficiency in Figma, Adobe Illustrator, and Photoshop',
      'Strong portfolio demonstrating visual design skills',
      'Basic knowledge of motion design (After Effects / Spline) is a bonus',
      'Attention to detail and a strong aesthetic sensibility',
    ],
    perks: [
      { icon: IndianRupee, label: 'Program Fee', value: 'Starting at ₹1,000' },
      { icon: Calendar, label: 'Duration', value: '3 Months' },
      { icon: Wifi, label: 'Mode', value: 'Fully Remote' },
      { icon: Coffee, label: 'Equipment', value: 'Software licenses provided' },
      { icon: Award, label: 'Certificate', value: 'Completion certificate issued' },
      { icon: Star, label: 'PPO Opportunity', value: 'Top performers get Pre-Placement Offers' },
    ],
    selectionProcess: [
      'Online Application with Portfolio Link',
      'Design Assignment (48-hour brief)',
      'Portfolio Review with Creative Lead',
      'HR Interview',
      'Offer Letter',
    ],
  },
  {
    id: 'tech',
    role: 'Tech Intern',
    department: 'Arshith Technology',
    location: 'Bangalore / Hyderabad (Hybrid)',
    duration: '6 Months',
    mode: 'Hybrid',
    color: '#06B6D4',
    stipend: '₹20,000',
    openings: 6,
    startDate: 'July 2026',
    stipendTiers: [
      { months: '2 Months', amount: '₹1,000', note: 'Short-term project fee' },
      { months: '4 Months', amount: '₹2,000', note: 'Standard internship fee' },
      { months: '6 Months (Full)', amount: '₹3,000', note: 'Comprehensive program fee' },
    ],
    tagline: 'Build enterprise technology that powers 85,000+ people.',
    overview:
      'Join Arshith Technology and work on real production systems — from AI/ML pipelines and cloud infrastructure to full-stack web applications and mobile platforms. You\'ll be mentored by senior engineers and ship features that impact the entire Arshith ecosystem.',
    responsibilities: [
      'Develop and maintain production-grade features in web or mobile applications',
      'Participate in sprint planning, code reviews, and daily standups',
      'Write clean, well-documented, and tested code',
      'Contribute to system design discussions and architecture reviews',
      'Debug and resolve production issues',
      'Explore AI/ML or cloud integrations where applicable',
    ],
    requirements: [
      'Pursuing B.Tech / M.Tech in Computer Science or related field',
      'Proficiency in at least one: Python, JavaScript/TypeScript, Java, Go',
      'Familiarity with React, Node.js, Django, or Spring Boot',
      'Understanding of cloud services (AWS / GCP / Azure) preferred',
      'Strong problem-solving and algorithmic thinking',
    ],
    perks: [
      { icon: IndianRupee, label: 'Program Fee', value: 'Starting at ₹1,000' },
      { icon: Calendar, label: 'Duration', value: '6 Months' },
      { icon: Wifi, label: 'Mode', value: 'Hybrid (4 days office)' },
      { icon: Coffee, label: 'Meals', value: 'Office lunch + snacks provided' },
      { icon: Award, label: 'Certificate', value: 'Completion certificate issued' },
      { icon: Star, label: 'PPO Opportunity', value: 'High-performing interns offered full-time roles' },
    ],
    selectionProcess: [
      'Online Application',
      'Coding Assessment (LeetCode-style, 90 min)',
      'Technical Interview (DSA + System Design basics)',
      'HR Culture Fit Interview',
      'Offer Letter',
    ],
  },
  {
    id: 'operations',
    role: 'Operations Intern',
    department: 'Arshith Infrastructure Operations',
    location: 'Mumbai / Pune (On-site)',
    duration: '4 Months',
    mode: 'On-site',
    color: '#8B5CF6',
    stipend: '₹18,000',
    openings: 5,
    startDate: 'June 2026',
    stipendTiers: [
      { months: '2 Months', amount: '₹1,000', note: 'Short-term project fee' },
      { months: '4 Months', amount: '₹2,000', note: 'Standard internship fee' },
      { months: '6 Months (Full)', amount: '₹3,000', note: 'Comprehensive program fee' },
    ],
    overview:
      'Get on-ground exposure to large-scale infrastructure and supply chain operations at Arshith Group. You\'ll be embedded within operational teams managing logistics, procurement, vendor coordination, and quality assurance across some of India\'s most ambitious projects.',
    responsibilities: [
      'Support day-to-day operations management at project sites',
      'Assist with procurement planning and vendor coordination',
      'Prepare operational reports and performance dashboards',
      'Identify process improvement opportunities and propose solutions',
      'Liaise with cross-functional teams including engineering and finance',
      'Monitor project timelines and escalate risks proactively',
    ],
    requirements: [
      'Pursuing degree in Operations Management, Industrial Engineering, or MBA',
      'Strong analytical and problem-solving skills',
      'Proficiency in MS Excel and data analysis tools',
      'Excellent communication and coordination abilities',
      'Ability to work on-site in Mumbai or Pune',
    ],
    perks: [
      { icon: IndianRupee, label: 'Program Fee', value: 'Starting at ₹1,000' },
      { icon: Calendar, label: 'Duration', value: '4 Months' },
      { icon: Wifi, label: 'Mode', value: 'On-site (Mumbai / Pune)' },
      { icon: Coffee, label: 'Meals', value: 'Office lunch + travel allowance' },
      { icon: Award, label: 'Certificate', value: 'Completion certificate issued' },
      { icon: Star, label: 'PPO Opportunity', value: 'Top performers considered for full-time roles' },
    ],
    selectionProcess: [
      'Online Application',
      'Case Study Assignment (Ops scenario)',
      'Group Discussion Round',
      'Managerial Interview',
      'HR Interview & Offer Letter',
    ],
  },
]

export default function InternshipDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState(null)

  const program = INTERNSHIP_DETAILS.find((p) => p.id === id)

  if (!program) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif", fontSize: 32 }}>Program not found</h2>
          <Link to="/internship" style={{ color: 'var(--accent)', fontFamily: "'Roboto', sans-serif" }}>← Back to Internships</Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 88 }}
    >
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, var(--bg) 0%, var(--bg-warm) 60%, ${program.color}15 100%)`,
        borderBottom: '2px solid var(--border)',
        padding: '60px 60px 48px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}
          >
            <Link to="/internship" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontFamily: "'Roboto', sans-serif", fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
              <ArrowLeft size={14} strokeWidth={2} />
              All Internships
            </Link>
            <ChevronRight size={12} color="var(--text-tertiary)" />
            <span style={{ color: 'var(--accent)', fontFamily: "'Roboto', sans-serif", fontSize: 13, fontWeight: 600 }}>
              {program.role}
            </span>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {/* Color accent dot + department */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: program.color, boxShadow: `0 0 16px ${program.color}80` }} />
                <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: program.color }}>
                  {program.department}
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 16,
              }}>
                {program.role}
              </h1>

              <p style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 17,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                lineHeight: 1.65,
                maxWidth: 560,
                marginBottom: 28,
              }}>
                {program.tagline}
              </p>

              {/* Meta chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { icon: MapPin, text: program.location },
                  { icon: Clock, text: program.duration },
                  { icon: Briefcase, text: program.mode },
                  { icon: Users, text: `${program.openings} Openings` },
                  { icon: Calendar, text: `Starts ${program.startDate}` },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: 12, fontWeight: 500,
                    color: 'var(--text-secondary)',
                  }}>
                    <Icon size={12} strokeWidth={2} color="var(--accent)" />
                    {text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stipend callout card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'var(--surface)',
                border: `2px solid ${program.color}40`,
                borderRadius: 16,
                padding: '28px 32px',
                minWidth: 240,
                textAlign: 'center',
                boxShadow: `0 16px 48px ${program.color}15`,
              }}
            >
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>
                Starting Fee
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 44, fontWeight: 800, color: program.color, lineHeight: 1, marginBottom: 4 }}>
                ₹1,000
              </div>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 24 }}>
                For 2-Month Program
              </div>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${program.color}40` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '13px 24px',
                  background: program.color,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                Apply Now <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>

          {/* Left Column */}
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: 48 }}
          >
            {/* Overview */}
            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>Overview</SectionHeading>
              <p style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15, fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.85,
              }}>
                {program.overview}
              </p>
            </motion.section>

            {/* Responsibilities */}
            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>What You'll Do</SectionHeading>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {program.responsibilities.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircle2 size={17} color={program.color} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Requirements */}
            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>Who We're Looking For</SectionHeading>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {program.requirements.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: program.color, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Selection Process */}
            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>Selection Process</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                {program.selectionProcess.map((step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
                    {/* Connector line */}
                    {i < program.selectionProcess.length - 1 && (
                      <div style={{ position: 'absolute', left: 19, top: 40, width: 2, height: 32, background: 'var(--border)', zIndex: 0 }} />
                    )}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: i === 0 ? program.color : 'var(--surface)',
                      border: `2px solid ${i === 0 ? program.color : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 1,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13, fontWeight: 700,
                      color: i === 0 ? '#FFF' : 'var(--text-tertiary)',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{
                      padding: '12px 0',
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 14, fontWeight: i === 0 ? 600 : 400,
                      color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>Program Fee Breakdown</SectionHeading>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                Click any tier to view the full payment details for that period.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {program.stipendTiers.map((tier, i) => (
                  <motion.div
                    key={tier.months}
                    onClick={() => setSelectedTier({ ...tier, color: program.color, role: program.role })}
                    whileHover={{ scale: 1.015, boxShadow: `0 4px 20px ${program.color}20` }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px',
                      background: i === program.stipendTiers.length - 1 ? `${program.color}12` : 'var(--surface)',
                      border: `1.5px solid ${i === program.stipendTiers.length - 1 ? program.color + '50' : 'var(--border)'}`,
                      borderRadius: 10,
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {tier.months}
                      </div>
                      <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                        {tier.note}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 800,
                        color: i === program.stipendTiers.length - 1 ? program.color : 'var(--text-primary)',
                      }}>
                        {tier.amount}
                      </div>
                      <div style={{
                        fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
                        padding: '4px 10px', borderRadius: 20,
                        background: `${program.color}15`, color: program.color,
                        border: `1px solid ${program.color}30`,
                        fontFamily: "'Roboto', sans-serif",
                      }}>
                        View Payment
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.6, marginTop: 4, paddingLeft: 4 }}>
                  * This fee covers training, mentorship, and access to corporate resources for the selected duration.
                </div>
              </div>
            </motion.section>

            {/* Payment Methods */}
            <motion.section variants={fadeUp}>
              <SectionHeading color={program.color}>Payment Methods</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    padding: '18px 20px',
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 10,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: `${program.color}12`,
                      border: `1px solid ${program.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                    }}>
                      {method.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                        {method.label}
                      </div>
                      <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {method.desc}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{
                  padding: '14px 16px',
                  background: 'var(--bg-warm)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6,
                }}>
                  📋 <strong>Note:</strong> Payment must be completed upon joining to confirm your slot in the program.
                </div>
              </div>
            </motion.section>

          </motion.div>

          {/* Right Column — Perks & Sidebar */}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 100 }}
          >
            {/* Perks Card */}
            <div style={{
              background: 'var(--surface)',
              border: '2px solid var(--border)',
              borderRadius: 16,
              padding: '28px 24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 20 }}>
                Benefits & Perks
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {program.perks.map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${program.color}15`,
                      border: `1px solid ${program.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color={program.color} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply CTA Card */}
            <div style={{
              background: `linear-gradient(135deg, ${program.color}15, ${program.color}05)`,
              border: `2px solid ${program.color}30`,
              borderRadius: 16,
              padding: '24px',
              textAlign: 'center',
            }}>
              <Zap size={28} color={program.color} style={{ marginBottom: 12 }} />
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                Ready to apply?
              </div>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                Applications close soon. Don't miss this opportunity.
              </div>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  background: program.color,
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 8,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Apply Now →
              </motion.button>
            </div>

            {/* Back link */}
            <Link to="/internship" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 20px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8,
              fontFamily: "'Roboto', sans-serif",
              fontSize: 12, fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              textAlign: 'center',
              letterSpacing: '0.5px',
            }}>
              <ArrowLeft size={13} /> View All Programs
            </Link>
          </motion.div>
        </div>
      </div>

      <ApplicationModal
        program={{ role: program.role, color: program.color }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <PaymentModal
        tier={selectedTier}
        onClose={() => setSelectedTier(null)}
      />
    </motion.div>
  )
}

function PaymentModal({ tier, onClose }) {
  if (!tier) return null
  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20
      }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'relative',
            width: '100%', maxWidth: 480,
            background: 'var(--modal-bg)',
            borderRadius: 24,
            padding: 40,
            boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
            border: '1px solid var(--border)',
            overflow: 'hidden'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20,
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: `${tier.color}15`, border: `2px solid ${tier.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', color: tier.color
            }}>
              <IndianRupee size={32} />
            </div>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Program Fee Payment
            </h3>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              You are selecting the <strong>{tier.months}</strong> duration for the {tier.role} program.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-tertiary)' }}>Duration</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{tier.months}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
              <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: 'var(--text-secondary)' }}>Total Fee</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 800, color: tier.color }}>{tier.amount}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Select Payment Method</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 12, border: '2px solid var(--accent)', background: 'var(--accent-light)', cursor: 'pointer' }}>
              <span style={{ fontSize: 24 }}>📱</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Pay via UPI</div>
                <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>Google Pay, PhonePe, Paytm</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer' }}>
              <span style={{ fontSize: 24 }}>🏦</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Bank Transfer</div>
                <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 12, color: 'var(--text-secondary)' }}>NEFT / IMPS</div>
              </div>
            </div>
          </div>

          <button style={{
            width: '100%', padding: '16px', borderRadius: 12,
            background: tier.color, color: '#fff', border: 'none',
            fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1px', marginTop: 24,
            cursor: 'pointer'
          }}>
            Proceed to Pay {tier.amount}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function SectionHeading({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ width: 4, height: 22, borderRadius: 2, background: color, flexShrink: 0 }} />
      <h2 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 18, fontWeight: 700,
        color: 'var(--text-primary)',
        margin: 0, letterSpacing: '-0.01em',
      }}>{children}</h2>
    </div>
  )
}
