// Master Animation Library — all Framer Motion variants

// ─── PAGE TRANSITIONS ────────────────────────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, y: -16, filter: 'blur(4px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, y: 48 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
export const fadeDown = {
  hidden: { opacity: 0, y: -32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, y: -32 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}
export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, scale: 0.88 },
  animate: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
  visible: {
    opacity: 1, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
  animate: {
    opacity: 1, filter: 'blur(0px)', scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

// ─── STAGGER CONTAINERS ──────────────────────────────────────────────────────
export const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}
export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}
export const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.20 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.10, delayChildren: 0.20 } }
}
export const staggerNavLinks = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.20 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.20 } }
}

// ─── WORD REVEAL ─────────────────────────────────────────────────────────────
export const wordReveal = {
  hidden: { opacity: 0, y: '110%', rotate: 2 },
  visible: {
    opacity: 1, y: '0%', rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, y: '110%', rotate: 2 },
  animate: {
    opacity: 1, y: '0%', rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}
export const wordRevealSoft = {
  hidden: { opacity: 0, y: '60%' },
  visible: {
    opacity: 1, y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { opacity: 0, y: '60%' },
  animate: {
    opacity: 1, y: '0%',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

// ─── LINE DRAWING ─────────────────────────────────────────────────────────────
export const drawLineH = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
  },
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
  }
}
export const drawLineV = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  },
  initial: { scaleY: 0, originY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
}

// ─── HOVER STATES ─────────────────────────────────────────────────────────────
export const liftCard = {
  whileHover: {
    y: -8,
    boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
    transition: { type: 'spring', stiffness: 400, damping: 22 }
  },
  whileTap: { scale: 0.98, y: -2 }
}
export const glowBorder = {
  whileHover: {
    boxShadow: '0 0 0 1px var(--accent), 0 8px 32px var(--accent-muted)',
    transition: { duration: 0.25 }
  }
}
export const scaleCard = {
  whileHover: {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 350, damping: 20 }
  },
  whileTap: { scale: 0.98 }
}
