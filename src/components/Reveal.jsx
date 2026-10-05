import { motion } from 'motion/react'
import { DUR, EASE_OUT_EXPO, STAGGER, VIEWPORT } from '../lib/motion'

/**
 * Entrance primitives.
 *
 * All of them work the same way: ONE viewport observer on the parent, then
 * children staggered off it. Giving every word its own observer is fragile —
 * small inline elements inside clipped parents can fail to trigger at all —
 * and it also breaks the thing that makes motion feel composed: everything
 * entering together shares one clock.
 */

/** A line of type unmasking upward from behind a clip. */
export function Rise({ children, delay = 0, className = '' }) {
  return (
    <motion.span
      className="block overflow-hidden"
      style={{ paddingBottom: '0.28em', marginBottom: '-0.28em' }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span
        className={`block ${className}`}
        variants={{
          hidden: { y: '110%' },
          show: { y: '0%', transition: { duration: DUR.base, ease: EASE_OUT_EXPO, delay } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

/**
 * The same reveal, word by word, off a single parent observer.
 * Reserved for section openers — past about a dozen words it stops reading as
 * considered and starts reading as slow.
 */
export function WordsRise({ text, delay = 0, className = '', each = STAGGER }) {
  const parts = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: each, delayChildren: delay } },
      }}
    >
      {parts.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.28em', marginBottom: '-0.28em' }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: DUR.base, ease: EASE_OUT_EXPO } },
            }}
          >
            {w}
            {i < parts.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** For anything that can't be clipped. Same curve, same duration. */
export function FadeUp({ children, delay = 0, className = '', y = 18 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.base, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}

/** A section's hairline rule, drawn left to right as it enters. */
export function DrawLine({ delay = 0, className = '' }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-[var(--line)] ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    />
  )
}
