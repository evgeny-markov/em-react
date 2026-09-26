import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE_OUT = 'power3.out'

type ScrollOpts = {
  trigger?: gsap.DOMTarget | null
  start?: string
}

type WarpRevealOpts = ScrollOpts & {
  y?: number
  blur?: number
  stagger?: number
  duration?: number
  rotateX?: number
  transformOrigin?: string
  /** Скрыть сразу, чтобы не было вспышки до ScrollTrigger */
  hideFirst?: boolean
}

type DockInOpts = ScrollOpts & {
  y?: number
  blur?: number
  stagger?: number
  duration?: number
  scale?: number
  rotateX?: number
  hideFirst?: boolean
}

type FadeUpOpts = ScrollOpts & {
  y?: number
  stagger?: number
  duration?: number
  ease?: string
  delay?: number
}

/** Scroll-анимации только без prefers-reduced-motion */
export function withMotion(setup: () => void): () => void {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', setup)

  return () => mm.revert()
}

/** Появление «из варпа»: blur + сдвиг вверх */
export function warpReveal(targets: gsap.TweenTarget, options: WarpRevealOpts = {}) {
  const {
    trigger,
    start = 'top 75%',
    y = 44,
    blur = 12,
    stagger = 0.1,
    duration = 0.95,
    rotateX,
    transformOrigin,
    hideFirst = true,
  } = options

  const fromVars: gsap.TweenVars = {
    y,
    autoAlpha: 0,
    filter: `blur(${blur}px)`,
  }

  if (rotateX != null) {
    fromVars.rotateX = rotateX
  }

  if (transformOrigin) {
    fromVars.transformOrigin = transformOrigin
  }

  const toVars: gsap.TweenVars = {
    y: 0,
    autoAlpha: 1,
    filter: 'blur(0px)',
    duration,
    stagger,
    ease: EASE_OUT,
    clearProps: 'filter',
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
    },
  }

  if (rotateX != null) {
    toVars.rotateX = 0
  }

  if (hideFirst) {
    gsap.set(targets, fromVars)
    return gsap.to(targets, toVars)
  }

  return gsap.from(targets, {
    ...fromVars,
    duration,
    stagger,
    ease: EASE_OUT,
    clearProps: 'filter',
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
    },
  })
}

/** Стыковка «с глубины»: rotateX + scale + blur */
export function dockIn(targets: gsap.TweenTarget, options: DockInOpts = {}) {
  const {
    trigger,
    start = 'top 82%',
    y = 64,
    blur = 14,
    stagger = 0.1,
    duration = 0.9,
    scale = 0.9,
    rotateX = 28,
    hideFirst = true,
  } = options

  const fromVars: gsap.TweenVars = {
    y,
    autoAlpha: 0,
    rotateX,
    scale,
    filter: `blur(${blur}px)`,
    transformOrigin: '50% 100%',
  }

  const toVars: gsap.TweenVars = {
    y: 0,
    autoAlpha: 1,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    duration,
    stagger,
    ease: EASE_OUT,
    clearProps: 'filter',
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
    },
  }

  if (hideFirst) {
    gsap.set(targets, fromVars)
    return gsap.to(targets, toVars)
  }

  return gsap.from(targets, {
    ...fromVars,
    duration,
    stagger,
    ease: EASE_OUT,
    clearProps: 'filter',
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
    },
  })
}

/** Простое появление снизу без blur */
export function fadeUp(targets: gsap.TweenTarget, options: FadeUpOpts = {}) {
  const {
    trigger,
    start = 'top 85%',
    y = 24,
    stagger,
    duration = 0.75,
    ease = 'power2.out',
    delay,
  } = options

  return gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration,
    stagger,
    ease,
    delay,
    scrollTrigger: {
      trigger: trigger ?? undefined,
      start,
    },
  })
}
