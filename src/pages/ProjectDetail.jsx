import { useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import Frame from '../components/Frame'
import Ticker from '../components/Ticker'
import { DrawLine, FadeUp, Rise, WordsRise } from '../components/Reveal'
import { bySlug, related, categoryName } from '../data/cms'
import { DUR, EASE_OUT_EXPO, VIEWPORT } from '../lib/motion'

/**
 * Project Detail — ONE template, reused by every CMS item.
 *
 * The SOW is explicit that this must not be "a basic large-video-only page",
 * so the layout is editorial: the film leads, then context and credits sit in
 * a proper two-column read, then supporting stills, then the related rail.
 *
 * Every block below degrades gracefully when the client leaves a field empty —
 * no stills means no stills section, no credits means no credits column. That
 * matters more than it sounds: it's what lets ADGOD publish a thin project
 * without the page looking broken.
 */
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = bySlug(slug)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  if (!project) return <Navigate to="/portfolio" replace />

  const rel = related(project.slug, 3)

  const META = [
    ['Client', project.client],
    ['Discipline', categoryName(project.category)],
    ['Year', project.year],
  ]

  return (
    <>
      {/* ---------------------------------------------------------- Title */}
      <section className="page pb-9 pt-[112px] md:pb-11 md:pt-[136px]">
        <FadeUp>
          <div className="flex items-center gap-3">
            <Link to="/portfolio" className="label ul-draw inline-block text-ink-faint hover:text-ink">
              ← Portfolio
            </Link>
          </div>
        </FadeUp>

        <h1 className="display t-display-xl mt-5 max-w-[14ch]">
          <WordsRise text={project.title} />
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
          {META.map(([k, v], i) => (
            <FadeUp key={k} delay={0.08 + i * 0.05}>
              <span className="label text-ink-faint">
                {k} <span className="ml-2 text-ink-dim">{v}</span>
              </span>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------- Anamorphic hero */}
      <section ref={heroRef} className="page">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
          className="overflow-hidden rounded-[2px]"
        >
          <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: '2.39 / 1' }}>
            <motion.div className="absolute inset-[-8%]" style={{ y, scale }}>
              <Frame
                src={project.cover}
                alt={project.title}
                priority
                ratio="auto"
                className="h-full w-full !rounded-none !shadow-none"
                style={{ height: '100%', width: '100%' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------- The read */}
      <section className="page py-16 md:py-24">
        <DrawLine />
        <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Rise className="display t-display-m max-w-[22ch] leading-[1.08]">
              {project.excerpt}
            </Rise>
            <FadeUp delay={0.12}>
              <p className="t-body-l mt-8 max-w-[62ch] text-ink-dim">{project.summary}</p>
            </FadeUp>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <FadeUp>
              <p className="label mb-4 text-ink-faint">Scope</p>
              <ul className="space-y-0">
                {project.services.map((s) => (
                  <li key={s} className="hairline py-2.5 text-[15px] text-ink-dim">
                    {s}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {project.credits?.length > 0 && (
              <FadeUp delay={0.1}>
                <p className="label mb-4 mt-12 text-ink-faint">Credits</p>
                <ul className="space-y-0">
                  {project.credits.map(([role, name]) => (
                    <li
                      key={role}
                      className="hairline flex items-baseline justify-between gap-6 py-2.5"
                    >
                      <span className="label text-ink-faint">{role}</span>
                      <span className="text-[15px] text-ink-dim">{name}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Stills */}
      {project.stills?.length > 0 && (
        <section className="page pb-16 md:pb-20">
          <div className="grid gap-6 md:grid-cols-12">
            {project.stills.map((g, i) => {
              // Pairs fill the 12-column row exactly (8 + 4). A trailing odd
              // image goes full width rather than leaving a dead half-row.
              const isLastOdd = i === project.stills.length - 1 && project.stills.length % 2 === 1
              const span = isLastOdd ? 'md:col-span-12' : i % 2 === 0 ? 'md:col-span-8' : 'md:col-span-4'
              const ratio = isLastOdd ? '21 / 9' : i % 2 === 0 ? '16 / 9' : '4 / 5'
              return (
                <motion.div
                  key={i}
                  className={span}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: DUR.base, ease: EASE_OUT_EXPO, delay: (i % 2) * 0.08 }}
                >
                  <Frame src={g} alt="" ratio={ratio} />
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* ------------------------------------------- More projects by us */}
      <section className="overflow-hidden py-14 md:py-20">
        <div className="page">
          <DrawLine />
          <div className="flex items-end justify-between gap-6 pt-8">
            <h2 className="display t-display-m">More projects</h2>
            <Link to="/portfolio" className="label ul-draw inline-block shrink-0 text-ink-dim hover:text-ink">
              Full portfolio →
            </Link>
          </div>
        </div>

        {/* the controlled right-to-left drift the SOW asks for, by name */}
        <div className="mt-9 md:mt-12">
          <Ticker speed={34} gap={24}>
            <div className="flex shrink-0 gap-6">
              {rel.map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  className="group block w-[78vw] shrink-0 sm:w-[46vw] lg:w-[30vw]"
                >
                  <div className="relative">
                    <Frame src={p.cover} alt={p.title} ratio="16 / 9" />
                    <span className="absolute inset-0 z-[5] bg-film/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-3.5">
                    <span className="display t-display-s leading-none">{p.title}</span>
                    <span className="label shrink-0 text-ink-faint">
                      {categoryName(p.category)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Ticker>
        </div>
      </section>

      {/* --------------------------------------------------- Next project */}
      <section className="page pb-20 md:pb-24">
        <DrawLine />
        <Link
          to={`/work/${rel[0]?.slug ?? project.slug}`}
          className="group flex items-end justify-between gap-8 pt-10"
        >
          <div>
            <span className="label text-ink-faint">Next</span>
            <p className="display t-display-l mt-3 transition-colors duration-300 group-hover:text-ink">
              {rel[0]?.title ?? 'Back to portfolio'}
            </p>
          </div>
          <span className="label pb-3 text-ink-dim transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>
    </>
  )
}
