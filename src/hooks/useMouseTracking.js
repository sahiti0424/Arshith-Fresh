import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// ─── useMagnetic ──────────────────────────────────────────────────────────────
// Applies magnetic attraction to an element when hovered.
export function useMagnetic(ref, strength = 0.3) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 14 })
  const springY = useSpring(y, { stiffness: 200, damping: 14 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    }
    const handleLeave = () => {
      x.set(0, { stiffness: 300, damping: 20 })
      y.set(0, { stiffness: 300, damping: 20 })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, strength, x, y])

  return { x: springX, y: springY }
}

// ─── useCardTilt ──────────────────────────────────────────────────────────────
// 3D tilt effect for card elements.
export function useCardTilt(ref, intensity = 10) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const shineX  = useMotionValue(50)
  const shineY  = useMotionValue(50)

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const normalX = (e.clientX - rect.left) / rect.width
      const normalY = (e.clientY - rect.top)  / rect.height
      rotateY.set((normalX - 0.5) *  intensity)
      rotateX.set((normalY - 0.5) * -intensity)
      shineX.set(normalX * 100)
      shineY.set(normalY * 100)
    }
    const handleLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
      shineX.set(50)
      shineY.set(50)
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, intensity, rotateX, rotateY, shineX, shineY])

  return { rotateX: springRotateX, rotateY: springRotateY, shineX, shineY }
}

// ─── useMousePosition ─────────────────────────────────────────────────────────
// Tracks mouse relative to center of a container ref.
export function useMousePosition(containerRef) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e) => {
      const rect = containerRef?.current?.getBoundingClientRect?.()
      if (rect) {
        rawX.set(e.clientX - rect.left - rect.width  / 2)
        rawY.set(e.clientY - rect.top  - rect.height / 2)
      } else {
        rawX.set(e.clientX - window.innerWidth  / 2)
        rawY.set(e.clientY - window.innerHeight / 2)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [containerRef, rawX, rawY])

  return { rawX, rawY }
}
