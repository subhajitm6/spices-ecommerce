import { ReactLenis } from 'lenis/react'

export default function SmoothScrollProvider({ children }) {
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
    smoothWheel: true,
    syncTouch: true,
    touchMultiplier: 1.5,
    wheelMultiplier: 0.9,
    infinite: false,
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  )
}
