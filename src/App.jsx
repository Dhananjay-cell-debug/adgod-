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
// Held at module level so the page transition can jump to the top instantly.
// window.scrollTo under Lenis gets eased, which read as a lurch after a swap.
const lenisRef = { current: null }

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    lenisRef.current = lenis
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
}

const frame = () => new Promise((r) => requestAnimationFrame(() => r()))
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function jumpTo(hash) {
  const el = hash ? document.querySelector(hash) : null
  const lenis = lenisRef.current
  const target = el ?? 0
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
  else if (el) el.scrollIntoView()
  else window.scrollTo(0, 0)
}

function lockScroll(on) {
  document.body.style.overflow = on ? 'hidden' : ''
  const lenis = lenisRef.current
  if (!lenis) return
  if (on) lenis.stop()
  else lenis.start()
}

/**
 * The curtain drives both the opening and every page change.
 *
 *   load → curtain starts shut (ADGOD whole), holds, splits apart
 *   nav  → halves close until the word is whole, page swaps behind it,
 *          splits apart again
 *
 * Sequenced on the curtain's own animation promises, never on timers, so the
 * swap can't happen while the panels are still apart. Clicks during a
 * transition are queued and played after it.
 */
const HOLD_LOAD_MS = 650
const HOLD_SWAP_MS = 160

function useCurtain(curtain) {
  const location = useLocation()
  const [shown, setShown] = useState(location)
  const [open, setOpen] = useState(false)
  const latest = useRef(location)
  const shownPath = useRef(location.pathname)
  const busy = useRef(true) // the opening sequence counts as busy

  latest.current = location

  const run = useRef(null)
  run.current = async () => {
    busy.current = true
    setOpen(false)
    lockScroll(true)
    await curtain.current.close()

    const next = latest.current
    shownPath.current = next.pathname
    setShown(next)
    await frame() // commit
    jumpTo(next.hash)
    await frame() // paint
    await wait(HOLD_SWAP_MS)

    lockScroll(false)
    setOpen(true)
    await curtain.current.open()
    busy.current = false

    if (latest.current.pathname !== shownPath.current) run.current()
  }

  // opening sequence
  useEffect(() => {
    let alive = true
    lockScroll(true)
    ;(async () => {
      await Promise.race([document.fonts?.ready, wait(1200)])
      await wait(HOLD_LOAD_MS)
      if (!alive) return
      lockScroll(false)
      setOpen(true)
      await curtain.current.open()
      busy.current = false
      if (latest.current.pathname !== shownPath.current) run.current()
    })()
    return () => {
      alive = false
      lockScroll(false)
    }
  }, [curtain])

  // navigation
  useEffect(() => {
    if (location.pathname === shownPath.current) {
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (!busy.current) run.current()
  }, [location])

  return { shown, open }
}

/* -------------------------------------------------------------------- App */
export default function App() {
  const curtain = useRef(null)
  useLenis()
  const { shown, open } = useCurtain(curtain)

  return (
    <>
      <div className="paper-grain" />
      <Curtain ref={curtain} />
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
