import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

/**
 * Ticker — continuous right-to-left drift, pausing on hover.
 *
 * Used twice: the discipline strip on Home, and the "More projects by us" rail
 * at the bottom of each project page (which the SOW asked for by name).
 *
 * Framer build: this is the native Ticker component in Framer's insert menu.
 * Set direction Left, speed ~28, and "Pause on hover" on. No code required —
 * one of the few places Framer gives you exactly the thing for free.
 */
export default function Ticker({ children, speed = 40, className = '', gap = 40 }) {
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const halfRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const wrapRef = useRef(null)

  // A marquee that keeps animating off-screen is pure wasted frames.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: '120px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Measure once per layout change. Reading scrollWidth every frame forces a
  // synchronous layout on every tick, which is the classic cause of a marquee
  // that stutters on scroll.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) halfRef.current = trackRef.current.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [children])

  useAnimationFrame((_, delta) => {
    const half = halfRef.current
    if (paused || !onScreen || !half) return
    let next = x.get() - (speed * delta) / 1000
    if (next <= -half) next += half
    x.set(next)
  })

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ x, gap }}
      >
        {children}
        <div className="flex shrink-0" style={{ gap }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * A wide, quiet line of disciplines drifting past.
 *
 * Previously this was small tracked capitals separated by dots, which read as
 * interface chrome rather than design. Set large and low-contrast it becomes
 * an atmospheric band instead — the same words doing the opposite job.
 */
export function TextTicker({ items, speed = 22 }) {
  return (
    <Ticker speed={speed} gap={0} className="py-4 md:py-5">
      <div className="flex shrink-0 items-center">
        {items.map((t, i) => (
          <span
            key={i}
            className="display shrink-0 whitespace-nowrap px-5 text-[clamp(1.1rem,2.1vw,1.9rem)] text-ink/[0.13] md:px-7"
            style={{ fontStretch: '104%' }}
          >
            {t}
          </span>
        ))}
      </div>
    </Ticker>
  )
}
