import { useEffect, useState } from 'react'

import About from '@/components/About'
import Contact from '@/components/Contact'
import Experience from '@/components/Experience'
import Hero from '@/components/Hero'
import PageLoader from '@/components/PageLoader'
import SiteNav from '@/components/SiteNav'
import Skills from '@/components/Skills'
import SpaceBackground from '@/components/SpaceBackground'
import Work from '@/components/Work'

function scrollToTop() {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.style.scrollBehavior = previous
}

function App() {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    scrollToTop()

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        scrollToTop()
      }
    }

    window.addEventListener('pageshow', onPageShow)

    return () => {
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', showLoader)

    return () => {
      document.body.classList.remove('is-loading')
    }
  }, [showLoader])

  const handleLoaderComplete = () => {
    scrollToTop()
    setShowLoader(false)
    setReady(true)
  }

  return (
    <div className="page">
      {showLoader ? <PageLoader onComplete={handleLoaderComplete} /> : null}
      <SpaceBackground active={ready} />
      <SiteNav ready={ready} />
      <main className="page__main">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
