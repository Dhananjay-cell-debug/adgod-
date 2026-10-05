import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Frame from '../components/Frame'
import SectionHead from '../components/SectionHead'
import { services } from '../data/cms'
import { DUR, EASE_OUT_EXPO, EASE_CUT, VIEWPORT } from '../lib/motion'

/**
 * Services — the "Rovenlabs list, but alive" section.
 *
 * Rovenlabs does a clean service list and stops. Same editorial restraint here,
 * but the row has a reason to be hovered: the frame beside it cuts to a still
 * from that kind of work, and the row itself indents like a selected clip.
 *
 * Deliberately a FIXED SLOT, not a cursor-follower. A frame chasing the mouse
 * needs a code component in Framer, costs real mobile performance, and is
 * exactly the decoration that tips premium into restless. The cut is enough.
 *
 * Framer build: CMS list + Hover variants on each row; the frame is a stack of
 * CMS images whose opacity is driven by the hovered row's variant.
 */
export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative pt-14 md:pt-24">
      <div className="page">
        <SectionHead title="What we" emphasis="do." />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-6">
          {/* the list */}
          <div className="md:col-span-7">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.base, ease: EASE_OUT_EXPO, delay: i * 0.05 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className="relative cursor-default border-t border-[var(--line)] last:border-b"
              >
                <motion.div
                  className="flex items-baseline gap-5 py-6 md:gap-7"
                  initial={false}
                  animate={{ paddingLeft: active === i ? 14 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  <span
                    className="label shrink-0 transition-colors duration-300"
                    style={{
                      color: active === i ? 'var(--color-signal)' : 'var(--color-ink-faint)',
                    }}
                  >
                    {s.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="display t-display-s">{s.name}</h3>
                    <p className="mt-2 max-w-[50ch] text-[15px] text-ink-dim">{s.body}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* the slot — it cuts, it does not cross-fade */}
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <div className="frame grain relative" style={{ aspectRatio: '4 / 5' }}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.62, ease: EASE_CUT }}
                  >
                    <Frame
                      src={services[active].image}
                      alt={services[active].name}
                      ratio="4 / 5"
                      className="h-full w-full !shadow-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
