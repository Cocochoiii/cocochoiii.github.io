import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

import NavOverlay from './NavOverlay'
import ChatSection from './ChatSection'
import ArtCard from './cards/ArtCard'
import useIsMobile from '../hooks/useIsMobile'
import { PAL } from '../constants/theme'
import { PROJECTS, PROJ_CHAT } from '../constants/data'

export default function ProjectsPage({ go }) {
    const m = useIsMobile()
    const canvasRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0 }, [])

    const HINT_CSS = `@keyframes chatBubblePulse{0%,100%{transform:scale(1);box-shadow:0 2px 10px rgba(0,0,0,.12)}50%{transform:scale(1.08);box-shadow:0 4px 18px rgba(0,0,0,.18)}}.chat-whisper{animation:chatBubblePulse 3s ease-in-out infinite;transition:opacity .4s}.chat-whisper:hover{animation:none;transform:scale(1.12);box-shadow:0 6px 22px rgba(0,0,0,.2)}`

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

    const goAbout = useCallback(() => go('about'), [go])

    /* Entrance */
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo('.wart', { opacity: 0, x: m ? 0 : -100, y: m ? -20 : 0, filter: 'blur(14px)' }, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 1.1, delay: 0.15 })
        tl.fromTo('.proj-left', { opacity: 0, x: m ? -20 : -60, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 }, '-=0.6')
        tl.fromTo('.proj-right', { opacity: 0, x: m ? 20 : 60, filter: 'blur(8px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 }, '-=0.85')
        tl.fromTo('.proj-wide', { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.9')
        tl.fromTo('.proj-next', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        tl.fromTo('.proj-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.1')
        return () => tl.kill()
    }, [m])

    /* ── MOBILE ── */
    if (m) {
        return (
            <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}>
                <style>{HINT_CSS}</style>
                <section style={{ width: '100%', height: '100vh', background: PAL.grey, position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start' }}>
                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}>
                        <div className="wart" style={{ width: '100%', aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden', opacity: 0 }}>
                            <canvas ref={canvasRef} style={{ display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 5 }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c9a96e', marginBottom: 3 }}>Selected</p>
                                <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 22, fontWeight: 400, color: '#f0e8dc', lineHeight: 1.05, letterSpacing: -0.5 }}>Projects</h2>
                                <div style={{ width: 18, height: 1, background: '#c9a96e', opacity: 0.4, marginTop: 4, borderRadius: 1 }} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '15vw', gap: 4, padding: '4px 4px 10px' }}>
                            {PROJECTS.map((p, i) => (
                                <ArtCard key={i} p={p} className={i % 2 === 0 ? 'proj-left' : 'proj-right'} style={{ opacity: 0 }} compact />
                            ))}
                        </div>
                        <div className="proj-next" style={{ display: 'flex', justifyContent: 'center', marginTop: 6, paddingBottom: 10, opacity: 0 }}>
                            <button onClick={goAbout} style={{ background: 'none', border: '1px solid rgba(201,169,110,0.3)', borderRadius: 16, padding: '8px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.4s cubic-bezier(0.25,0,0,1)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.6)'; e.currentTarget.style.background = 'rgba(201,169,110,0.06)' }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'; e.currentTarget.style.background = 'none' }}>
                                <div>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 6, color: 'rgba(201,169,110,0.7)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Next</div>
                                    <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 14, fontWeight: 400, color: '#f0e8dc' }}>About Me</div>
                                </div>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.7)" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </div>
                    </div>
                    <button className="page-back" onClick={() => go('home')} style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', zIndex: 100 }}>←</button>
                    <div className="proj-scroll-hint chat-whisper" style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 30, width: 32, height: 32, borderRadius: '50%', background: 'rgba(240,232,220,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0 }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d2f2a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <NavOverlay go={go} current="projects" dark />
                </section>
                <ChatSection config={{ ...PROJ_CHAT, accent: PAL.orange, title: 'Explore my projects', subtitle: 'Projects', bg: '#7d7876', parentBg: PAL.grey, theme: 'dark', cardStyle: 'popart' }} />
            </div>
        )
    }

    /* ── DESKTOP ── */
    return (
        <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
            <style>{HINT_CSS}</style>
            <section style={{ width: '100%', height: '100vh', background: PAL.grey, position: 'relative', overflow: 'hidden', display: 'flex', scrollSnapAlign: 'start' }}>
                <div className="wart" style={{ width: '40%', flexShrink: 0, overflow: 'hidden', opacity: 0, position: 'relative', zIndex: 1 }}>
                    <canvas ref={canvasRef} style={{ display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 14, right: 14, zIndex: 5 }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a96e', marginBottom: 4 }}>Selected</p>
                        <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 400, color: '#f0e8dc', lineHeight: 1.05, letterSpacing: -0.5 }}>Projects</h2>
                        <div style={{ width: 25, height: 1.5, background: '#c9a96e', opacity: 0.35, marginTop: 7, borderRadius: 2 }} />
                        <button className="proj-next" onClick={goAbout} style={{ marginTop: 16, background: 'none', border: '1.5px solid rgba(201,169,110,0.25)', borderRadius: 24, padding: '12px 22px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.4s cubic-bezier(0.25,0,0,1)', opacity: 0 }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.55)'; e.currentTarget.style.background = 'rgba(201,169,110,0.06)'; e.currentTarget.style.transform = 'translateX(4px)'; const a = e.currentTarget.querySelector('.proj-next-arrow'); if (a) a.style.transform = 'translateX(3px)' }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.25)'; e.currentTarget.style.background = 'none'; e.currentTarget.style.transform = ''; const a = e.currentTarget.querySelector('.proj-next-arrow'); if (a) a.style.transform = '' }}>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, color: 'rgba(201,169,110,0.7)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Next</div>
                                <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 16, fontWeight: 400, color: '#f0e8dc', lineHeight: 1.15 }}>About Me</div>
                            </div>
                            <svg className="proj-next-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,169,110,0.7)" strokeWidth="1.5" style={{ transition: 'transform 0.3s' }}><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
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
                <div className="proj-scroll-hint chat-whisper" style={{ position: 'absolute', bottom: 18, right: 18, zIndex: 30, width: 38, height: 38, borderRadius: '50%', background: 'rgba(240,232,220,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0 }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d2f2a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <NavOverlay go={go} current="projects" dark />
            </section>
            <ChatSection config={{ ...PROJ_CHAT, accent: PAL.orange, title: 'Explore my projects', subtitle: 'Projects', bg: '#7d7876', parentBg: PAL.grey, theme: 'dark', cardStyle: 'popart' }} />
        </div>
    )
}