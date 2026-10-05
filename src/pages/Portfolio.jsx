import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import ProjectCard from '../components/ProjectCard'
import WorkSearch from '../components/WorkSearch'
import { DrawLine, FadeUp, WordsRise } from '../components/Reveal'
import { categories, searchProjects } from '../data/cms'
import { DUR, EASE_OUT_EXPO } from '../lib/motion'

/**
 * Work — the index.
 *
 * Discovery is filter-first, not search-first. At 15–40 projects, chips are
 * genuinely faster than a search box — you see every option instead of
 * guessing keywords — and they need no plugin, so nothing can silently break
 * after the project is handed over. Reasoning in docs/00-DECISIONS.md, D-04.
 *
 * Framer build: CMS list with a filter connected to the Categories collection.
 * Fully native; the count and the sort are standard CMS list features.
 */
export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [sort, setSort] = useState('new')
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)

  const list = useMemo(() => {
    const found = searchProjects(query)
    const filtered = active === 'all' ? found : found.filter((p) => p.category === active)
    return [...filtered].sort((a, b) =>
      sort === 'new'
        ? Number(b.year) - Number(a.year) || a.order - b.order
        : Number(a.year) - Number(b.year) || a.order - b.order,
    )
  }, [active, sort, query])

  const chips = [{ slug: 'all', name: 'All' }, ...categories]
  const count = String(list.length).padStart(2, '0')

  return (
    <>
      <section className="page pb-9 pt-[116px] md:pb-11 md:pt-[140px]">
        <h1 className="display t-display-xl max-w-[14ch]">
          <WordsRise text="Our" />{' '}
          <WordsRise text="portfolio." className="em" delay={0.14} />
        </h1>

        <FadeUp delay={0.25}>
          <p className="t-body-l mt-7 max-w-[54ch] text-ink-dim">
            Every film we have made, filtered by type.
          </p>
        </FadeUp>
      </section>

      {/* Filter bar. Sticks just under the compact header so the lane you picked
          is never lost while you scroll a long archive. */}
      <div className="sticky top-[50px] z-30 bg-paper">
        <div className="page">
          <DrawLine />
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5">
            <LayoutGroup id="filters">
              <div className="-ml-3 flex flex-wrap">
                {chips.map((c) => {
                  const on = active === c.slug
                  return (
                    <button
                      key={c.slug}
                      onClick={() => setActive(c.slug)}
                      className="label relative rounded-[2px] px-3 py-2.5 transition-colors duration-300"
                      style={{ color: on ? 'var(--color-paper)' : 'var(--color-ink-dim)' }}
                    >
                      {on && (
                        <motion.span
                          layoutId="chip"
                          className="absolute inset-0 rounded-[2px] bg-signal"
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        />
                      )}
                      <span className="relative z-10">{c.name}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            <div className="flex w-full items-center justify-between gap-6 md:w-auto">
              <div className="bar-meta flex items-center gap-6" data-hidden={searching}>
              <button
                onClick={() => setSort((s) => (s === 'new' ? 'old' : 'new'))}
                className="label text-ink-faint transition-colors hover:text-ink"
              >
                {sort === 'new' ? 'Newest first' : 'Oldest first'}
              </button>
              <span className="label text-ink-dim tabular-nums">
                {count} {list.length === 1 ? 'project' : 'projects'}
              </span>
              </div>
              <WorkSearch query={query} onQuery={setQuery} onExpand={setSearching} />
            </div>
          </div>
          <DrawLine />
        </div>
      </div>

      <section className="page pb-20 pt-9 md:pb-28 md:pt-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active + sort + query.trim()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DUR.fast * 1.6, ease: EASE_OUT_EXPO }}
            className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {list.length === 0 && (
          <p className="t-body-l py-20 text-center text-ink-dim">
            {query.trim() ? `No film matches “${query.trim()}”.` : 'No films in this category yet.'}
          </p>
        )}
      </section>
    </>
  )
}
