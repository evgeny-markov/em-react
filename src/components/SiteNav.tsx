import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { navLinks, site } from '@/data/content'

type SiteNavProps = {
  ready: boolean
}

function SiteNav({ ready }: SiteNavProps) {
  const rootRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useGSAP(
    () => {
      if (!ready) {
        gsap.set(rootRef.current, { autoAlpha: 0 })
        return
      }

      gsap.fromTo(
        rootRef.current,
        { y: -16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', delay: 0.15 },
      )
    },
    { scope: rootRef, dependencies: [ready], revertOnUpdate: true },
  )

  useGSAP(
    () => {
      const panel = panelRef.current

      if (!panel) {
        return
      }

      const links = panel.querySelectorAll('.nav__link')
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isVisible = gsap.getProperty(panel, 'display') !== 'none'

      if (isOpen) {
        gsap.set(panel, { display: 'grid' })
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(
            panel,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: reducedMotion ? 0.01 : 0.35 },
          )
          .fromTo(
            links,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: reducedMotion ? 0.01 : 0.55,
              stagger: reducedMotion ? 0 : 0.07,
            },
            reducedMotion ? 0 : 0.08,
          )
        return
      }

      if (!isVisible) {
        gsap.set(panel, { display: 'none', autoAlpha: 0 })
        gsap.set(links, { autoAlpha: 0 })
        return
      }

      gsap.to(links, {
        y: 12,
        autoAlpha: 0,
        duration: reducedMotion ? 0.01 : 0.2,
        stagger: reducedMotion ? 0 : 0.03,
        ease: 'power2.in',
      })
      gsap.to(panel, {
        autoAlpha: 0,
        duration: reducedMotion ? 0.01 : 0.28,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(panel, { display: 'none' })
        },
      })
    },
    { dependencies: [isOpen], scope: rootRef },
  )

  useEffect(() => {
    document.body.classList.toggle('is-nav-open', isOpen)

    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('is-nav-open')
    }
  }, [isOpen])

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen((open) => !open)
  }

  return (
    <nav className={`nav${isOpen ? ' is-open' : ''}`} ref={rootRef} aria-label="Основная навигация">
      <div className="nav__bar">
        <a className="nav__brand" href="#top" onClick={closeMenu}>
          {site.brandShort}
        </a>

        <button
          className="nav__burger"
          type="button"
          aria-expanded={isOpen}
          aria-controls="nav-panel"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={toggleMenu}
        >
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
          <span className="nav__burger-line" />
        </button>
      </div>

      <div className="nav__panel" id="nav-panel" ref={panelRef}>
        <button className="nav__panel-close-area" type="button" aria-label="Закрыть меню" onClick={closeMenu} />
        <ul className="nav__list">
          {navLinks.map((link, index) => (
            <li className="nav__item" key={link.href}>
              <a className="nav__link" href={link.href} onClick={closeMenu}>
                <span className="nav__link-index">0{index + 1}</span>
                <span className="nav__link-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default SiteNav
