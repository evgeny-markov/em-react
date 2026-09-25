import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { site } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about__reveal', {
          y: 56,
          autoAlpha: 0,
          rotateX: 12,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 78%',
          },
        })

        gsap.from('.about__stat', {
          y: 40,
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.85,
          ease: 'back.out(1.4)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 82%',
          },
        })

        gsap.utils.toArray<HTMLElement>('.about__stat-value').forEach((el) => {
          const raw = el.dataset.value ?? el.textContent ?? '0'
          const numeric = Number.parseFloat(raw.replace(/[^\d.]/g, ''))
          const suffix = raw.replace(/[\d.\s]/g, '')

          if (Number.isNaN(numeric)) {
            return
          }

          const counter = { value: 0 }

          gsap.to(counter, {
            value: numeric,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`
            },
          })
        })

        gsap.to('.about__orbit', {
          rotate: 360,
          duration: 40,
          ease: 'none',
          repeat: -1,
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="page__section about" id="about" ref={rootRef}>
      <div className="about__orbit" aria-hidden="true" />
      <div className="page__container about__grid">
        <div className="about__copy">
          <p className="page__eyebrow about__reveal">Обо мне</p>
          <h2 className="page__title about__reveal">Интерфейсы, которые держат нагрузку продукта</h2>
          <p className="page__lead about__reveal">{site.about}</p>
        </div>

        <div className="about__stats">
          {site.stats.map((stat) => (
            <div className="about__stat" key={stat.label}>
              <p className="about__stat-value" data-value={stat.value}>
                {stat.value}
              </p>
              <p className="about__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
