import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { site } from '@/data/content'
import { dockIn, fadeUp, withMotion } from '@/lib/motion'

function Contact() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () =>
      withMotion(() => {
        dockIn('.contact__panel', {
          trigger: rootRef.current,
          y: 80,
          blur: 16,
          scale: 0.88,
          rotateX: 18,
          duration: 1.15,
          stagger: 0,
        })

        fadeUp('.contact__panel > *', {
          trigger: '.contact__panel',
          start: 'top 78%',
          y: 28,
          stagger: 0.14,
          duration: 0.8,
        })

        fadeUp('.contact__note', {
          trigger: '.contact__note',
          start: 'top 92%',
          y: 20,
          duration: 0.7,
        })

        gsap.fromTo(
          '.contact__panel',
          { boxShadow: '0 0 0 1px rgba(196, 77, 255, 0.12)' },
          {
            boxShadow: '0 0 60px rgba(255, 122, 24, 0.22), 0 0 120px rgba(196, 77, 255, 0.16)',
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      }),
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
              Telegram
            </a>
            <a
              className="contact__link contact__link--ghost"
              href={site.hhUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Резюме
            </a>
            <a
              className="contact__link contact__link--ghost"
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="contact__note">{site.availability}</p>
      </div>
    </section>
  )
}

export default Contact
