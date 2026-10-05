import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import Frame from '../components/Frame'
import { EASE_OUT_EXPO } from '../lib/motion'

/**
 * Hero — the showreel, full bleed.
 *
 * The film sits edge to edge, behind everything, exactly as a production
 * house's opening should. No margin, no card, no frame. The paper theme starts
 * the moment the film ends, so the first scroll is a cut from cinema to page.
 *
 * Two transforms only: the footage drifts up slowly and the copy lifts away as
 * you leave it. Both GPU-only, both scroll-linked.
 *
 * Framer build: full-width video fill + a Scroll Transform (Y) on it.
 */
export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70])

  const D = ready ? 0 : 99 // hold until the title card clears

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-film"
    >
      {/* ---- the film ---- */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={ready ? { scale: 1 } : {}}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: D }}
      >
        <motion.div className="absolute inset-[-12%]" style={{ y: mediaY }}>
          <Frame
            src="/stills/hero.jpg"
            alt="ADGOD showreel"
            priority
            ratio="auto"
            className="h-full w-full !rounded-none !shadow-none"
            style={{ height: '100%', width: '100%' }}
          />
        </motion.div>
      </motion.div>

      {/* scrim — the type has to read without dulling the whole shot */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[6] h-[64%]"
        style={{
          background:
            'linear-gradient(to top, rgba(8,8,9,0.88) 0%, rgba(8,8,9,0.44) 44%, transparent 100%)',
        }}
      />

      {/* ---- the line ---- */}
      <motion.div
        className="page relative z-10 pb-12 pt-[140px] md:pb-14"
        style={{ y: copyY }}
      >
        {/* CSS transitions, not a JS animation library: above-the-fold copy
            must never be invisible while the main thread is busy. Same reason
            the curtain is CSS. */}
        <h1 className="display t-display-xl max-w-[13ch] text-paper">
          {['We make films', 'for brands.'].map((line, i) => (
            <span
              key={i}
              className="block overflow-hidden"
              style={{ paddingBottom: '0.24em', marginBottom: '-0.24em' }}
            >
              <span
                className={`block transition-transform duration-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === 1 ? 'em' : ''
                } ${ready ? 'translate-y-0' : 'translate-y-[112%]'}`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className={`mt-8 flex flex-col gap-6 border-t border-paper/15 pt-6 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:flex-row md:items-baseline md:justify-between ${
            ready ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
          style={{ transitionDelay: '420ms' }}
        >
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-paper/65">
            ADGOD is a creative production house. Ad films, brand films, music
            videos and documentary work.
          </p>

          <div className="flex shrink-0 items-baseline gap-8">
            <Link to="/portfolio" className="group inline-flex items-baseline gap-3">
              <span className="label inline-block border-b border-paper/70 pb-1 text-paper transition-colors duration-300 group-hover:border-signal group-hover:text-signal">
                See the work
              </span>
              <span className="label text-paper/45 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                &#8594;
              </span>
            </Link>
            <a
              href="#contact"
              className="label text-paper/55 transition-colors duration-300 hover:text-paper"
            >
              Start a project
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
