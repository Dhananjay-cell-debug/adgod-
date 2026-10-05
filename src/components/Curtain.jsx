import { useImperativeHandle, useRef } from 'react'

/**
 * Curtain — the site's one signature gesture, on first load and on every
 * navigation.
 *
 * The word ADGOD is cut in half along the middle of the screen. The top half
 * is printed on a dark panel that drops from above, the bottom half on a panel
 * that rises from below. They also slide in from opposite sides, slightly
 * sheared, so the halves only line up at the instant the panels touch: the
 * word is "assembled" by the cut. A red line runs along the seam on impact.
 * Opening, the panels carry on past each other — top half out to the left and
 * up, bottom half out to the right and down.
 *
 * Driven by the Web Animations API with transforms only, so it runs on the
 * compositor: a busy main thread (a page mounting behind it, images decoding)
 * can't make it stutter. Close and open return promises, and the page is only
 * swapped once the close has actually finished — the old version swapped on a
 * timer that fired while the panels were still apart, which is what showed
 * through as a jerk.
 *
 * Framer build: two frames, each with a child text layer clipped by the frame;
 * Y ±100% on the frames and X ±22vw + skew on the text, same curve.
 */
const EASE_IN = 'cubic-bezier(0.76, 0, 0.24, 1)'
const EASE_OUT = 'cubic-bezier(0.7, 0, 0.18, 1)'
const SHIFT = '22vw'
const SKEW = 14

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Curtain({ ref }) {
  const topRef = useRef(null)
  const botRef = useRef(null)
  const topWord = useRef(null)
  const botWord = useRef(null)
  const seam = useRef(null)
  const rootRef = useRef(null)

  // Once open, the panels sit exactly off-screen with the word's cut edge on
  // the viewport edge, where sub-pixel rounding can leave a 1px sliver of
  // letters showing. Hiding the whole layer when idle removes that.
  const show = (on) => {
    if (rootRef.current) rootRef.current.style.visibility = on ? 'visible' : 'hidden'
  }

  const play = (el, frames, opts) => {
    el.getAnimations().forEach((a) => a.cancel())
    // a cancelled animation rejects; never let that strand the sequence
    return el.animate(frames, { fill: 'both', ...opts }).finished.catch(() => {})
  }

  useImperativeHandle(ref, () => ({
    close() {
      show(true)
      const d = reduced() ? 1 : 860
      const o = { duration: d, easing: EASE_IN }
      return Promise.all([
        play(topRef.current, [{ transform: 'translate3d(0,-100%,0)' }, { transform: 'translate3d(0,0,0)' }], o),
        play(botRef.current, [{ transform: 'translate3d(0,100%,0)' }, { transform: 'translate3d(0,0,0)' }], o),
        play(
          topWord.current,
          [{ transform: `translate3d(${SHIFT},0,0) skewX(-${SKEW}deg)` }, { transform: 'translate3d(0,0,0) skewX(0deg)' }],
          o,
        ),
        play(
          botWord.current,
          [{ transform: `translate3d(-${SHIFT},0,0) skewX(-${SKEW}deg)` }, { transform: 'translate3d(0,0,0) skewX(0deg)' }],
          o,
        ),
        play(
          seam.current,
          [
            { transform: 'scaleX(0)', opacity: 1, offset: 0 },
            { transform: 'scaleX(0)', opacity: 1, offset: 0.82 },
            { transform: 'scaleX(1)', opacity: 1, offset: 1 },
          ],
          { duration: d + 260, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        ),
      ])
    },

    open() {
      const d = reduced() ? 1 : 1050
      const o = { duration: d, easing: EASE_OUT }
      const done = Promise.all([
        play(topRef.current, [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(0,-100%,0)' }], o),
        play(botRef.current, [{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(0,100%,0)' }], o),
        play(
          topWord.current,
          [{ transform: 'translate3d(0,0,0) skewX(0deg)' }, { transform: `translate3d(-${SHIFT},0,0) skewX(${SKEW}deg)` }],
          o,
        ),
        play(
          botWord.current,
          [{ transform: 'translate3d(0,0,0) skewX(0deg)' }, { transform: `translate3d(${SHIFT},0,0) skewX(${SKEW}deg)` }],
          o,
        ),
        play(seam.current, [{ opacity: 1 }, { opacity: 0 }], { duration: d * 0.3, easing: 'linear' }),
      ])
      return done.then(() => show(false))
    },
  }))

  // Each half holds a full-viewport copy of the word, centred on the screen,
  // so the two copies sit in exactly the same place and the panel edge does
  // the cutting.
  const word = (r, anchor) => (
    <div className={`absolute inset-x-0 ${anchor} flex h-[200%] items-center justify-center`}>
      <span
        ref={r}
        className="curtain-word block will-change-transform"
        style={{ transformOrigin: '50% 50%' }}
      >
        ADGOD
      </span>
    </div>
  )

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden>
      <div ref={topRef} className="curtain-half absolute inset-x-0 top-0 h-[50%]">
        <div className="curtain-glow-top absolute inset-0" />
        {word(topWord, 'top-0')}
      </div>

      <div ref={botRef} className="curtain-half absolute inset-x-0 bottom-0 h-[50%]">
        <div className="curtain-glow-bot absolute inset-0" />
        {word(botWord, 'bottom-0')}
      </div>

      <div
        ref={seam}
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-signal will-change-transform"
        style={{ boxShadow: '0 0 24px 2px rgba(210,55,26,0.75)', transformOrigin: '0 50%' }}
      />
    </div>
  )
}
