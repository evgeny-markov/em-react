import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { site } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.contact__panel', {
          y: 64,
          autoAlpha: 0,
          scale: 0.94,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 82%',
          },
        })

        gsap.from('.contact__panel > *', {
          y: 24,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact__panel',
            start: 'top 78%',
          },
        })

        gsap.to('.contact__panel', {
          boxShadow: '0 0 60px rgba(255, 122, 24, 0.22), 0 0 120px rgba(196, 77, 255, 0.16)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact__panel',
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section className="page__section contact" id="contact" ref={rootRef}>
      <div className="page__container">
        <div className="contact__panel">
          <div>
            <p className="page__eyebrow">Контакт</p>
            <h2 className="contact__title">Давайте сделаем следующий интерфейс</h2>
            <p className="contact__text">
              {site.availability}. Открыт к сильным frontend-ролям вокруг Vue/Nuxt/TypeScript и
              продуктовых UI.
            </p>
          </div>
          <div className="contact__actions">
            <a
              className="contact__link"
              href={site.telegramUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Написать в Telegram
            </a>
            <a
              className="contact__link contact__link--ghost"
              href={site.hhUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Профиль hh.ru
            </a>
          </div>
        </div>
        <p className="contact__note">{site.availability}</p>
      </div>
    </section>
  )
}

export default Contact
