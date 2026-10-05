import { Link } from 'react-router-dom'
import { DrawLine, FadeUp, WordsRise } from './Reveal'

/**
 * SectionHead — a rule, a headline, and nothing else.
 *
 * The small mono label that used to sit above every heading is gone. Repeated
 * on five sections it stopped being a wayfinding device and became decoration;
 * the headline already says what the section is.
 *
 * Emphasis is the accent colour, never an italic — the italic-serif emphasis
 * is the single most worn-out move on studio sites.
 */
export default function SectionHead({ title, emphasis, action, actionTo, className = '' }) {
  return (
    <div className={className}>
      <DrawLine />
      <div className="flex items-end justify-between gap-8 pt-6 md:pt-9">
        <h2 className="display t-display-l max-w-[16ch]">
          <WordsRise text={title} />
          {emphasis && (
            <>
              {' '}
              <WordsRise text={emphasis} className="em" delay={0.12} />
            </>
          )}
        </h2>
        {action && (
          <FadeUp delay={0.15}>
            <Link
              to={actionTo}
              className="label ul-draw mb-1.5 inline-block whitespace-nowrap text-ink-dim transition-colors hover:text-ink"
            >
              {action}
            </Link>
          </FadeUp>
        )}
      </div>
    </div>
  )
}
