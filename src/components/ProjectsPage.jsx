import { useEffect, useRef } from 'react'
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

    const SCROLL_HINT_CSS = `@keyframes scrollPulse{0%,100%{transform:translateY(0);opacity:.6}50%{transform:translateY(5px);opacity:1}}.scroll-hint-bounce{animation:scrollPulse 2s ease-in-out infinite}`

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
        tl.fromTo('.proj-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
        return () => tl.kill()
    }, [m])

    /* ── MOBILE ── */
    if (m) {
        return (
            <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}>
                <style>{SCROLL_HINT_CSS}</style>
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
                    </div>
                    <button className="page-back" onClick={() => go('home')} style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)', zIndex: 100 }}>←</button>
                    <div className="proj-scroll-hint" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 4, opacity: 0, cursor: 'pointer', background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 6, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>Ask about my projects</div>
                        <svg className="scroll-hint-bounce" width="12" height="7" viewBox="0 0 14 8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round"><path d="M1 1 L7 6 L13 1"/></svg>
                    </div>
                    <NavOverlay go={go} current="projects" dark />
                </section>
                <ChatSection config={{ ...PROJ_CHAT, accent: PAL.orange, title: 'Explore my projects', subtitle: 'Projects' }} />
            </div>
        )
    }

    /* ── DESKTOP ── */
    return (
        <div ref={scrollRef} style={{ width: '100vw', height: '100vh', overflowX: 'hidden', overflowY: 'auto', scrollSnapType: 'y mandatory' }}>
            <style>{SCROLL_HINT_CSS}</style>
            <section style={{ width: '100%', height: '100vh', background: PAL.grey, position: 'relative', overflow: 'hidden', display: 'flex', scrollSnapAlign: 'start' }}>
                <div className="wart" style={{ width: '40%', flexShrink: 0, overflow: 'hidden', opacity: 0, position: 'relative', zIndex: 1 }}>
                    <canvas ref={canvasRef} style={{ display: 'block' }} />
                    <div style={{ position: 'absolute', bottom: 20, left: 14, right: 14, zIndex: 5 }}>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: '#c9a96e', marginBottom: 4 }}>Selected</p>
                        <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 400, color: '#f0e8dc', lineHeight: 1.05, letterSpacing: -0.5 }}>Projects</h2>
                        <div style={{ width: 25, height: 1.5, background: '#c9a96e', opacity: 0.35, marginTop: 7, borderRadius: 2 }} />
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
                <div className="proj-scroll-hint" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 6, opacity: 0, cursor: 'pointer', background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }} onClick={() => scrollRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 7, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 3 }}>Ask about my projects</div>
                    <svg className="scroll-hint-bounce" width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round"><path d="M1 1 L7 6 L13 1"/></svg>
                </div>
                <NavOverlay go={go} current="projects" dark />
            </section>
            <ChatSection config={{ ...PROJ_CHAT, accent: PAL.orange, title: 'Explore my projects', subtitle: 'Projects' }} />
        </div>
    )
}