import { useEffect, useRef, useState } from 'react'

/**
 * Adds a `is-revealed` class when the element enters the viewport.
 * Respects prefers-reduced-motion: elements are revealed immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number
  rootMargin?: string
}) {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const revealNow = () => {
      setRevealed(true)
      el.classList.add('is-revealed')
    }
    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      revealNow()
      return
    }
    if (typeof IntersectionObserver === 'undefined') {
      revealNow()
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealNow()
            observer.disconnect()
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? '0px 0px -6% 0px',
      },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, revealed }
}
