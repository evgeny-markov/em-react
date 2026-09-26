import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { projects } from '@/data/content'
import { dockIn, warpReveal, withMotion } from '@/lib/motion'

function Work() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () =>
      withMotion(() => {
        warpReveal('.work__head > *', {
          trigger: rootRef.current,
        })

        dockIn('.work__item', {
          trigger: '.work__list',
        })

        gsap.set('.work__orbit', { scale: 0, autoAlpha: 0 })
        gsap.to('.work__orbit', {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.1,
          delay: 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.work__list',
            start: 'top 82%',
          },
        })
      }),
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
