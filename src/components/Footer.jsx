import { Link } from 'react-router-dom'
import { socials } from '../data/cms'
import { DrawLine, Rise } from './Reveal'

/**
 * Footer — thin, as the SOW specifies. Its only real job is to hold the
 * wordmark large enough to be the last thing you remember.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative">
      <div className="page">
        <DrawLine />
        <div className="grid gap-10 py-12 md:grid-cols-12 md:py-14">
          <div className="md:col-span-5">
            <Rise className="display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.9] tracking-[-0.035em]">
              ADGOD
            </Rise>
            <p className="label mt-4 text-ink-faint">Creative Production House</p>
          </div>

          <div className="md:col-span-3">
            <p className="label mb-4 text-ink-faint">Pages</p>
            <ul className="space-y-2.5">
              {[
                ['Home', '/'],
                ['Work', '/portfolio'],
                ['Contact', '/#contact'],
              ].map(([l, to]) => (
                <li key={l}>
                  <Link to={to} className="ul-draw inline-block text-[15px] text-ink-dim transition-colors hover:text-ink">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label mb-4 text-ink-faint">Social</p>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.url} className="ul-draw inline-block text-[15px] text-ink-dim transition-colors hover:text-ink">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label mb-4 text-ink-faint">Email</p>
            <a href="mailto:hello@adgod.in" className="ul-draw block w-fit text-[15px] text-ink-dim transition-colors hover:text-ink">
              hello@adgod.in
            </a>
            <p className="label mt-6 text-ink-faint">Mumbai</p>
          </div>
        </div>

        <DrawLine />
        <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="label text-ink-faint">© {year} ADGOD. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
