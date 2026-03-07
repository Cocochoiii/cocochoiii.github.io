import { useEffect, useRef, memo } from 'react'

const PARTICLE_COUNT = 25

/**
 * Lightweight floating particles canvas overlay.
 *
 * @param {object} [attractPoint] — { x: 0-1, y: 0-1 } normalized viewport position.
 *   Particles near this point slow down and drift toward it, creating
 *   a subtle gravitational pull (e.g. the eye on Experience page).
 */
function Particles({ attractPoint = null }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    /* Attract center in pixels */
    const ax = attractPoint ? attractPoint.x * canvas.width : -1
    const ay = attractPoint ? attractPoint.y * canvas.height : -1
    const ATTRACT_RADIUS = 200
    const ATTRACT_STRENGTH = 0.003

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.2 + 0.4,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      o:  Math.random() * 0.08 + 0.02,
    }))

    let frame

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        /* Gravity toward attract point */
        if (attractPoint) {
          const ddx = ax - p.x
          const ddy = ay - p.y
          const dist = Math.sqrt(ddx * ddx + ddy * ddy)
          if (dist < ATTRACT_RADIUS && dist > 1) {
            const force = ATTRACT_STRENGTH * (1 - dist / ATTRACT_RADIUS)
            p.dx += (ddx / dist) * force
            p.dy += (ddy / dist) * force
            /* Dampen near center so they don't cluster */
            p.dx *= 0.995
            p.dy *= 0.995
          }
        }

        p.x += p.dx
        p.y += p.dy

        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,232,220,${p.o})`
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [attractPoint])

  return (
      <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
  )
}

export default memo(Particles)