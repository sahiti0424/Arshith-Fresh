import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Linkedin, Twitter, Youtube, Instagram, 
  Phone, Mail, MapPin, ArrowRight, 
  Send, Globe, Shield, Zap, ChevronRight,
  Sparkles, Command, Info, Anchor
} from 'lucide-react'
import { useMagnetic, useCardTilt } from '../hooks/useMouseTracking'

const ECOSYSTEM_LINKS = [
  { label: 'Company Story', path: '/about' },
  { label: 'Sectors & Businesses', path: '/businesses' },
  { label: 'Leadership Team', path: '/leadership' },
  { label: 'Investors Hub', path: '/investors' },
  { label: 'Engineering Internships', path: '/internships#engineering' },
  { label: 'Tech & Innovation', path: '/internships#tech' },
]

const SOCIALS = [
  { icon: Linkedin,  label: 'LinkedIn',   href: '#' },
  { icon: Twitter,   label: 'X/Twitter',  href: '#' },
  { icon: Youtube,   label: 'YouTube',    href: '#' },
  { icon: Instagram, label: 'Instagram',  href: '#' },
]

function MagneticSocialIcon({ icon: Icon, label, href }) {
  const ref = useRef(null)
  const { x, y } = useMagnetic(ref, 0.4)
  return (
    <motion.div ref={ref} style={{ x, y }}>
      <motion.a
        href={href}
        whileHover={{ scale: 1.2, color: '#FF6B00', backgroundColor: 'rgba(255,107,0,0.1)' }}
        className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-primary)] transition-all duration-300 hover:border-orange-500"
      >
        <Icon size={18} />
      </motion.a>
    </motion.div>
  )
}

function FooterLink({ label, path }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={path}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-3 text-[14px] font-medium text-[var(--text-secondary)] hover:text-orange-500 transition-all duration-300 no-underline py-2"
    >
      <motion.div
        animate={{ width: hovered ? 12 : 0, opacity: hovered ? 1 : 0 }}
        className="h-[2px] bg-orange-500"
      />
      {label}
    </Link>
  )
}

export default function Footer() {
  const footerRef = useRef(null)
  const ctaRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const { rotateX, rotateY, shineX, shineY } = useCardTilt(ctaRef, 12)
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] })

  const ctaY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  useEffect(() => {
    const handleMove = (e) => {
      if (!footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-transparent mt-48">
      
      {/* ── Asymmetric CTA "The Floating Lens" ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] px-6 z-40">
        <motion.div
          ref={ctaRef}
          style={{ y: ctaY, opacity: ctaOpacity, rotateX, rotateY }}
          className="relative preserve-3d"
        >
          <div 
            className="relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
            style={{ 
              borderRadius: '24px 80px 24px 80px',
              backdropFilter: 'blur(40px)'
            }}
          >
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{ background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,107,0,0.4), transparent 50%)` }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(255,107,0,0.6)]">
                  <Sparkles size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-[var(--text-primary)] leading-tight tracking-tighter">
                    Ready to build <br /> <span className="text-orange-500">the next era?</span>
                  </h3>
                </div>
              </div>
              
              <Link to="/contact" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-[var(--accent)] text-white font-black text-lg rounded-full flex items-center gap-3 shadow-xl transition-all"
                >
                  Join Us <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Main Footer Body with Smooth Wave Top ── */}
      <div className="relative overflow-hidden">
        {/* SVG Wave Shape */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none">
          <svg className="relative block w-full h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--bg-warm)"></path>
          </svg>
        </div>

        <div 
          className="relative pt-48 pb-24 px-6 lg:px-20"
          style={{ 
            background: 'linear-gradient(180deg, var(--bg-warm) 0%, var(--surface2) 100%)'
          }}
        >
          {/* Animated Glow Border Rim */}
          <div 
            className="absolute top-10 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60"
            style={{ filter: 'blur(8px)' }}
          />

          {/* Mouse Tracking Light */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-1000"
            style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,107,0,0.15), transparent 80%)` }}
          />

          <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Brand & Identity */}
            <div className="md:col-span-5 flex flex-col gap-10">
              <Link to="/" className="flex items-center gap-5 no-underline group">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-14 h-14 bg-[var(--surface)] rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-md"
                >
                  <Anchor size={32} className="text-[var(--text-primary)]" strokeWidth={3} />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-[var(--text-primary)] leading-none tracking-tighter uppercase">
                    ARSHITH <span className="text-orange-500">GROUP</span>
                  </span>
                  <span className="text-[var(--text-tertiary)] font-bold text-[11px] tracking-[6px] mt-2 uppercase italic">Group of Companies Since 1994</span>
                </div>
              </Link>
              
              <p className="text-[var(--text-secondary)] text-xl font-light leading-relaxed max-w-sm tracking-tight opacity-90">
                Pioneering sustainable nation-building solutions. Arshith Group is where innovation meets foundational growth across diverse sectors.
              </p>
              
              <div className="flex flex-col gap-8 mt-4">
                <h4 className="text-[12px] font-black text-orange-500 uppercase tracking-[5px]">Connect Globally</h4>
                <div className="flex gap-4">
                  {SOCIALS.map(s => <MagneticSocialIcon key={s.label} {...s} />)}
                </div>
              </div>
            </div>

            {/* Ecosystem Links */}
            <div className="md:col-span-3">
              <h4 className="text-[13px] font-black text-orange-500 uppercase tracking-[4px] mb-10 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.6)]" />
                Ecosystem
              </h4>
              <div className="flex flex-col gap-2">
                {ECOSYSTEM_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
              </div>
            </div>

            {/* Intelligence & Newsletter */}
            <div className="md:col-span-4 flex flex-col gap-12">
              <div>
                <h4 className="text-[13px] font-black text-orange-500 uppercase tracking-[4px] mb-8 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.6)]" />
                  Intelligence
                </h4>
                <p className="text-[var(--text-secondary)] text-[15px] font-light mb-8 leading-relaxed opacity-80">
                  Join our elite network for strategic insights and global development updates.
                </p>
                <form className="relative group" onSubmit={e => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Corporate Email Address"
                    className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-6 py-5 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-orange-500 transition-all focus:shadow-[0_0_20px_rgba(255,107,0,0.1)]"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-3 p-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all shadow-xl"
                  >
                    <Send size={22} strokeWidth={3} />
                  </motion.button>
                </form>
              </div>
              
              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-[var(--border)]">
                <div>
                  <p className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-[3px] mb-3">Priority Support</p>
                  <p className="text-lg text-[var(--text-primary)] font-black tracking-tight">+91 11 4321 0000</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-[var(--text-tertiary)] uppercase tracking-[3px] mb-3">Global Inquiries</p>
                  <p className="text-lg text-[var(--text-primary)] font-black tracking-tight">connect@arshith.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Impact Bottom Bar ── */}
      <div className="relative py-16 px-6 lg:px-20 border-t border-[var(--border)] bg-[var(--surface3)] backdrop-blur-3xl">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p className="text-[var(--text-primary)] text-lg font-bold tracking-tight">
              © {new Date().getFullYear()} <span className="text-orange-500 font-black">Arshith Group Holdings Ltd.</span>
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-[12px] text-[var(--text-secondary)] font-black tracking-[4px] uppercase">
              <Shield size={16} className="text-orange-500" /> 
              <span>End-to-End Encrypted Operations</span>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-8">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6">
              {['Privacy', 'Terms', 'Security', 'Compliance'].map(label => (
                <Link key={label} to={`/${label.toLowerCase()}`} className="text-[13px] text-[var(--text-secondary)] hover:text-orange-500 no-underline font-black uppercase tracking-widest transition-all">
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-5 bg-[var(--surface)] px-8 py-4 rounded-full border border-[var(--border)] shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
              <span className="text-[12px] text-[var(--text-primary)] font-black tracking-[4px] uppercase">v5.4.0 Secure Network</span>
              <div className="h-4 w-[1.5px] bg-[var(--border)]" />
              <Info size={18} className="text-[var(--text-tertiary)] cursor-help hover:text-[var(--text-primary)] transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
