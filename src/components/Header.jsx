import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { DUR, EASE_OUT_EXPO } from '../lib/motion'

/**
 * Header.
 *
 * The site is two pages. The nav is therefore two items, shown as plain links
 * at every size - no menu button on phones.
 */
const NAV = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/#contact' },
]

export default function Header({ ready }) {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onFilm = !scrolled && pathname === '/' // the hero is full-bleed footage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: DUR.slow, ease: EASE_OUT_EXPO, delay: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 bg-paper"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--line)]"
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        />

        <div className="page relative">
          <motion.div
            animate={{ paddingBlock: scrolled ? 16 : 24 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="flex w-full items-center justify-between"
          >
            <Link
              to="/"
              className={`display text-[1.28rem] leading-none transition-colors duration-500 ${
                onFilm ? 'text-paper' : 'text-ink'
              }`}
              aria-label="ADGOD — home"
            >
              ADGOD
            </Link>

            <nav className="flex items-center gap-5 md:gap-7">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className={`label ul-draw inline-block transition-colors duration-500 ${
                    onFilm ? 'text-paper/75 hover:text-paper' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

          </motion.div>
        </div>
      </motion.header>

    </>
  )
}
