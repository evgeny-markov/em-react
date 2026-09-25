import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'

gsap.registerPlugin(useGSAP)

type PageLoaderProps = {
  onComplete: () => void
}

function PageLoader({ onComplete }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useGSAP(
    () => {
      const bar = barRef.current
      const root = rootRef.current

      if (!bar || !root) {
        return
      }

      const progress = { value: 0 }

      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            gsap.to(root, {
              autoAlpha: 0,
              duration: 0.65,
              ease: 'power3.inOut',
              onComplete,
            })
          },
        })
        .from('.loader__label', { autoAlpha: 0, y: 10, duration: 0.45 }, 0)
        .from('.loader__percent', { autoAlpha: 0, y: 16, duration: 0.5 }, 0.08)
        .to(
          progress,
          {
            value: 100,
            duration: 2.2,
            ease: 'power1.inOut',
            onUpdate: () => {
              setPercent(Math.round(progress.value))
            },
          },
          0.1,
        )
        .fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 2.2, ease: 'power1.inOut' },
          0.1,
        )
    },
    { scope: rootRef },
  )

  return (
    <div className="loader" ref={rootRef} aria-live="polite" aria-busy="true">
      <div className="loader__inner">
        <div className="loader__meta">
          <p className="loader__label">Entering orbit</p>
          <p className="loader__percent">{percent}%</p>
          <div className="loader__bar" aria-hidden="true">
            <div className="loader__bar-fill" ref={barRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
