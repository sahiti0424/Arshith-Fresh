import { motion } from 'framer-motion'
import { pageVariants, fadeUp } from '../lib/animations'

export default function Contact() {
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
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: 'var(--gold)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              Connect With Us
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
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
            Get in <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Touch</span>
          </motion.h1>

          <motion.div variants={fadeUp} style={{ width: 60, height: 2, background: 'var(--gold)', margin: '0 auto 60px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 60 }}>
          <motion.div
            variants={fadeUp}
            style={{
              background: 'var(--surface)',
              padding: 56,
              borderRadius: 20,
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>Corporate Headquarters</h2>
            <address style={{ fontFamily: "'Roboto', sans-serif", fontStyle: 'normal', color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
              Arshith Tower, Plot C-32, G Block<br />
              Bandra Kurla Complex<br />
              Bandra (East), Mumbai - 400051<br />
              Maharashtra, India
            </address>
            <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', width: 60 }}>Email</span>
                <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-primary)' }}>contact@arshithgroup.in</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', width: 60 }}>Phone</span>
                <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 16, color: 'var(--text-primary)' }}>+91 22 1234 5678</span>
              </div>
            </div>
          </motion.div>

          <motion.form variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: 4 }}>Full Name</label>
              <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '18px 24px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'var(--surface)', fontFamily: "'Roboto', sans-serif", fontSize: 16, outline: 'none', transition: 'border-color 0.2s' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: 4 }}>Email Address</label>
              <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '18px 24px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'var(--surface)', fontFamily: "'Roboto', sans-serif", fontSize: 16, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', paddingLeft: 4 }}>Message</label>
              <textarea placeholder="How can we help you?" rows="5" style={{ width: '100%', padding: '18px 24px', borderRadius: 12, border: '1px solid var(--border-light)', background: 'var(--surface)', fontFamily: "'Roboto', sans-serif", fontSize: 16, outline: 'none', resize: 'vertical' }}></textarea>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, backgroundColor: '#c26b05' }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: 'var(--gold)', color: '#080808', border: 'none', padding: '20px 40px', borderRadius: 12, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', marginTop: 12, transition: 'background 0.2s'
              }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.main>
  )
}
