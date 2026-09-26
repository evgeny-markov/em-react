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

        gsap.utils.toArray<HTMLElement>('.skills__group').forEach((group, groupIndex) => {
          gsap.from(group.querySelector('.skills__group-title'), {
            y: 28,
            autoAlpha: 0,
            letterSpacing: '0.28em',
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
            },
          })

          const tags = group.querySelectorAll('.skills__tag')

          gsap.from(tags, {
            x: () => gsap.utils.random(-48, 48),
            y: () => gsap.utils.random(36, 72),
            rotate: () => gsap.utils.random(-18, 18),
            scale: 0.55,
            autoAlpha: 0,
            filter: 'blur(8px)',
            duration: 0.7,
            stagger: {
              each: 0.045,
              from: groupIndex % 2 === 0 ? 'start' : 'center',
            },
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
            },
            clearProps: 'filter',
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
