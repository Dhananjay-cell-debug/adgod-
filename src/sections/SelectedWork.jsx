import ProjectCard from '../components/ProjectCard'
import SectionHead from '../components/SectionHead'
import { featured } from '../data/cms'

/**
 * Selected Work — six projects, as scoped.
 *
 * Card size follows the brief directly: "pleasant, controlled thumbnail sizes
 * rather than oversized blocks." Three up on desktop keeps each frame around
 * 420px wide — enough to read a shot, small enough that six projects feel like
 * a body of work rather than six separate landing pages.
 *
 * Which six appear is driven by the CMS `featured` flag, so ADGOD changes their
 * own homepage lineup without touching the design.
 */
export default function SelectedWork() {
  const items = featured()

  return (
    <section id="work" className="relative pt-14 md:pt-24">
      <div className="page">
        <SectionHead
          title="Six recent"
          emphasis="films."
          action="All work &rarr;"
          actionTo="/portfolio"
        />

        <div className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
