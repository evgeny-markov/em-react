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

        gsap.utils.toArray<HTMLElement>('.work__item').forEach((item) => {
          gsap.from(item, {
            y: 40,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          })

          gsap.fromTo(
            item,
            { borderColor: 'rgba(247, 244, 255, 0.08)' },
            {
              borderColor: 'rgba(255, 122, 24, 0.45)',
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                end: 'top 35%',
                scrub: true,
              },
            },
          )
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
          <h2 className="page__title">Публичные релизы</h2>
          <p className="page__lead">
            Открытые маркетинговые и портальные релизы: AI/EdTech, ad tech, промо и корпоративные сайты.
            NDA и закрытые админки не раскрываю.
          </p>
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
                <div>
                  <p className="work__name">{project.name}</p>
                  <p className="work__meta">{project.meta}</p>
                </div>
                <span className="work__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Work
