import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { experience } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

function Experience() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.experience__head > *', {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
          },
        })

        gsap.utils.toArray<HTMLElement>('.experience__item').forEach((item, index) => {
          const fromX = index % 2 === 0 ? -48 : 48

          gsap.from(item, {
            x: fromX,
            y: 36,
            autoAlpha: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
            },
          })

          gsap.from(item.querySelectorAll('.experience__point'), {
            x: 16,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="page__section experience" id="experience" ref={rootRef}>
      <div className="page__container">
        <div className="experience__head">
          <p className="page__eyebrow">Опыт</p>
          <h2 className="page__title">6+ лет в digital и продукте</h2>
          <p className="page__lead">
            От агентской вёрстки и спецпроектов до студийных SPA/SSR, кабинетов и админок — с фокусом на
            качество UI и стабильный production.
          </p>
        </div>

        <ul className="experience__list">
          {experience.map((job) => (
            <li className="experience__item" key={job.company}>
              <div className="experience__meta">
                <h3 className="experience__role">{job.role}</h3>
                <p className="experience__company">{job.company}</p>
                <p className="experience__period">{job.period}</p>
              </div>
              <div className="experience__body">
                <p className="experience__summary">{job.summary}</p>
                <ul className="experience__points">
                  {job.points.map((point) => (
                    <li className="experience__point" key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Experience
