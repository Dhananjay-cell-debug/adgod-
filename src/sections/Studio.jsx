import { TextTicker } from '../components/Ticker'
import { FadeUp } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

/**
 * Studio — typography is the whole treatment. No imagery at all.
 *
 * The work carries every image on this site, so the one section that is about
 * the studio rather than the films is the one section allowed to be pure type.
 */
const STATS = [
  ['120+', 'Films'],
  ['40+', 'Clients'],
  ['7', 'Years'],
]

const DISCIPLINES = [
  'Concept',
  'Scripting',
  'Casting',
  'Direction',
  'Cinematography',
  'Production Design',
  'Motion Control',
  'High Speed',
  'Edit',
  'Sound Design',
  'Colour Grade',
  'Delivery',
]

export default function Studio() {
  return (
    <section id="studio" className="relative pt-14 md:pt-24">
      <div className="page">
        <SectionHead title="A production house in" emphasis="Mumbai." />

        <div className="mt-12 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-x-6">
          <FadeUp className="md:col-span-5">
            <p className="t-body-l text-ink-dim">
              We work with brands, agencies and record labels, mostly on ad films
              and brand films, with music video and documentary work alongside.
              Shoots run across India.
            </p>
          </FadeUp>
          <FadeUp delay={0.08} className="md:col-span-5 md:col-start-7">
            <p className="t-body-l text-ink-dim">
              Writing, direction, cinematography, edit, sound and colour are all
              done here, by the same team, from the first call to delivery.
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 md:mt-16 md:max-w-3xl">
          {STATS.map(([n, l], i) => (
            <FadeUp key={l} delay={0.06 * i}>
              <div className="hairline pt-4">
                <p className="display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-none tracking-[-0.03em]">
                  {n}
                </p>
                <p className="label mt-3 text-ink-faint">{l}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* A wide, low-contrast line of disciplines drifting past — an
          atmospheric element, not a label strip. The old version was small
          tracked caps separated by dots, which read as UI chrome. */}
      <div className="mt-12 border-y border-[var(--line)] md:mt-16">
        <TextTicker items={DISCIPLINES} />
      </div>
    </section>
  )
}
