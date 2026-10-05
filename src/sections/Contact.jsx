import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FadeUp, WordsRise, DrawLine } from '../components/Reveal'
import { EASE_CUT, EASE_OUT_EXPO, VIEWPORT, DUR } from '../lib/motion'

/**
 * Contact — built against the Paparazzi enquiry panel.
 *
 * What that reference gets right, and what I've taken from it:
 *  · the form is a dark PANEL sitting on the page, not a list of lines bolted
 *    to the background — it reads as an object you fill in
 *  · a slate header on top: what it is, and a take number
 *  · two columns for the short fields, so it stops looking like a tax return
 *  · hairline underlines that light up on focus, no boxes
 *  · the accent colour used once, on the top edge
 *
 * What I changed for ADGOD: the panel is the only dark surface in this half of
 * the page, which ties it to the film frames elsewhere — the same "the dark
 * things are the work" logic that runs through the whole site.
 *
 * Framer build: native Framer Form inside a dark frame. Field styling is a
 * bottom border plus a focus variant. The recipient address is set in the
 * form's own settings, so no third-party service and no extra subscription.
 */

const ABOUT = ['Ad film', 'Brand film', 'Music video', 'Product', 'Documentary', 'Something else']

function Field({ label, children, className = '' }) {
  return (
    <label className={`group block ${className}`}>
      <span className="mb-2 block text-[13px] text-paper/45 transition-colors duration-300 group-focus-within:text-paper/80">
        {label}
      </span>
      <div className="relative">
        {children}
        <span className="absolute inset-x-0 bottom-0 h-px bg-paper/18" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
      </div>
    </label>
  )
}

const input =
  'w-full bg-transparent pb-2.5 text-[15px] text-paper outline-none border-0 placeholder:text-paper/25'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [about, setAbout] = useState('')
  const [openList, setOpenList] = useState(false)

  return (
    <section id="contact" className="relative pt-14 pb-16 md:pt-24 md:pb-24">
      <div className="page">
        <DrawLine />

        <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-x-8 md:pt-14">
          {/* ---- the ask ---- */}
          <div className="md:col-span-5">
            <h2 className="display t-display-xl max-w-[11ch]">
              <WordsRise text="Send us a" />{' '}
              <WordsRise text="brief." className="em" delay={0.14} />
            </h2>

            <FadeUp delay={0.12}>
              <p className="t-body-l mt-8 max-w-[42ch] text-ink-dim">
                Tell us what the film is and roughly when you need it. We reply to
                everything within two working days.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14">
                <div>
                  <p className="label mb-2.5 text-ink-faint">Studio</p>
                  <p className="text-[15px] leading-relaxed text-ink-dim">
                    Mumbai, India
                  </p>
                </div>
                <div>
                  <p className="label mb-2.5 text-ink-faint">Email</p>
                  <a
                    href="mailto:hello@adgod.in"
                    className="ul-draw block w-fit text-[15px] text-ink-dim hover:text-ink"
                  >
                    hello@adgod.in
                  </a>
                  <a
                    href="tel:+910000000000"
                    className="ul-draw mt-1 block w-fit text-[15px] text-ink-dim hover:text-ink"
                  >
                    +91 00000 00000
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ---- the panel ---- */}
          <motion.div
            className="md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE_OUT_EXPO }}
          >
            <div className="frame grain relative rounded-[3px] p-6 md:p-8">
              <div className="haze absolute inset-0 opacity-30" />
              {/* top edge */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-signal" />

              <div className="relative z-[4]">
                {/* slate */}
                <div className="flex items-center justify-between gap-4 pb-6">
                  <div className="flex items-center gap-3">
                    <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
                      <g fill="var(--color-paper)">
                        <path d="M0 0h4.6L2.3 14H0z" opacity=".95" />
                        <path d="M6.4 0H11L8.7 14H4.1z" opacity=".7" />
                        <path d="M12.8 0h4.6l-2.3 14h-4.6z" opacity=".45" />
                      </g>
                    </svg>
                    <span className="label text-paper/85">New enquiry</span>
                  </div>
                  <span className="label text-paper/35">Take 01</span>
                </div>
                <div className="border-t border-dashed border-paper/18" />

                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.form
                      key="form"
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={(e) => {
                        e.preventDefault()
                        setSent(true) // prototype only; Framer's form does real delivery
                      }}
                      className="pt-7"
                    >
                      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                        <Field label="First name">
                          <input required name="first" className={input} placeholder=" " />
                        </Field>
                        <Field label="Last name">
                          <input name="last" className={input} placeholder=" " />
                        </Field>
                        <Field label="Email address" className="sm:col-span-2">
                          <input required type="email" name="email" className={input} placeholder=" " />
                        </Field>
                        <Field label="Phone (optional)" className="sm:col-span-2">
                          <input name="phone" className={input} placeholder=" " />
                        </Field>
                      </div>

                      {/* what's it about — a real select, styled as a line */}
                      <div className="relative mt-7">
                        <span className="mb-2 block text-[13px] text-paper/45">
                          What&rsquo;s it about?
                        </span>
                        <button
                          type="button"
                          onClick={() => setOpenList((v) => !v)}
                          className="flex w-full items-center justify-between pb-2.5 text-left text-[15px]"
                          aria-expanded={openList}
                        >
                          <span className={about ? 'text-paper' : 'text-paper/25'}>
                            {about || 'Select one'}
                          </span>
                          <motion.span
                            animate={{ rotate: openList ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                            className="text-paper/45"
                          >
                            <svg width="12" height="8" viewBox="0 0 12 8" aria-hidden>
                              <path
                                d="M1 1.5 6 6.5l5-5"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                fill="none"
                              />
                            </svg>
                          </motion.span>
                        </button>
                        <span className="absolute inset-x-0 bottom-0 h-px bg-paper/18" />

                        <AnimatePresence>
                          {openList && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap gap-2 pt-4">
                                {ABOUT.map((a) => (
                                  <button
                                    key={a}
                                    type="button"
                                    onClick={() => {
                                      setAbout(a)
                                      setOpenList(false)
                                    }}
                                    className="label rounded-[2px] border px-3 py-2 transition-colors duration-300"
                                    style={{
                                      borderColor:
                                        about === a
                                          ? 'var(--color-signal)'
                                          : 'rgba(244,242,238,0.2)',
                                      color:
                                        about === a
                                          ? 'var(--color-signal)'
                                          : 'rgba(244,242,238,0.6)',
                                    }}
                                  >
                                    {a}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-7">
                        <Field label="Tell us about the project">
                          <textarea
                            required
                            rows={3}
                            name="message"
                            className={`${input} resize-none`}
                            placeholder=" "
                          />
                        </Field>
                      </div>

                      <button
                        type="submit"
                        className="group relative mt-9 w-full overflow-hidden rounded-[2px] bg-paper py-4 text-ink"
                      >
                        <span className="label relative z-10 transition-colors duration-300 group-hover:text-paper">
                          Send it over
                        </span>
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="sent"
                      initial={{ clipPath: 'inset(0 0 100% 0)' }}
                      animate={{ clipPath: 'inset(0 0 0% 0)' }}
                      transition={{ duration: 0.7, ease: EASE_CUT }}
                      className="py-14"
                    >
                      <span className="label text-signal">Received</span>
                      <p className="display t-display-m mt-4 max-w-[18ch] text-paper">
                        Thanks. We&rsquo;ll reply within two working days.
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        className="label ul-draw mt-8 inline-block text-paper/50 hover:text-paper"
                      >
                        Send another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
