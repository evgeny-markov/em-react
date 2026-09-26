import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import { site } from '@/data/content'

type HeroProps = {
  ready: boolean
}

const REVEAL =
  '.hero__signal, .hero__brand-line, .hero__rule, .hero__headline, .hero__text, .hero__cta, .hero__beacon'

function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const beaconRef = useRef<HTMLDivElement>(null)
  const satRef = useRef<HTMLSpanElement>(null)

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
            '.hero__beacon',
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

        gsap.to('.hero__beacon-ring--mid', {
          rotation: 360,
          duration: 28,
          ease: 'none',
          repeat: -1,
        })

        gsap.to('.hero__beacon-ring--inner', {
          rotation: -360,
          duration: 18,
          ease: 'none',
          repeat: -1,
        })

        gsap.to('.hero__beacon-core', {
          boxShadow: '0 0 22px rgba(255, 122, 24, 0.85), 0 0 40px rgba(196, 77, 255, 0.35)',
          scale: 1.12,
          duration: 1.6,
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

    const beacon = beaconRef.current
    const sat = satRef.current

    if (!beacon || !sat) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setRotation = gsap.quickTo(sat, 'rotation', {
      duration: reducedMotion ? 0 : 0.45,
      ease: 'power3.out',
    })

    const onPointerMove = (event: PointerEvent) => {
      const rect = beacon.getBoundingClientRect()
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

      <div className="hero__beacon" ref={beaconRef} aria-hidden="true">
        <span className="hero__beacon-ring hero__beacon-ring--outer" />
        <span className="hero__beacon-ring hero__beacon-ring--mid" />
        <span className="hero__beacon-ring hero__beacon-ring--inner" />
        <span className="hero__beacon-core" />
        <span className="hero__beacon-sat" ref={satRef}>
          <span className="hero__beacon-sat-body" />
        </span>
      </div>
    </section>
  )
}

export default Hero
