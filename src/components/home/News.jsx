import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import {
  staggerGrid, fadeUp, fadeRight, wordReveal, staggerSlow, drawLineH,
} from '../../lib/animations'

const NEWS = [
  {
    id: 1,
    tag: 'Infrastructure',
    tagColor: '#F59E0B',
    date: 'May 2, 2026',
    title: 'Arshith Build Wins ₹12,400 Cr Eastern Expressway Contract',
    summary:
      'The Ministry of Road Transport has awarded Arshith Build the landmark Eastern Expressway project spanning 340km across three states.',
    accentColor: '#F59E0B',
  },
  {
    id: 2,
    tag: 'Green Energy',
    tagColor: 'var(--gold)',
    date: 'April 18, 2026',
    title: "Arshith Green Commissions India's Largest Offshore Wind Farm",
    summary:
      '1.2 GW of clean energy now powers over 1.4 million homes as Arshith Green completes phase one of the Kutch offshore wind initiative.',
    accentColor: 'var(--gold)',
  },
  {
    id: 3,
    tag: 'Corporate',
    tagColor: 'var(--accent)',
    date: 'March 31, 2026',
    title: 'Arshith Group Reports Record ₹2.4 Lakh Crore Annual Revenue',
    summary:
      'FY2025–26 closes with historic revenue, driven by strong performance across all four verticals and international expansion into Southeast Asia.',
    accentColor: 'var(--accent)',
  },
]

function NewsCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
    return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered
        ? { y: -8, boxShadow: '0 32px 64px rgba(212,175,55,0.15)' }
        : { y: 0,  boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
      whileTap={{ scale: 0.98, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        background: 'var(--surface)',
        border: '2px solid var(--border)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        borderRadius: 8,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bottom accent border */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: item.accentColor,
          transformOrigin: 'left',
        }}
      />

      {/* Tag + Date row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: "'Roboto', monospace",
          fontSize: 10,
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          color: item.tagColor,
          background: `${item.tagColor}18`,
          padding: '4px 10px',
          borderRadius: 3,
        }}>
          {item.tag}
        </span>
        <span style={{
          fontFamily: "'Roboto', monospace",
          fontSize: 10,
          color: 'var(--text-tertiary)',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          <Calendar size={11} strokeWidth={1.5} />
          {item.date}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: 22,
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.25,
        margin: 0,
      }}>
        {item.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: 13,
        fontWeight: 300,
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        margin: 0,
        flex: 1,
      }}>
        {item.summary}
      </p>

      {/* Read more */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 11,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: item.accentColor,
        }}>
          Read More
        </span>
        <ArrowRight size={12} strokeWidth={1.5} color={item.accentColor} />
      </motion.div>
    </motion.article>
  )
}

export default function News() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '0px 0px -60px 0px' })
    const [viewAllHovered, setViewAllHovered] = useState(false)

  return (
    <section style={{ background: 'var(--bg)', padding: '60px 60px 120px' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* Header row */}
        <motion.div
          ref={ref}
          variants={staggerSlow}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          {/* H2 word reveal */}
          <motion.h2
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.05,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 12px',
            }}
          >
            {['Latest', 'from', 'the', 'Group'].map((word) => (
              <span key={word} className="word-wrap">
                <motion.span variants={wordReveal} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* View All */}
          <motion.button
            variants={fadeRight}
            onMouseEnter={() => setViewAllHovered(true)}
            onMouseLeave={() => setViewAllHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1px solid var(--text-secondary)',
              borderRadius: 4,
              padding: '10px 20px',
              cursor: 'pointer',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              transition: 'border-color 200ms, color 200ms',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            animate={viewAllHovered ? { borderColor: 'var(--text-primary)', color: 'var(--text-primary)' } : {}}
          >
            View All
            <motion.span
              animate={viewAllHovered ? { x: 4 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ display: 'inline-flex' }}
            >
              <ArrowRight size={13} strokeWidth={1.5} />
            </motion.span>
          </motion.button>
        </motion.div>

        {/* News cards */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {NEWS.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
