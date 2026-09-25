import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import { site } from '@/data/content'

type HeroProps = {
  ready: boolean
}

const REVEAL =
  '.hero__signal, .hero__brand-line, .hero__rule, .hero__headline, .hero__text, .hero__cta, .hero__compass'

function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const compassRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ready) {
        gsap.set(REVEAL, { autoAlpha: 0 })
        return
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(REVEAL, { clearProps: 'transform', autoAlpha: 1 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(REVEAL, { autoAlpha: 0 })

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo('.hero__signal', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55 }, 0.12)
          .fromTo(
            '.hero__brand-line',
            { y: 64, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.12 },
            0.18,
          )
          .fromTo(
            '.hero__rule',
            { scaleX: 0, autoAlpha: 0 },
            { scaleX: 1, autoAlpha: 1, duration: 0.7 },
            '-=0.45',
          )
          .fromTo('.hero__headline', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, '-=0.4')
          .fromTo('.hero__text', { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, '-=0.4')
          .fromTo(
            '.hero__cta',
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 },
            '-=0.35',
          )
          .fromTo(
            '.hero__compass',
            { autoAlpha: 0, scale: 0.85 },
            { autoAlpha: 1, scale: 1, duration: 0.65 },
            '-=0.25',
          )

        gsap.to('.hero__signal-dot', {
          scale: 1.35,
          opacity: 0.35,
          duration: 1.1,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  )

  useEffect(() => {
    if (!ready) {
      return
    }

    const compass = compassRef.current
    const needle = needleRef.current

    if (!compass || !needle) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setRotation = gsap.quickTo(needle, 'rotation', {
      duration: reducedMotion ? 0 : 0.4,
      ease: 'power3.out',
    })

    const onPointerMove = (event: PointerEvent) => {
      const rect = compass.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI + 90
      setRotation(angle)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [ready])

  const [firstName, lastName] = site.name.split(' ')

  return (
    <section className="hero" ref={rootRef} id="top">
      <div className="hero__content">
        <p className="hero__signal">
          <span className="hero__signal-dot" aria-hidden="true" />
          <span>Открыт к миссиям · Frontend</span>
        </p>

        <h1 className="hero__brand">
          <span className="hero__brand-line">{firstName}</span>
          <span className="hero__brand-line hero__brand-line--accent">{lastName}</span>
        </h1>

        <div className="hero__rule" aria-hidden="true" />

        <p className="hero__headline">{site.role}</p>
        <p className="hero__text">{site.heroLead}</p>

        <div className="hero__actions">
          <a className="hero__cta hero__cta--primary" href="#work">
            Смотреть проекты
          </a>
          <a className="hero__cta hero__cta--ghost" href="#contact">
            Связаться
          </a>
        </div>
      </div>

      <div className="hero__compass" ref={compassRef} aria-hidden="true">
        <div className="hero__compass-ring">
          <span className="hero__compass-label hero__compass-label--n">N</span>
          <span className="hero__compass-label hero__compass-label--e">E</span>
          <span className="hero__compass-label hero__compass-label--s">S</span>
          <span className="hero__compass-label hero__compass-label--w">W</span>
          <span className="hero__compass-tick hero__compass-tick--ne" />
          <span className="hero__compass-tick hero__compass-tick--se" />
          <span className="hero__compass-tick hero__compass-tick--sw" />
          <span className="hero__compass-tick hero__compass-tick--nw" />
        </div>
        <div className="hero__compass-needle" ref={needleRef}>
          <span className="hero__compass-needle-north" />
          <span className="hero__compass-needle-south" />
        </div>
        <span className="hero__compass-hub" />
      </div>
    </section>
  )
}

export default Hero
