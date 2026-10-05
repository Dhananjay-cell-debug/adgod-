/**
 * Curtain — the site's one signature gesture.
 *
 * It opens the site on first load and it is the same thing you see on every
 * navigation. That repetition is the point: a transition you recognise is what
 * makes a site feel like one place rather than a stack of pages.
 *
 * Two dark halves part across the middle, like a curtain or a lens iris, with
 * a red parting line and haze bleeding from the seam.
 *
 * IMPORTANT — this is deliberately pure CSS, not a JS animation library.
 * A load curtain is the one thing on a site that must never depend on the
 * main thread being free: if the bundle is still parsing, or the tab is
 * throttled, a JS-driven curtain sits there covering the page. CSS transitions
 * run on the compositor and open on time regardless. (This bit us in testing —
 * on a loaded machine the JS version held the screen for several seconds.)
 *
 * Framer build: two frames anchored top and bottom, each with a Y transition
 * of ±100% on a 0.76/0/0.16/1 curve. Exactly this, no code component.
 */
export default function Curtain({ open, showMark = true }) {
  const base =
    'absolute inset-x-0 h-[50.6%] overflow-hidden bg-film will-change-transform ' +
    'transition-transform duration-[1150ms] ease-[cubic-bezier(0.76,0,0.16,1)]'

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden>
      <div
        className={`${base} top-0 ${open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="haze absolute inset-0 opacity-75" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-signal/70" />
        <div
          className="absolute inset-x-0 bottom-0 h-44"
          style={{ background: 'linear-gradient(to top, rgba(210,55,26,0.20), transparent 80%)' }}
        />
      </div>

      <div
        className={`${base} bottom-0 ${open ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <div className="haze absolute inset-0 opacity-75" />
        <div className="absolute inset-x-0 top-0 h-px bg-signal/70" />
        <div
          className="absolute inset-x-0 top-0 h-44"
          style={{ background: 'linear-gradient(to bottom, rgba(210,55,26,0.20), transparent 80%)' }}
        />
      </div>

      {showMark && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.76,0,0.16,1)] ${
            open ? 'scale-[1.06] opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'
          }`}
        >
          <span
            className="display text-[clamp(2.1rem,7.5vw,5.4rem)] text-paper"
            style={{ fontStretch: '118%', letterSpacing: '-0.05em' }}
          >
            ADGOD
          </span>
        </div>
      )}
    </div>
  )
}
