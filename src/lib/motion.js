/**
 * Shared motion constants.
 *
 * THE SYNC RULE: elements entering together share the same duration and the
 * same curve, and differ only by stagger delay. That single discipline is the
 * whole reason the site reads as choreographed rather than busy.
 *
 * Every token here maps 1:1 to a Framer setting — see docs/02-MOTION-SPEC.md.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] // the house curve
export const EASE_CUT = [0.83, 0, 0.17, 1] // wipes, page transitions

export const DUR = {
  fast: 0.22,
  base: 0.62,
  slow: 1.1,
}

export const STAGGER = 0.06

/** Standard viewport trigger. Fires once, a third of the way in. */
export const VIEWPORT = { once: true, amount: 0.15 }

/** Mask-up reveal — the site's default entrance. Framer: Appear effect. */
export const riseIn = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
}

/** Fade + lift. For anything that can't be clipped (paragraphs, rows). */
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
}

/** Parent that staggers its children. Children must use a variant above. */
export const stagger = (delayChildren = 0, each = STAGGER) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: each, delayChildren },
  },
})

/** Media entering: a held frame that settles. Framer: Appear scale + opacity. */
export const frameIn = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
}

/** Split a string into word spans for a staggered clip reveal. */
export const words = (text) => text.split(' ')
