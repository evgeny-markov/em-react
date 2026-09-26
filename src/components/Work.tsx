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
          y: 44,
          autoAlpha: 0,
          filter: 'blur(12px)',
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
          },
          clearProps: 'filter',
        })

        ScrollTrigger.batch('.work__item', {
          start: 'top 88%',
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              {
                y: 64,
                autoAlpha: 0,
                rotateX: 28,
                scale: 0.9,
                filter: 'blur(14px)',
                transformOrigin: '50% 100%',
              },
              {
                y: 0,
                autoAlpha: 1,
                rotateX: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: 'auto',
                clearProps: 'filter',
              },
            )

            gsap.fromTo(
              batch.map((el) => el.querySelector('.work__orbit')).filter(Boolean),
              { scale: 0, autoAlpha: 0 },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.55,
                stagger: 0.1,
                delay: 0.2,
                ease: 'back.out(2)',
                overwrite: 'auto',
              },
            )
          },
          once: true,
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
