import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

import NavOverlay from './NavOverlay'
import ChatSection from './ChatSection'
import ExpCard from './cards/ExpCard'
import Particles from './shared/Particles'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'
import { EXPERIENCES, EXP_CHAT } from '../constants/data'

export default function ExperiencePage({ go }) {
  const m = useIsMobile()
  const canvasRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0 }, [])

  const HINT_CSS = `@keyframes chatBubblePulse{0%,100%{transform:scale(1);box-shadow:0 2px 10px rgba(0,0,0,.12)}50%{transform:scale(1.08);box-shadow:0 4px 18px rgba(0,0,0,.18)}}.chat-whisper{animation:chatBubblePulse 3s ease-in-out infinite;transition:opacity .4s}.chat-whisper:hover{animation:none;transform:scale(1.12);box-shadow:0 6px 22px rgba(0,0,0,.2)}`

  /* Rive — eye (interactive on both platforms) */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let r = null
    import('@rive-app/canvas').then((rive) => {
      const dpr = window.devicePixelRatio || 1
      const size = m ? Math.min(window.innerWidth * 0.65, 280) : 450
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = size + 'px'
      canvas.style.height = size + 'px'
      r = new rive.Rive({
                          src: '/experience.riv', canvas, artboard: 'AO Eyes',
                          stateMachines: 'Eyes', autoplay: true,
                          layout: new rive.Layout({ fit: rive.Fit.Cover, alignment: rive.Alignment.Center }),
                          onLoad: () => r.resizeDrawingSurfaceToCanvas(),
                        })
    })
    return () => { if (r) r.cleanup() }
  }, [m])

  /* Entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.eye-center', { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, delay: 0.15 })
    tl.fromTo('.exp-left', { opacity: 0, x: m ? -20 : -80, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1 }, '-=0.7')
    tl.fromTo('.exp-right', { opacity: 0, x: m ? 20 : 80, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1 }, '-=0.9')
    tl.fromTo('.exp-center', { opacity: 0, y: 30, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1 }, '-=1.0')
    tl.fromTo('.exp-next', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    tl.fromTo('.exp-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1')
    return () => tl.kill()
  }, [m])

  const onNextEnter = useCallback((e) => {
    const el = e.currentTarget
    el.style.borderColor = `${EYE.warm}60`
    el.style.transform = 'translateX(6px)'
    el.style.background = `${EYE.warm}0a`
    const arrow = el.querySelector('.next-arrow')
    if (arrow) gsap.to(arrow, { x: 3, duration: 0.3, ease: 'power2.out' })
  }, [])
  const onNextLeave = useCallback((e) => {
    const el = e.currentTarget
    el.style.borderColor = `${EYE.warm}30`
    el.style.transform = ''
    el.style.background = 'none'
    const arrow = el.querySelector('.next-arrow')
    if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' })
  }, [])
  const goProjects = useCallback(() => go('projects'), [go])

  /* ── MOBILE ── */
  if (m) {
    return (
        <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}>
          <style>{HINT_CSS}</style>
          <section style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start', background: EYE.bg }}>
            <Particles attractPoint={{ x: 0.15, y: 0.12 }} />
            <div style={{
              position: 'relative', zIndex: 1,
              width: '100%', height: '100%',
              overflowY: 'auto', overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              padding: '40px 6px 6px', display: 'flex', flexDirection: 'column',
            }}>
              {/* Header with eye */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4, padding: '0 4px' }}>
                <div className="eye-center" style={{ flexShrink: 0, opacity: 0 }}>
                  <div style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: '3px solid rgba(45,40,37,0.25)', outlineOffset: 1 }}>
                    <div style={{ borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(196,165,138,0.12)', boxShadow: '0 6px 24px rgba(0,0,0,0.4), 0 0 50px rgba(196,122,110,0.06), inset 0 0 15px rgba(0,0,0,0.15)' }}>
                      <canvas ref={canvasRef} style={{ display: 'block' }} />
                    </div>
                  </div>
                </div>
                <div className="exp-center" style={{ opacity: 0 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: EYE.skin, marginBottom: 3 }}>Experience</p>
                  <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 20, fontWeight: 400, color: EYE.cream, letterSpacing: -0.3, lineHeight: 1.1 }}>Where I've<br/>Worked</h2>
                  <div style={{ width: 18, height: 1, background: EYE.skin, opacity: 0.4, marginTop: 4, borderRadius: 1 }} />
                </div>
              </div>

              {/* Cards — 2-col grid, fills remaining space */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, flex: 1 }}>
                {EXPERIENCES.map((exp, i) => (
                    <ExpCard key={i} exp={exp} className={i % 2 === 0 ? 'exp-left' : 'exp-right'} style={{ opacity: 0 }} />
                ))}
              </div>

              {/* Next button */}
              <div className="exp-next" style={{ display: 'flex', justifyContent: 'center', marginTop: 10, paddingBottom: 10, opacity: 0 }}>
                <button onClick={goProjects} style={{ background: 'none', border: `1px solid ${EYE.warm}30`, borderRadius: 16, padding: '8px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 6, color: `${EYE.warm}70`, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Next</div>
                    <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 14, fontWeight: 400, color: EYE.cream }}>Projects</div>
                  </div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={`${EYE.warm}70`} strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            <button className="page-back" onClick={() => go('home')} style={{ zIndex: 100 }}>←</button>
            <div className="exp-scroll-hint chat-whisper" style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 30, width: 32, height: 32, borderRadius: '50%', background: 'rgba(240,232,220,0.85)', backdropFilter: 'blur(8px)', border: `1px solid ${EYE.skin}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0 }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={EYE.shadow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <NavOverlay go={go} current="experience" dark />
          </section>
          <ChatSection config={{ ...EXP_CHAT, accent: EYE.skin, title: 'Deep dive into my experience', subtitle: 'Experience', bg: EYE.bg, parentBg: EYE.bg, theme: 'dark', cardStyle: 'gallery' }} />
        </div>
    )
  }

  /* ── DESKTOP ── */
  return (
      <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
        <style>{HINT_CSS}</style>
        <section style={{ width: '100%', height: '100vh', background: EYE.bg, position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start' }}>
          <Particles attractPoint={{ x: 0.5, y: 0.42 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 5, padding: 5, width: '100vw', height: '100vh', position: 'relative', zIndex: 1 }}>
            <ExpCard exp={EXPERIENCES[0]} className="exp-left" revealOrigin="left" style={{ gridColumn: '1', gridRow: '1', opacity: 0 }} />
            <div className="exp-center" style={{ gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, opacity: 0 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: EYE.skin }}>Experience</p>
              <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 26, fontWeight: 400, color: EYE.cream, letterSpacing: -0.5, textAlign: 'center', lineHeight: 1.1 }}>Where I've<br/>Worked</h2>
              <div style={{ width: 30, height: 1.5, background: EYE.skin, opacity: 0.35, borderRadius: 1, marginTop: 2 }} />
            </div>
            <ExpCard exp={EXPERIENCES[3]} className="exp-right" revealOrigin="right" style={{ gridColumn: '3', gridRow: '1', opacity: 0 }} />
            <ExpCard exp={EXPERIENCES[1]} className="exp-left" revealOrigin="left" style={{ gridColumn: '1', gridRow: '2', opacity: 0 }} />
            <div className="eye-center" style={{ gridColumn: '2', gridRow: '2', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'visible', zIndex: 5, opacity: 0 }}>
              <div style={{ width: 460, height: 460, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: `4px solid rgba(45,40,37,0.3)`, outlineOffset: 2, marginTop: -75 }}>
                <div style={{ width: 450, height: 450, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(196,165,138,0.15)', boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 80px rgba(196,122,110,0.08), inset 0 0 30px rgba(0,0,0,0.2)' }}>
                  <canvas ref={canvasRef} style={{ display: 'block' }} />
                </div>
              </div>
            </div>
            <ExpCard exp={EXPERIENCES[2]} className="exp-right" revealOrigin="right" style={{ gridColumn: '3', gridRow: '2', opacity: 0 }} />
            <ExpCard exp={EXPERIENCES[4]} className="exp-left" revealOrigin="bottom" style={{ gridColumn: '1', gridRow: '3', opacity: 0 }} />
            <ExpCard exp={EXPERIENCES[5]} className="exp-center" revealOrigin="bottom" style={{ gridColumn: '2', gridRow: '3', opacity: 0 }} />
            <div className="exp-next" style={{ gridColumn: '3', gridRow: '3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0 }}>
              <button onClick={goProjects} onMouseEnter={onNextEnter} onMouseLeave={onNextLeave} style={{ background: 'none', border: `1.5px solid ${EYE.warm}30`, borderRadius: 30, padding: '18px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.4s cubic-bezier(0.25,0,0,1)' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, color: `${EYE.warm}70`, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 3 }}>Next</div>
                  <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 18, fontWeight: 400, color: EYE.cream, lineHeight: 1.15 }}>Projects</div>
                </div>
                <svg className="next-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={`${EYE.warm}70`} strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div className="exp-scroll-hint chat-whisper" style={{ position: 'absolute', bottom: 18, right: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: 'rgba(240,232,220,0.85)', backdropFilter: 'blur(8px)', border: `1px solid ${EYE.skin}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0 }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={EYE.shadow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <NavOverlay go={go} current="experience" dark />
        </section>
        <ChatSection config={{ ...EXP_CHAT, accent: EYE.skin, title: 'Deep dive into my experience', subtitle: 'Experience', bg: EYE.bg, parentBg: EYE.bg, theme: 'dark', cardStyle: 'gallery' }} />
      </div>
  )
}