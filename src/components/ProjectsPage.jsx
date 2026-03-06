import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import NavOverlay from './NavOverlay'
import ArtCard from './cards/ArtCard'
import useIsMobile from '../hooks/useIsMobile'
import { PAL } from '../constants/theme'
import { PROJECTS } from '../constants/data'

export default function ProjectsPage({ go }) {
  const m = useIsMobile()
  const canvasRef = useRef(null)

  /* Rive — Warhol animation (plays on both mobile & desktop) */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let r = null
    import('@rive-app/canvas').then((rive) => {
      const dpr = window.devicePixelRatio || 1
      const cW = m ? window.innerWidth : window.innerWidth * 0.4
      const H = m ? window.innerWidth : window.innerHeight
      canvas.width = cW * dpr
      canvas.height = H * dpr
      canvas.style.width = cW + 'px'
      canvas.style.height = H + 'px'
      r = new rive.Rive({
                          src: '/warhol.riv', canvas, artboard: 'New Artboard',
                          animations: 'Animation 1', autoplay: true,
                          layout: new rive.Layout({ fit: rive.Fit.Cover, alignment: rive.Alignment.Center }),
                          onLoad: () => r.resizeDrawingSurfaceToCanvas(),
                        })
    }).catch(() => {})
    return () => { if (r) r.cleanup() }
  }, [m])

  /* Entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.wart', { opacity: 0, x: m ? 0 : -100, y: m ? -20 : 0, filter: 'blur(14px)' }, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 1.1, delay: 0.15 })
    tl.fromTo('.proj-left', { opacity: 0, x: m ? -20 : -60, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 }, '-=0.6')
    tl.fromTo('.proj-right', { opacity: 0, x: m ? 20 : 60, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 }, '-=0.85')
    tl.fromTo('.proj-wide', { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.9')
    return () => tl.kill()
  }, [m])

  /* ── MOBILE ── */
  if (m) {
    return (
        <div style={{ width: '100vw', height: '100vh', background: PAL.grey, position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}>
            {/* Warhol Rive header — full width, animated */}
            <div className="wart" style={{ width: '100%', aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', opacity: 0 }}>
              <canvas ref={canvasRef} style={{ display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 5 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 7, color: '#c9a96e', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Selected</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 800, color: '#f0e8dc', lineHeight: 1.05, letterSpacing: -0.5 }}>Projects</h2>
              </div>
            </div>

            {/* Cards 2-col grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '15vw', gap: 4, padding: '4px 4px 10px' }}>
              {PROJECTS.map((p, i) => (
                  <ArtCard key={i} p={p} className={i % 2 === 0 ? 'proj-left' : 'proj-right'} style={{ opacity: 0 }} compact />
              ))}
            </div>
          </div>
          <button className="page-back" onClick={() => go('home')} style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', zIndex: 100 }}>←</button>
          <NavOverlay go={go} current="projects" dark />
        </div>
    )
  }

  /* ── DESKTOP ── */
  return (
      <div style={{ width: '100vw', height: '100vh', background: PAL.grey, position: 'relative', overflow: 'hidden', display: 'flex' }}>
        <div className="wart" style={{ width: '40%', flexShrink: 0, overflow: 'hidden', opacity: 0, position: 'relative', zIndex: 1 }}>
          <canvas ref={canvasRef} style={{ display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 14, right: 14, zIndex: 5 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 10, color: '#c9a96e', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Selected</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 800, color: '#f0e8dc', lineHeight: 1.05, letterSpacing: -1 }}>Projects</h2>
            <div style={{ width: 20, height: 1, background: '#c9a96e', marginTop: 7, borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1.15fr 0.55fr 1fr 1.3fr', gap: 4, padding: 4, height: '100vh', zIndex: 1 }}>
          <ArtCard p={PROJECTS[0]} className="proj-left" style={{ gridColumn: '1', gridRow: '1', opacity: 0 }} />
          <ArtCard p={PROJECTS[1]} className="proj-right" style={{ gridColumn: '2', gridRow: '1', opacity: 0 }} />
          <ArtCard p={PROJECTS[2]} className="proj-wide" style={{ gridColumn: '1 / 3', gridRow: '2', opacity: 0 }} />
          <ArtCard p={PROJECTS[3]} className="proj-left" style={{ gridColumn: '1', gridRow: '3', opacity: 0 }} />
          <ArtCard p={PROJECTS[4]} className="proj-right" style={{ gridColumn: '2', gridRow: '3', opacity: 0 }} />
          <ArtCard p={PROJECTS[5]} className="proj-left" style={{ gridColumn: '1', gridRow: '4', opacity: 0 }} />
          <div style={{ gridColumn: '2', gridRow: '4', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ArtCard p={PROJECTS[6]} className="proj-right" style={{ flex: 1, opacity: 0 }} compact />
            <ArtCard p={PROJECTS[7]} className="proj-right" style={{ flex: 1, opacity: 0 }} compact />
          </div>
        </div>
        <button className="page-back" onClick={() => go('home')} style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', zIndex: 100 }}>←</button>
        <NavOverlay go={go} current="projects" dark />
      </div>
  )
}