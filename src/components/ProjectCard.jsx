import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Frame from './Frame'
import { DUR, EASE_OUT_EXPO, VIEWPORT } from '../lib/motion'
import { categoryName } from '../data/cms'

/**
 * ProjectCard — a "boxed" thumbnail, the way preset packs are shown in a shop:
 * a soft grey tile, with the film's still sitting inside it as a rounded,
 * shadowed card. Title and year are printed on the still; the category sits in
 * a small pill in the tile's corner.
 *
 * Framer build: a CMS-connected component. Outer frame (fill #E8E5DF, radius
 * 14) with a centred child frame (radius 12, drop shadow) holding the cover
 * image. Hover variant scales the inner card to 1.035.
 */
export default function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: DUR.base,
        ease: EASE_OUT_EXPO,
        delay: (index % 3) * 0.08, // stagger by column, so a row lands together
      }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div className="thumb-box relative flex aspect-square items-center justify-center">
          <span className="label absolute right-3.5 top-3.5 z-10 rounded-[5px] bg-paper-2 px-2.5 py-[7px] text-ink shadow-[0_1px_2px_rgba(18,17,16,0.08)]">
            {categoryName(project.category)}
          </span>

          <motion.div
            className="w-[58%]"
            initial={false}
            animate={{ scale: hover ? 1.035 : 1, y: hover ? -4 : 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <Frame src={project.cover} alt={project.title} ratio="4 / 5" className="thumb-card">
              {/* top shade so the printed title stays readable on any still */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 z-[3] h-1/2"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)' }}
              />
              <span className="absolute left-[9%] right-[9%] top-[8%] z-[4] text-[clamp(0.85rem,1.05vw,1rem)] font-[560] leading-[1.15] tracking-[-0.015em] text-white">
                {project.title}
              </span>
              <span className="label absolute bottom-[7%] left-[9%] z-[4] text-[9.5px] text-white/85 tabular-nums">
                {project.year}
              </span>
            </Frame>
          </motion.div>
        </div>

        <div className="pt-4">
          <span className="display t-display-s block leading-[1.05]">{project.title}</span>
          <span className="label mt-2 block text-ink-faint">{project.client}</span>
        </div>
      </Link>
    </motion.article>
  )
}
