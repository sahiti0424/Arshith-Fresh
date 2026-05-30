import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Mail, GraduationCap as DegreeIcon, Calendar, DollarSign, Phone, MessageSquare, Briefcase, CheckCircle2, Clock } from 'lucide-react'

export default function ApplicationModal({ program, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    degree: '',
    domain: '',
    otherDomain: '',
    months: '3',
    type: 'paid',
    mobile: '',
    queries: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ 
        ...prev, 
        domain: '',
        otherDomain: '',
        name: '',
        email: '',
        mobile: '',
        degree: '',
        queries: ''
      }))
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://localhost:5001/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          onClose()
        }, 2000)
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              width: '100%',
              maxWidth: 600,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#1A1D23',
              borderRadius: 24,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-tertiary)',
                zIndex: 10
              }}
            >
              <X size={20} />
            </motion.button>

            {isSuccess ? (
              <div style={{ padding: 60, textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                  }}
                >
                  <CheckCircle2 size={48} color="#10B981" />
                </motion.div>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>Application Sent!</h2>
                <p style={{ color: 'var(--text-tertiary)', fontSize: 16 }}>Our HR team will review your application and get back to you soon.</p>
              </div>
            ) : (
              <div style={{ padding: 40 }}>
                <div style={{ marginBottom: 32 }}>
                  <span style={{ color: program?.color || 'var(--gold)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>Apply for Internship</span>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', marginTop: 8 }}>{program?.title || program?.role || 'General Application'}</h2>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: 14, marginTop: 4 }}>{program?.department || 'Arshith Group'}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        required
                        type="tel"
                        name="mobile"
                        placeholder="Mobile No."
                        value={formData.mobile}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ position: 'relative' }}>
                      <DegreeIcon size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <input
                        required
                        type="text"
                        name="degree"
                        placeholder="Degree / Qualification"
                        value={formData.degree}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ gridColumn: formData.domain === 'Other' ? 'span 1' : 'span 2' }}>
                    <div style={{ position: 'relative' }}>
                      <Briefcase size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <select
                        required
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none',
                          appearance: 'none'
                        }}
                      >
                        <option value="" disabled style={{ background: '#1A1D23' }}>Select Domain</option>
                        <option value="Construction Engineering" style={{ background: '#1A1D23' }}>Construction Engineering</option>
                        <option value="Software Development" style={{ background: '#1A1D23' }}>Software Development</option>
                        <option value="Healthcare Operations" style={{ background: '#1A1D23' }}>Healthcare Operations</option>
                        <option value="Supply Chain & Logistics" style={{ background: '#1A1D23' }}>Supply Chain & Logistics</option>
                        <option value="Marketing" style={{ background: '#1A1D23' }}>Marketing</option>
                        <option value="Design" style={{ background: '#1A1D23' }}>Design</option>
                        <option value="Other" style={{ background: '#1A1D23' }}>Other</option>
                      </select>
                    </div>
                  </div>

                  {formData.domain === 'Other' && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ gridColumn: 'span 1' }}
                    >
                      <input
                        required
                        type="text"
                        name="otherDomain"
                        placeholder="Please specify domain"
                        value={formData.otherDomain}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none'
                        }}
                      />
                    </motion.div>
                  )}

                  <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ position: 'relative' }}>
                      <Calendar size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <select
                        name="months"
                        value={formData.months}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none',
                          appearance: 'none'
                        }}
                      >
                        <option value="1">1 Month</option>
                        <option value="2">2 Months</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ position: 'relative' }}>
                      <DollarSign size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none',
                          appearance: 'none'
                        }}
                      >
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <div style={{ position: 'relative' }}>
                      <MessageSquare size={18} style={{ position: 'absolute', left: 16, top: 20, color: 'rgba(255,255,255,0.3)' }} />
                      <textarea
                        name="queries"
                        placeholder="Any queries?"
                        value={formData.queries}
                        onChange={handleChange}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '16px 16px 16px 48px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: 12,
                          color: '#FFFFFF',
                          fontSize: 15,
                          outline: 'none',
                          resize: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 2', marginTop: 12 }}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, backgroundColor: program?.color || 'var(--gold)' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '18px',
                        background: (program?.color || 'var(--gold)') + 'cc',
                        color: '#000',
                        border: 'none',
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        transition: 'all 0.3s'
                      }}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Clock size={20} />
                        </motion.div>
                      ) : (
                        <>
                          Submit Application
                          <Send size={18} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
