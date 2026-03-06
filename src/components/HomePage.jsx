import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

import NavOverlay from './NavOverlay'
import useTypewriter from '../hooks/useTypewriter'
import useIsMobile from '../hooks/useIsMobile'
import { playNote, bgMusic } from '../utils/audio'
import { TYPEWRITER_TITLES, HOME_ZONES, SOCIALS } from '../constants/data'

const GitHubIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>)
const LinkedInIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>)
const EmailIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>)
const SOCIAL_ICONS = [<GitHubIcon />, <LinkedInIcon />, <EmailIcon />]

const DEFAULT_MSG_DESKTOP = 'Click on the objects\non my piano to explore'
const DEFAULT_MSG_MOBILE = 'Tap the objects\non my piano to explore'

export default function HomePage({ go }) {
  const m = useIsMobile()

  /*
   * On desktop: oversized wrapper fills beyond viewport edges for parallax.
   * On mobile: wrapper is forced to landscape ratio (160vw × 100vw) so the
   * hot-zone % positions match the Rive artboard exactly like desktop.
   * The wrapper is then centered vertically within the portrait viewport.
   */
  const SCALE = 1.55

  const canvasRef   = useRef(null)
  const parallaxRef = useRef(null)
  const riveRef     = useRef(null)

  const defaultMsg = m ? DEFAULT_MSG_MOBILE : DEFAULT_MSG_DESKTOP
  const [dialogue, setDialogue]       = useState(defaultMsg)
  const [hovered, setHovered]         = useState(null)
  const [musicOn, setMusicOn]         = useState(false)
  const [mouse, setMouse]             = useState({ x: -999, y: -999 })
  const [hintVisible, setHintVisible] = useState(true)

  const { displayed, start: startTyping } = useTypewriter(TYPEWRITER_TITLES)
  const zones = HOME_ZONES(musicOn)

  /* Mouse parallax — desktop only */
  useEffect(() => {
    if (m) return
    const fn = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
      gsap.to(parallaxRef.current, {
        x: (e.clientX / window.innerWidth - 0.5) * 25,
        y: (e.clientY / window.innerHeight - 0.5) * 25,
        duration: 1.2, ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [m])

  /* Rive init — use same scale for both, but size based on wrapper */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    import('@rive-app/canvas').then((rive) => {
      const dpr = window.devicePixelRatio || 1
      let W, H
      if (m) {
        // Landscape wrapper matching desktop ratio — 210vh × 130vh
        W = window.innerHeight * 2.1
        H = window.innerHeight * 1.3
      } else {
        W = window.innerWidth * SCALE
        H = window.innerHeight * SCALE
      }
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      const r = new rive.Rive({
        src: '/piano.riv', canvas, artboard: 'Bye Quincy',
        stateMachines: 'State Machine 1', autoplay: true,
        layout: new rive.Layout({ fit: rive.Fit.Cover, alignment: rive.Alignment.Center }),
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas()
          const inputs = r.stateMachineInputs('State Machine 1')
          const roll = inputs?.find((i) => i.name === 'roll')
          if (roll) setTimeout(() => { roll.value = true }, 800)
        },
      })
      riveRef.current = r
    })
    return () => { if (riveRef.current) riveRef.current.cleanup(); riveRef.current = null }
  }, [m])

  /* Entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.to('.reveal-mask', { opacity: 1, duration: 1.5, delay: 0.4 })
    tl.to('.hname', { opacity: 1, y: 0, duration: 0.5 }, '-=0.8')
    tl.to('.piano-key-letter', { opacity: 1, y: 0, duration: 0.35, stagger: 0.07, ease: 'back.out(2.5)' }, '-=0.3')
    tl.to('.hsocials', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    tl.to('.hsub2', { opacity: 1, y: 0, duration: 0.9, onComplete: startTyping }, '-=0.5')
    tl.to('.dial', { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
    tl.to('.hot', { opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3')
    return () => tl.kill()
  }, [startTyping])

  const dismissHint = useCallback(() => {
    if (hintVisible) { setHintVisible(false); gsap.to('.discover-hint', { opacity: 0, y: -10, duration: 0.4 }) }
  }, [hintVisible])

  const toggleMusic = useCallback(() => {
    if (!bgMusic) { setDialogue("No music file yet!\nAdd music.mp3 to /public/"); return }
    if (musicOn) { bgMusic.pause(); setMusicOn(false); setDialogue('Music paused 🎵') }
    else { bgMusic.play(); setMusicOn(true); setDialogue('🎶 Enjoy the music!') }
  }, [musicOn])

  const handleZoneEnter = useCallback((z) => {
    setHovered(z.id); setDialogue(z.msg); dismissHint(); playNote(z.freq, 0.4)
  }, [dismissHint])

  const handleZoneLeave = useCallback(() => {
    setHovered(null); setDialogue(defaultMsg)
  }, [defaultMsg])

  const handleZoneClick = useCallback((z) => {
    if (m) { setDialogue(z.msg); dismissHint(); playNote(z.freq, 0.4) }
    setTimeout(() => {
      if (z.nav === '_music') toggleMusic()
      else if (z.nav) { playNote(z.freq * 1.5, 0.8); go(z.nav) }
      else window.open('#', '_blank')
    }, m ? 200 : 0)
  }, [toggleMusic, go, m, dismissHint])

  const handleLetterHover = useCallback((e, i) => {
    playNote(261.6 * (1 + i * 0.1), 0.3)
    gsap.to(e.currentTarget, { y: 5, scaleY: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
  }, [])

  /*
   * MOBILE wrapper: landscape-locked at 160vw × 100vw, centered vertically.
   * This ensures hot-zone % positions land on the same Rive objects as desktop.
   *
   * DESKTOP wrapper: original oversized parallax wrapper.
   */
  const desktopOffset = ((SCALE - 1) / 2) * 100 + 8

  const wrapperStyle = m
    ? {
        position: 'absolute',
        width: '210vh', height: '130vh',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }
    : {
        position: 'absolute',
        top: `-${desktopOffset}%`,
        left: `-${((SCALE - 1) / 2) * 100}%`,
        width: `${SCALE * 100}%`,
        height: `${SCALE * 100}%`,
        zIndex: 1,
      }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#E37B88' }}>
      <div className="noise-overlay" />
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .noise-overlay { position: fixed; inset: 0; z-index: 99; pointer-events: none; opacity: 0.045; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .social-icon { display: flex; align-items: center; justify-content: center; width: ${m ? 20 : 24}px; height: ${m ? 20 : 24}px; border-radius: 50%; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); cursor: pointer; transition: all 0.4s cubic-bezier(0.25,0,0,1); backdrop-filter: blur(8px); text-decoration: none; }
        .social-icon:hover { background: rgba(255,255,255,1); color: #E37B88; transform: translateY(-3px) scale(1.1); }
      `}</style>

      {/* BG text spotlight — desktop only */}
      {!m && (
        <div className="reveal-mask" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-5vh)', WebkitMaskImage: `radial-gradient(circle 110px at ${mouse.x}px ${mouse.y}px, black 15%, transparent 100%)`, maskImage: `radial-gradient(circle 110px at ${mouse.x}px ${mouse.y}px, black 15%, transparent 100%)` }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 12vw, 85px)', fontWeight: 900, color: '#c4606c', textAlign: 'center', whiteSpace: 'nowrap', letterSpacing: -2 }}>
            <div>CREATIVE</div><div>SOFTWARE</div><div>ENGINEER</div>
          </div>
        </div>
      )}

      {/* Piano Rive wrapper — landscape-locked on mobile */}
      <div ref={parallaxRef} style={wrapperStyle}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, display: 'block' }} />

        {/* Hot zones — same % positions, work on both mouse & touch */}
        {zones.map((z) => (
          <div key={z.id} className="hot" style={{
            position: 'absolute', top: z.top, left: z.left,
            transform: 'translate(-50%, -50%)',
            width: m ? Math.max(z.w, 44) : z.w,
            height: m ? Math.max(z.h, 44) : z.h,
            borderRadius: z.r, cursor: 'pointer', zIndex: 10, opacity: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={() => handleZoneEnter(z)}
            onMouseLeave={handleZoneLeave}
            onClick={() => handleZoneClick(z)}
          >
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)', opacity: hovered === z.id ? 1 : 0, transition: 'all 0.5s ease' }} />
            {!m && <div style={{ position: 'absolute', bottom: -26, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 12, color: 'white', opacity: hovered === z.id ? 1 : 0, transition: '0.3s', whiteSpace: 'nowrap' }}>{z.label}</div>}
            {/* Mobile: show label on tap */}
            {m && hovered === z.id && <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontFamily: "'DM Sans', sans-serif", fontSize: 7, fontWeight: 700, color: 'white', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 10, whiteSpace: 'nowrap' }}>{z.label}</div>}
          </div>
        ))}

        {/* Dialogue bubble — desktop only inside wrapper */}
        {!m && (
          <div className="dial" style={{
            position: 'absolute', bottom: '18%', right: '35%',
            background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
            borderRadius: 11, padding: '10px 15px',
            zIndex: 20, opacity: 0, transform: 'scale(0.9)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 11, color: '#2a2020', textAlign: 'center', whiteSpace: 'pre-line' }}>{dialogue}</div>
            <div style={{ position: 'absolute', bottom: -5, left: 15, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid rgba(255,255,255,0.96)' }} />
          </div>
        )}
      </div>

      {/* Mobile dial — positioned on the black piano body, viewport-relative */}
      {m && (
        <div className="dial" style={{
          position: 'absolute', top: '30%', right: 10,
          background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(10px)',
          borderRadius: 10, padding: '6px 10px',
          zIndex: 20, opacity: 0, transform: 'scale(0.9)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 8, color: '#2a2020', textAlign: 'center', whiteSpace: 'pre-line', maxWidth: 100 }}>{dialogue}</div>
          <div style={{ position: 'absolute', bottom: -4, left: 12, width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid rgba(255,255,255,0.93)' }} />
        </div>
      )}

      {/* Name — top left */}
      <div className="hname" style={{ position: 'absolute', top: m ? '3%' : '20%', left: m ? 10 : 30, zIndex: 30, opacity: 0, transform: 'translateY(20px)' }}>
        {'Coco Choi'.split('').map((ch, i) => (
          <span key={i} className="piano-key-letter" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: m ? 'clamp(20px, 8vw, 36px)' : 'clamp(40px, 9vw, 75px)',
            fontWeight: 900, color: 'white', display: 'inline-block',
          }}
            onMouseEnter={(e) => handleLetterHover(e, i)}
            onClick={(e) => m && handleLetterHover(e, i)}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </div>

      {/* Typewriter */}
      <div className="hsub2" style={{ position: 'absolute', top: m ? '10%' : '34%', right: m ? 10 : 40, left: m ? 10 : 'auto', zIndex: 30, opacity: 0 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: m ? 'clamp(9px, 3.5vw, 14px)' : 'clamp(16px, 6vw, 32px)',
          fontWeight: 900, color: 'white', letterSpacing: -0.5,
          textAlign: m ? 'left' : 'right',
        }}>
          {displayed}<span style={{ borderRight: '2px solid white', animation: 'blink 0.7s infinite' }} />
        </div>
      </div>

      {/* Social icons */}
      <div className="hsocials" style={{ position: 'absolute', bottom: m ? 10 : 40, left: m ? 10 : 30, zIndex: 30, display: 'flex', gap: m ? 5 : 8, opacity: 0 }}>
        {SOCIALS.map((s, i) => (
          <a key={i} className="social-icon" href={s.href} target="_blank" rel="noreferrer" onMouseEnter={() => playNote(880, 0.1)}>{SOCIAL_ICONS[i]}</a>
        ))}
      </div>

      {/* Mobile: bottom nav bar */}
      {m && (
        <div style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          zIndex: 30, display: 'flex', gap: 5,
        }}>
          {[
            { label: 'Work', nav: 'experience' },
            { label: 'Projects', nav: 'projects' },
            { label: 'About', nav: 'about' },
          ].map((item) => (
            <button key={item.nav} onClick={() => { playNote(440, 0.2); go(item.nav) }} style={{
              background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 14, padding: '5px 12px', color: 'white',
              fontFamily: "'DM Sans', sans-serif", fontSize: 7, fontWeight: 700,
              letterSpacing: 0.8, textTransform: 'uppercase', cursor: 'pointer',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <NavOverlay go={go} current="home" />
    </div>
  )
}
