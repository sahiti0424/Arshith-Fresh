import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import {
  Menu, X, ChevronDown,
  Building2, Cpu, HeartPulse, Truck,
  Phone, BookOpen,
  ArrowRight,
  Briefcase,
} from 'lucide-react'
import { useMagnetic } from '../hooks/useMouseTracking'

/* ─── NAV DATA ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Home', path: '/', dropdown: null },
  { label: 'About', path: '/about', dropdown: null },
  { label: 'Businesses', path: '/businesses', dropdown: null },
  {
    label: 'Careers',
    path: null,
    simpleLinks: [
      { label: 'Job Opportunities', desc: 'Explore full-time roles', path: '/careers', color: 'var(--accent)' },
      { label: 'Internships', desc: 'Current internship openings', path: '/internship', color: '#F97316' },
    ],
  },
  {
    label: 'Programs',
    path: null,
    dropdown: {
      cols: [
        {
          heading: 'Construction',
          icon: Building2,
          color: '#F97316',
          items: [
            { label: 'Highway Engineering', desc: 'Expressways & road networks' },
            { label: 'Smart City Development', desc: 'Urban infrastructure projects' },
            { label: 'Commercial Construction', desc: 'Skyscrapers & complexes' },
          ],
        },
        {
          heading: 'Technology',
          icon: Cpu,
          color: 'var(--accent)',
          items: [
            { label: 'Enterprise AI', desc: 'AI-driven analytics platforms' },
            { label: 'Cloud Transformation', desc: 'Hybrid cloud infrastructure' },
            { label: 'IoT & Smart Systems', desc: 'Connected city solutions' },
          ],
        },
        {
          heading: 'Logistics',
          icon: Truck,
          color: '#8B5CF6',
          items: [
            { label: 'Global Freight', desc: 'End-to-end freight forwarding' },
            { label: 'Warehousing', desc: 'Automated storage systems' },
            { label: 'Last-Mile Delivery', desc: 'Electric fleet solutions' },
          ],
        },
      ],
    },
  },
  { label: 'Leadership', path: '/leadership', dropdown: null },
  { label: 'Contact', path: '/contact', dropdown: null },
]

/* ─── DROPDOWN PANEL ─────────────────────────────────────────────────────────── */
function DropdownPanel({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--modal-bg)',
        borderRadius: 14,
        boxShadow: '0 24px 64px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.07)',
        padding: '28px 32px',
        display: 'flex',
        gap: 40,
        zIndex: 2000,
        minWidth: data.cols.length === 3 ? 680 : 460,
      }}
    >
      {/* Arrow tip */}
      <div style={{
        position: 'absolute',
        top: -6, left: '50%',
        transform: 'translateX(-50%)',
        width: 12, height: 12,
        background: 'var(--modal-bg)',
        borderLeft: '1px solid rgba(15,23,42,0.07)',
        borderTop: '1px solid rgba(15,23,42,0.07)',
        rotate: '45deg',
      }} />

      {data.cols.map((col) => {
        const Icon = col.icon
        return (
          <div key={col.heading} style={{ flex: 1, minWidth: 160 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: `${col.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={14} color={col.color} strokeWidth={2} />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: col.color }}>
                {col.heading}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {col.items.map((item) => (
                <DropdownItem key={item.label} item={item} accentColor={col.color} />
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}

function DropdownItem({ item, accentColor }) {
  const [hovered, setHovered] = useState(false)

  const content = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ backgroundColor: hovered ? 'var(--bg-warm)' : 'transparent' }}
      style={{ padding: '10px 12px', borderRadius: 8, cursor: 'pointer', transition: 'background 150ms' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 13, fontWeight: 600,
          color: hovered ? accentColor : 'var(--text-primary)',
          transition: 'color 150ms', letterSpacing: '0.2px',
        }}>
          {item.label}
        </span>
        <motion.div animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.15 }}>
          <ArrowRight size={12} color={hovered ? accentColor : 'var(--text-tertiary)'} strokeWidth={2} />
        </motion.div>
      </div>
      <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, color: 'var(--text-secondary)', marginTop: 2, letterSpacing: '0.2px' }}>
        {item.desc}
      </div>
    </motion.div>
  )

  if (item.path) {
    return <Link to={item.path} style={{ textDecoration: 'none' }}>{content}</Link>
  }
  return content
}

/* ─── SIMPLE DROPDOWN (Careers) ─────────────────────────────────────────────── */
function SimpleDropdown({ links }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 12px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--modal-bg)',
        borderRadius: 10,
        boxShadow: '0 16px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.06)',
        padding: '8px',
        zIndex: 2000,
        minWidth: 210,
      }}
    >
      {/* Arrow tip */}
      <div style={{
        position: 'absolute',
        top: -5, left: '50%',
        transform: 'translateX(-50%)',
        width: 10, height: 10,
        background: 'var(--modal-bg)',
        borderLeft: '1px solid rgba(15,23,42,0.06)',
        borderTop: '1px solid rgba(15,23,42,0.06)',
        rotate: '45deg',
      }} />
      {links.map((link) => (
        <Link key={link.path} to={link.path} style={{ textDecoration: 'none', display: 'block' }}>
          <motion.div
            whileHover={{ backgroundColor: 'var(--bg-warm)' }}
            style={{
              padding: '10px 14px',
              borderRadius: 7,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.2px' }}>
                {link.label}
              </div>
              <div style={{ fontFamily: "'Roboto', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                {link.desc}
              </div>
            </div>
            <ArrowRight size={12} color={link.color} strokeWidth={2.5} />
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}

/* ─── DESKTOP NAV ITEM ───────────────────────────────────────────────────────── */
function NavItem({ item }) {
  const location = useLocation()
  const isActive = item.path && location.pathname === item.path
  const [open, setOpen] = useState(false)
  const hasDropdown = !!item.dropdown
  const hasSimple = !!item.simpleLinks
  const hasAny = hasDropdown || hasSimple

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', padding: '4px 0' }}>
        {item.path ? (
          <Link
            to={item.path}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11, fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none',
              color: isActive ? 'var(--accent)' : open ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'color 180ms',
            }}
          >
            {item.label}
          </Link>
        ) : (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: open ? 'var(--text-primary)' : 'var(--text-secondary)',
            transition: 'color 180ms',
          }}>
            {item.label}
          </span>
        )}
        {(hasDropdown || hasSimple) && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={12} color={open ? 'var(--text-primary)' : 'var(--text-tertiary)'} strokeWidth={2.5} />
          </motion.div>
        )}
      </div>

      <motion.div
        style={{
          position: 'absolute', bottom: -2, left: 0,
          height: 1.5, background: 'var(--accent)', borderRadius: 2, width: '100%',
          transformOrigin: open || isActive ? 'left' : 'right',
        }}
        animate={{ scaleX: open || isActive ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence>
        {open && hasDropdown && <DropdownPanel data={item.dropdown} />}
        {open && hasSimple && <SimpleDropdown links={item.simpleLinks} />}
      </AnimatePresence>
    </div>
  )
}

/* ─── MAGNETIC CTA ───────────────────────────────────────────────────────────── */
function MagneticButton({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const { x, y } = useMagnetic(ref, strength)
  return (
    <motion.div ref={ref} style={{ x, y, display: 'inline-flex' }}>
      {children}
    </motion.div>
  )
}

/* ─── MAIN NAVBAR ────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { scrollY } = useScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const progressOp = useTransform(scrollY, [100, 200], [0, 1])

  return (
    <>
      <motion.div id="scroll-progress" style={{ scaleX, opacity: progressOp }} />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: 72,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 2px 20px rgba(15,23,42,0.04)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 40,
          paddingRight: 40,
          gap: 0,
        }}
      >
        {/* ── Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flex: '0 0 auto', marginRight: 36 }}>
          <motion.svg
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            width="28" height="28" viewBox="0 0 28 28" fill="none"
            style={{ cursor: 'pointer' }}
          >
            <polygon points="14,2 25,8.5 25,19.5 14,26 3,19.5 3,8.5"
              stroke="var(--accent)" strokeWidth="1.5" fill="rgba(37,99,235,0.1)" />
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11"
              fill="var(--accent)" opacity="0.7" />
          </motion.svg>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '4px', color: 'var(--text-primary)' }}>
            ARSHITH <span style={{ color: 'var(--accent)' }}>GROUP</span>
          </span>
        </Link>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: 'var(--border)', flexShrink: 0, marginRight: 36 }} className="hidden lg:block" />

        {/* ── Desktop Nav Items ── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop-items hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="nav-cta-desktop hidden lg:block" style={{ flex: '0 0 auto' }}>
          <MagneticButton>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ backgroundColor: 'var(--accent-dark)', y: -1, boxShadow: '0 8px 24px rgba(37,99,235,0.32)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'var(--text-inverse)',
                  background: 'var(--accent)',
                  border: 'none',
                  padding: '11px 24px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'background 200ms',
                  whiteSpace: 'nowrap',
                }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </MagneticButton>
        </div>

        {/* ── Mobile Hamburger ── */}
        <motion.button
          className="nav-mobile-button lg:hidden ml-auto"
          onClick={() => setMenuOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'none' }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={22} strokeWidth={1.5} />
        </motion.button>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 1998, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: 420,
                zIndex: 1999,
                background: 'var(--bg)',
                display: 'flex', flexDirection: 'column',
                padding: '28px 40px 40px',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  Menu
                </span>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'var(--bg-warm)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} strokeWidth={2} color="var(--text-primary)" />
                </motion.button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: 'block',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 22, fontWeight: 700,
                          color: location.pathname === item.path ? 'var(--accent)' : 'var(--text-primary)',
                          textDecoration: 'none',
                          padding: '10px 0',
                          borderBottom: '1px solid var(--border)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                          {item.label}
                        </div>
                        {item.simpleLinks && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 12, marginBottom: 8 }}>
                            {item.simpleLinks.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                  fontFamily: "'Roboto', sans-serif",
                                  fontSize: 14,
                                  color: 'var(--text-secondary)',
                                  padding: '6px 0',
                                  textDecoration: 'none',
                                }}
                              >
                                — {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                        {item.dropdown && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 12 }}>
                            {item.dropdown.cols.flatMap((col) =>
                              col.items.map((sub) => (
                                <div key={sub.label} style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, color: 'var(--text-secondary)', padding: '3px 0' }}>
                                  — {sub.label}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/contact" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--text-inverse)',
                    background: 'var(--accent)',
                    border: 'none',
                    padding: '16px', borderRadius: 8,
                    cursor: 'pointer',
                    marginTop: 'auto',
                  }}
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
