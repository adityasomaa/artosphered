import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scroll-reveal: adds `.is-visible` to any element carrying [data-reveal]
 * once it enters the viewport. Re-scans on every route change so freshly
 * mounted pages animate in too. Pure IntersectionObserver — no deps,
 * respects prefers-reduced-motion via CSS.
 */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.revealDelay
            if (delay) el.style.transitionDelay = `${delay}ms`
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
