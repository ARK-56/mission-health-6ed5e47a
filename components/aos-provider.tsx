'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'

/**
 * Initialises AOS once and refreshes it on navigation. Without the refresh,
 * sections rendered after a client-side route change keep AOS's initial hidden
 * state and never animate in.
 *
 * Animation is skipped entirely for anyone who has asked for reduced motion.
 */
export function AosProvider() {
  const pathname = usePathname()

  useEffect(() => {
    AOS.init({
      duration: 1150,
      delay: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  useEffect(() => {
    AOS.refreshHard()
  }, [pathname])

  return null
}
