import { useEffect, useRef, useState } from 'react'

/** Counts from 0 to `end` once it scrolls into view. */
export default function CountUp({ end, suffix = '', prefix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(eased * end))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {prefix}{val}{suffix}
    </span>
  )
}
