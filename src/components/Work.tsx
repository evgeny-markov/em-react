import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { projects } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

function Work() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.work__head > *', {
          y: 36,
          autoAlpha: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
          },
        })

        gsap.from('.work__item', {
          y: 48,
          autoAlpha: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.work__list',
            start: 'top 82%',
          },
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="page__section work" id="work" ref={rootRef}>
      <div className="page__container">
        <div className="work__head">
          <p className="page__eyebrow">Проекты</p>
          <h2 className="page__title">Публичные проекты из продакшена</h2>
        </div>

        <ul className="work__list">
          {projects.map((project) => (
            <li className="work__item" key={project.href}>
              <a
                className="work__link"
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="work__body">
                  <p className="work__name">{project.name}</p>
                  <p className="work__meta">{project.meta}</p>
                </div>
                <div className="work__footer">
                  <span className="work__orbit" aria-hidden="true" />
                  <span className="work__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Work
