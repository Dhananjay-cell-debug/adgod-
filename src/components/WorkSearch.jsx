import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { EASE_OUT_EXPO } from '../lib/motion'
import { categoryName, searchProjects } from '../data/cms'

/**
 * WorkSearch — a pill in the filter bar that opens into a search field.
 *
 * Typing does two things: the grid below filters live, and a small panel lists
 * the matching films with their stills. Pick one (click, or arrows + Enter) to
 * go straight to that film's page. Press "/" anywhere on the page to open it.
 *
 * The open field is absolutely positioned and grows leftwards over the sort and
 * count, so nothing else in the bar reflows while it animates.
 */
const PILL_W = 112
const MAX_ROWS = 5

const Icon = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" fill="none" className={`h-[15px] w-[15px] ${className}`} aria-hidden>
    <circle cx="8.6" cy="8.6" r="5.6" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12.9 12.9 17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

function Highlight({ text, q }) {
  const needle = q.trim().toLowerCase()
  const i = needle ? text.toLowerCase().indexOf(needle) : -1
  if (i < 0) return text
  const n = needle.length
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-signal">{text.slice(i, i + n)}</mark>
      {text.slice(i + n)}
    </>
  )
}

export default function WorkSearch({ query, onQuery, onExpand }) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(0)
  const [width, setWidth] = useState(400)
  const input = useRef(null)
  const root = useRef(null)
  const navigate = useNavigate()

  const expanded = open || query.length > 0
  const results = query.trim() ? searchProjects(query).slice(0, MAX_ROWS) : []
  const showPanel = expanded && focused && query.trim().length > 0

  useEffect(() => {
    onExpand?.(expanded)
  }, [expanded, onExpand])

  // the field is never wider than the space to the left of it
  useEffect(() => {
    const fit = () => {
      const r = root.current?.getBoundingClientRect()
      const pad =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-x')) || 20
      if (r) setWidth(Math.min(400, r.right - pad))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  // "/" opens the search from anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.target.closest?.('input, textarea')) return
      e.preventDefault()
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) input.current?.focus({ preventScroll: true })
  }, [open])

  // click outside: hide the panel, and fold the field away when it is empty
  useEffect(() => {
    const onDown = (e) => {
      if (root.current?.contains(e.target)) return
      setFocused(false)
      if (!query) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [query])

  const go = (p) => p && navigate(`/work/${p.slug}`)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      go(results[active])
    } else if (e.key === 'Escape') {
      onQuery('')
      setOpen(false)
      input.current?.blur()
    }
  }

  return (
    <div ref={root} className="relative h-10" style={{ width: PILL_W }}>
      <motion.div
        className="search-shell absolute right-0 top-0 z-40 flex h-10 items-center overflow-hidden rounded-full"
        initial={false}
        animate={{ width: expanded ? width : PILL_W }}
        transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
        onClick={() => !expanded && setOpen(true)}
      >
        {!expanded ? (
          <button
            type="button"
            className="group flex h-full w-full items-center justify-center gap-2 text-ink"
            aria-label="Search portfolio"
          >
            <Icon className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
            <span className="label">Search</span>
          </button>
        ) : (
          <>
            <Icon className="ml-4 shrink-0 text-signal" />
            <input
              ref={input}
              value={query}
              onChange={(e) => {
                onQuery(e.target.value)
                setActive(0)
              }}
              onFocus={() => setFocused(true)}
              onKeyDown={onKeyDown}
              placeholder="Search a film, client or type"
              aria-label="Search portfolio"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] text-ink outline-none placeholder:text-ink-faint focus-visible:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                onQuery('')
                setOpen(false)
              }}
              className="mr-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-ink/[0.06] hover:text-ink"
              aria-label="Close search"
            >
              <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" aria-hidden>
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            data-lenis-prevent
            className="search-panel absolute right-0 top-12 z-40 overflow-hidden rounded-2xl p-1.5"
            style={{ width }}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
          >
            {results.length === 0 ? (
              <p className="px-3.5 py-4 text-[14px] text-ink-dim">
                No film matches &ldquo;{query.trim()}&rdquo;.
              </p>
            ) : (
              results.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(p)}
                  className={`flex w-full items-center gap-3.5 rounded-xl p-2 text-left transition-colors duration-200 ${
                    i === active ? 'bg-ink/[0.05]' : ''
                  }`}
                >
                  <span className="relative h-[52px] w-[42px] shrink-0 overflow-hidden rounded-[7px] bg-film shadow-[0_6px_14px_-8px_rgba(18,17,16,0.6)]">
                    <img
                      src={p.cover}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ filter: 'saturate(0.82) contrast(1.06) brightness(0.9)' }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-[560] tracking-[-0.01em] text-ink">
                      <Highlight text={p.title} q={query} />
                    </span>
                    <span className="label mt-1.5 block truncate text-ink-faint">
                      {p.client} &middot; {categoryName(p.category)} &middot; {p.year}
                    </span>
                  </span>
                  <span
                    className={`mr-2 text-[15px] text-signal transition-all duration-300 ${
                      i === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                    }`}
                    aria-hidden
                  >
                    &#8594;
                  </span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
