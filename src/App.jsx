import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

import Header from './components/Header'
import Footer from './components/Footer'
import Curtain from './components/Curtain'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'

/* ---------------------------------------------------------------- Smooth scroll */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])
}

/**
 * The curtain drives both the opening and every page change, so the site has
 * one gesture rather than two unrelated ones.
 *
 *   load  → curtain is closed, holds 750ms, draws apart
 *   nav   → curtain closes, page swaps behind it, draws apart again
 */
const CLOSE_MS = 640
const HOLD_MS = 520

function useCurtain() {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const [open, setOpen] = useState(false)
  const first = useRef(true)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // opening sequence
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setOpen(true)
      document.body.style.overflow = ''
    }, HOLD_MS)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  // navigation
  //
  // The timers are held in a ref and cleared only on unmount. They used to live
  // in the effect's cleanup, which looked correct but wasn't: swapping the page
  // changes `shown`, the effect re-runs, and its cleanup killed the timer that
  // was about to re-open the curtain — leaving it stuck shut over the new page.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (location.pathname === shown.pathname) {
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    clearTimers()
    setOpen(false)
    timers.current.push(
      setTimeout(() => {
        setShown(location)
        window.scrollTo(0, 0)
      }, CLOSE_MS),
      setTimeout(() => setOpen(true), CLOSE_MS + 180),
    )
  }, [location, shown.pathname])

  useEffect(() => clearTimers, [])

  return { shown, open }
}

/* -------------------------------------------------------------------- App */
export default function App() {
  const { shown, open } = useCurtain()
  useLenis()

  return (
    <>
      <div className="paper-grain" />
      <Curtain open={open} />
      <Header ready={open} />

      <main>
        <Routes location={shown}>
          <Route path="/" element={<Home ready={open} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<Home ready={open} />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
