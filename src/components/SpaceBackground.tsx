import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SpaceBackgroundProps = {
  active: boolean
}

type Vec3 = {
  x: number
  y: number
  z: number
}

type Star = {
  x: number
  y: number
  z: number
  px: number
  py: number
  pz: number
  tone: 0 | 1 | 2 | 3
}

const STAR_COUNT = 320
const SPREAD = 1000
const COLORS = ['#f7f4ff', '#ffb347', '#c44dff', '#2de2e6'] as const
const FOG = 'rgba(4, 1, 10, 0.4)'
const BG = '#04010a'

const SECTION_FLOW: Array<{ selector: string; dir: Vec3 }> = [
  { selector: '#top', dir: { x: 0, y: 0, z: -1 } },
  { selector: '#about', dir: { x: -0.85, y: 0.1, z: -0.55 } },
  { selector: '#experience', dir: { x: 0.15, y: -0.9, z: -0.45 } },
  { selector: '#work', dir: { x: 0.9, y: 0.05, z: -0.5 } },
  { selector: '#skills', dir: { x: -0.2, y: 0.25, z: 1 } },
  { selector: '#contact', dir: { x: 0.35, y: 0.75, z: -0.6 } },
]

function createStar(far = true): Star {
  const z = far ? Math.random() * SPREAD : SPREAD * (0.72 + Math.random() * 0.28)

  return {
    x: (Math.random() - 0.5) * SPREAD,
    y: (Math.random() - 0.5) * SPREAD,
    z,
    px: 0,
    py: 0,
    pz: z,
    tone: (Math.random() < 0.78 ? 0 : 1 + Math.floor(Math.random() * 3)) as Star['tone'],
  }
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1

  return { x: v.x / len, y: v.y / len, z: v.z / len }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function SpaceBackground({ active }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d', { alpha: false })

    if (!ctx) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => createStar())
    const currentDir = { ...SECTION_FLOW[0].dir }
    const targetDir = { ...SECTION_FLOW[0].dir }

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let running = false
    const baseSpeed = reducedMotion ? 0.15 : 1.0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const resetStar = (star: Star, dir: Vec3) => {
      const next = createStar(false)
      // spawn opposite to travel direction
      star.x = next.x - dir.x * SPREAD * 0.35
      star.y = next.y - dir.y * SPREAD * 0.35
      star.z = dir.z < 0 ? SPREAD * (0.75 + Math.random() * 0.25) : 40 + Math.random() * 120
      star.px = star.x
      star.py = star.y
      star.pz = star.z
      star.tone = next.tone
    }

    const paint = (move: boolean) => {
      const cx = width * 0.5
      const cy = height * 0.5
      const focal = Math.max(width, height) * 0.55
      const speed = move ? baseSpeed : 0

      if (move) {
        currentDir.x = lerp(currentDir.x, targetDir.x, 0.045)
        currentDir.y = lerp(currentDir.y, targetDir.y, 0.045)
        currentDir.z = lerp(currentDir.z, targetDir.z, 0.045)
      }

      const dir = normalize(currentDir)

      ctx.fillStyle = move ? FOG : BG
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i]

        star.px = star.x
        star.py = star.y
        star.pz = star.z

        if (move) {
          star.x += dir.x * speed * 7.5
          star.y += dir.y * speed * 7.5
          star.z += dir.z * speed * 5.2
        }

        if (star.z <= 1 || star.z > SPREAD * 1.35 || Math.abs(star.x) > SPREAD || Math.abs(star.y) > SPREAD) {
          resetStar(star, dir)
          continue
        }

        const sx = cx + (star.x / star.z) * focal
        const sy = cy + (star.y / star.z) * focal
        const px = cx + (star.px / star.pz) * focal
        const py = cy + (star.py / star.pz) * focal

        if (
          (sx < -60 && px < -60) ||
          (sy < -60 && py < -60) ||
          (sx > width + 60 && px > width + 60) ||
          (sy > height + 60 && py > height + 60)
        ) {
          if (move) {
            resetStar(star, dir)
          }
          continue
        }

        const depth = 1 - star.z / SPREAD
        const trail = Math.max(0, depth * depth)

        ctx.beginPath()
        ctx.strokeStyle = COLORS[star.tone]
        ctx.globalAlpha = 0.2 + trail * 0.8
        ctx.lineWidth = 0.5 + trail * 2.8
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()

        if (trail > 0.48) {
          ctx.beginPath()
          ctx.globalAlpha = 0.95
          ctx.fillStyle = COLORS[star.tone]
          ctx.arc(sx, sy, 0.5 + trail * 1.55, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
    }

    const tick = () => {
      if (!running) {
        return
      }

      paint(true)
      raf = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(raf)
    }

    const start = () => {
      if (running || document.hidden || !active) {
        return
      }

      running = true
      raf = window.requestAnimationFrame(tick)
    }

    const setDirection = (dir: Vec3) => {
      const next = normalize(dir)
      targetDir.x = next.x
      targetDir.y = next.y
      targetDir.z = next.z
    }

    const triggers = SECTION_FLOW.map((section) =>
      ScrollTrigger.create({
        trigger: section.selector,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setDirection(section.dir),
        onEnterBack: () => setDirection(section.dir),
      }),
    )

    resize()
    stars.forEach((star) => {
      star.px = star.x
      star.py = star.y
      star.pz = star.z
    })
    paint(false)

    const onVisibility = () => {
      if (document.hidden) {
        stop()
        return
      }

      start()
    }

    const onResize = () => {
      resize()
      if (!running) {
        paint(false)
      }
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      triggers.forEach((trigger) => trigger.kill())
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active])

  return <canvas className="space-bg" ref={canvasRef} aria-hidden="true" />
}

export default SpaceBackground
