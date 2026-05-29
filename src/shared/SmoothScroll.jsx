import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

/**
 * Global Lenis smooth scrolling. Mounted once in App.
 * - Disables itself when the user prefers reduced motion.
 * - Resets to top on every route change (works with the page transitions).
 * Exposes the instance on window.__lenis so concept layouts can pause/resume.
 */
export default function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  // reset scroll on navigation (Lenis-aware, falls back to window)
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
