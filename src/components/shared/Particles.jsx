import { useEffect, useRef, memo } from 'react'

const PARTICLE_COUNT = 25

/**
 * Gallery dust particles — slow sine-wave drift with breathing opacity.
 * Mimics real dust motes floating through a spotlight beam:
 *   - Gentle sinusoidal x/y movement (no straight lines)
 *   - Each particle has a unique phase seed for organic variety
 *   - Opacity pulses slowly, like catching and losing the light
 *   - Half the speed of the original linear motion
 */
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.2 + 0.3,
      /* Base drift — very slow */
      dx:    (Math.random() - 0.5) * 0.08,
      dy:    (Math.random() - 0.5) * 0.06,
      /* Sine parameters — unique per particle */
      seed:  Math.random() * Math.PI * 2,
      freqX: 0.0006 + Math.random() * 0.0008,
      freqY: 0.0004 + Math.random() * 0.0006,
      ampX:  0.12 + Math.random() * 0.18,
      ampY:  0.08 + Math.random() * 0.14,
      /* Opacity breathing */
      oBase: 0.02 + Math.random() * 0.03,
      oAmp:  0.01 + Math.random() * 0.025,
      oFreq: 0.001 + Math.random() * 0.002,
    }))

    let frame
    let t = 0

    const draw = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        /* Sine-wave drift replaces linear dx/dy */
        p.x += p.dx + Math.sin(t * p.freqX + p.seed) * p.ampX
        p.y += p.dy + Math.cos(t * p.freqY + p.seed) * p.ampY

        /* Wrap edges */
        if (p.x < -5)  p.x = W + 5
        if (p.x > W + 5) p.x = -5
        if (p.y < -5)  p.y = H + 5
        if (p.y > H + 5) p.y = -5

        /* Breathing opacity */
        const o = p.oBase + Math.sin(t * p.oFreq + p.seed) * p.oAmp

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240,232,220,${Math.max(0, o)})`
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)

    /* Handle resize */
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
      <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />
  )
}

export default memo(Particles)