import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { skillGroups } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

function Skills() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.skills__head > *', {
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

        gsap.utils.toArray<HTMLElement>('.skills__group').forEach((group) => {
          gsap.from(group, {
            y: 48,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
            },
          })

          gsap.from(group.querySelectorAll('.skills__tag'), {
            scale: 0.7,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
            },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="page__section skills" id="skills" ref={rootRef}>
      <div className="page__container">
        <div className="skills__head">
          <p className="page__eyebrow">Навыки</p>
          <h2 className="page__title">Стек и рабочие практики</h2>
          <p className="page__lead">
            Vue/Nuxt и TypeScript в основе; вокруг — GraphQL, анимации, линтеры и командный GitLab CI.
          </p>
        </div>

        <div className="skills__groups">
          {skillGroups.map((group) => (
            <div className="skills__group" key={group.title}>
              <h3 className="skills__group-title">{group.title}</h3>
              <ul className="skills__tags">
                {group.items.map((item) => (
                  <li className="skills__tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
