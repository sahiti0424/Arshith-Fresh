import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useMousePosition } from '../../hooks/useMouseTracking'
import {
  fadeLeft, fadeUp, fadeRight, blurIn,
  drawLineH, drawLineV, staggerSlow, wordReveal,
} from '../../lib/animations'

export default function Chairman() {
  const sectionRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true, rootMargin: '0px 0px -60px 0px' })
  // Section-level parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  // Mouse parallax on the image
  const { rawX, rawY } = useMousePosition(sectionRef)
  const imgX = useSpring(useTransform(rawX, (v) => v * 0.008), { stiffness: 100, damping: 25 })
  const imgMY = useSpring(useTransform(rawY, (v) => v * 0.006), { stiffness: 100, damping: 25 })

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: '60px 24px', overflow: 'hidden' }}
    >
      <motion.div
        ref={ref}
        variants={staggerSlow}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="chairman-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 400px) 1fr',
          gap: 80,
          maxWidth: 1300,
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        {/* ── Left col — image ── */}
        <motion.div variants={fadeLeft} style={{ position: 'relative' }}>
          {/* Gold vertical border */}
          <motion.div
            variants={drawLineV}
            style={{
              position: 'absolute',
              left: -20,
              top: 0,
              width: 3,
              height: '100%',
              background: 'var(--accent)',
              transformOrigin: 'top',
              borderRadius: 2,
            }}
            transition={{ delay: 0.4 }}
          />

          {/* Image frame */}
          <motion.div
            className="chairman-image-frame"
            style={{
              width: '100%',
              maxWidth: 400,
              aspectRatio: '4 / 5',
              background: 'linear-gradient(160deg, #F1F5F9 0%, var(--text-primary) 100%)',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              x: imgX,
              y: imgMY,
            }}
          >
            {/* Noise texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Placeholder portrait gradient */}
            <motion.div
              initial={{ scale: 1.06 }}
              animate={inView ? { scale: 1 } : { scale: 1.06 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #F1F5F9 0%, var(--text-secondary) 40%, #E2E8F0 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 40,
              }}
            >
              {/* Stylized silhouette placeholder */}
              <svg width="160" height="260" viewBox="0 0 160 260" fill="none" opacity="0.3">
                <ellipse cx="80" cy="65" rx="36" ry="40" fill="var(--accent)" opacity="0.4" />
                <path d="M20 260 C20 180 60 160 80 155 C100 160 140 180 140 260Z" fill="var(--accent)" opacity="0.3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Right col — content ── */}
        <div>
          {/* Section label */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: 'var(--accent)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}>
              Chairman's Message
            </span>
            <motion.div variants={drawLineH} style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          </motion.div>

          {/* H2 — word reveal */}
          <motion.h2
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.08,
              marginBottom: 32,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 10px',
            }}
          >
            {['A', 'Vision', 'That', 'Transcends', 'Generations'].map((word) => (
              <span key={word} className="word-wrap">
                <motion.span variants={wordReveal} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          {/* Body paras */}
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: 20,
            maxWidth: 560,
          }}>
            When we laid the first stone of Arshith Group thirty years ago, we were not building a company — we were beginning a conversation with the future. Infrastructure is the language of civilizations, and every road, every turbine, every home we create is a sentence in that story.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: 20,
            maxWidth: 560,
          }}>
            Today, as we stand at the inflection point of India's global emergence, our responsibility has never been greater — nor our resolve stronger.
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: 32,
            maxWidth: 560,
          }}>
            Arshith Group stands not merely as a business enterprise, but as a custodian of India's progress — responsible to our employees, our communities, and the generations yet to come. Every project we undertake carries the weight of that promise.
          </motion.p>

          {/* Gold divider */}
          <motion.div
            variants={drawLineH}
            style={{ width: 40, height: 1, background: 'var(--accent)', marginBottom: 32 }}
            transition={{ delay: 0.55 }}
          />

          {/* Blockquote */}
          <motion.blockquote
            variants={fadeRight}
            style={{
              display: 'flex',
              gap: 20,
              marginBottom: 32,
            }}
          >
            {/* Left gold border */}
            <motion.div
              variants={drawLineV}
              style={{
                width: 3,
                background: 'var(--accent)',
                transformOrigin: 'top',
                borderRadius: 2,
                flexShrink: 0,
                alignSelf: 'stretch',
              }}
              transition={{ delay: 0.8 }}
            />
            <motion.p
              variants={blurIn}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 22,
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              "We do not build for today. We build for the India that will be — the one our grandchildren will inherit and call home."
            </motion.p>
          </motion.blockquote>

          {/* Cite */}
          <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: 'var(--accent)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Arvind Mehta — Founder & Chairman, Arshith Group
            </div>
          </motion.div>

          {/* Read more link */}
          <motion.div variants={fadeUp}>
            <motion.button


              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Roboto', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                padding: 0,
                position: 'relative',
              }}
              whileHover="hovered"
            >
              Read Full Message
              <motion.span
                variants={{ hovered: { x: 6, transition: { type: 'spring', stiffness: 300, damping: 22 } } }}
                style={{ display: 'inline-flex' }}
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </motion.span>
              {/* Animated underline */}
              <motion.span
                variants={{
                  hovered: { scaleX: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
                }}
                initial={{ scaleX: 0 }}
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 24,
                  height: 1,
                  background: 'var(--accent)',
                  transformOrigin: 'left',
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
