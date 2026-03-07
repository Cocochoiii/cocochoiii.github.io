import { useState, useCallback, useRef, useEffect } from 'react'
import gsap from 'gsap'

import LoadingScreen from './components/LoadingScreen'
import HomePage from './components/HomePage'
import ProjectsPage from './components/ProjectsPage'
import ExperiencePage from './components/ExperiencePage'
import AboutPage from './components/AboutPage'
import { BG, EYE, PAL, STRIP_COUNT } from './constants/theme'

/* ─── Grain noise SVGs (data-URIs) ─── */

const GRAIN_A = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
const GRAIN_B = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

const GRAIN_CSS = `
@keyframes grainDrift {
  0%   { filter: hue-rotate(0deg)    brightness(1); }
  25%  { filter: hue-rotate(1.5deg)  brightness(1.01); }
  50%  { filter: hue-rotate(0deg)    brightness(0.99); }
  75%  { filter: hue-rotate(-1.5deg) brightness(1); }
  100% { filter: hue-rotate(0deg)    brightness(1); }
}
`

/*
 * ── Art-directed strip backgrounds per destination ──
 *
 * home:       Piano keys — alternating ivory & ebony
 * experience: Oil-painting — warm EYE-palette gradient per strip
 * projects:   Pop-art — bold PAL colors, one per strip
 * about:      Editorial — clean whites with subtle warm tint variation
 */
const STRIP_BG = {
    home: [
        '#e37b88',                                        /* ivory key */
        '#1a1714',                                        /* ebony key */
        '#ffffff',                                        /* ivory key (slightly warmer) */
        '#e37b88',                                        /* ebony key */
        '#1a1714',                                        /* ivory key */
    ],
    experience: [
        `linear-gradient(180deg, ${EYE.shadow}, ${EYE.rose})`,
        `linear-gradient(180deg, ${EYE.rose}, ${EYE.warm})`,
        `linear-gradient(180deg, ${EYE.warm}, ${EYE.skin})`,
        `linear-gradient(180deg, ${EYE.skin}, ${EYE.shadow})`,
        `linear-gradient(180deg, ${EYE.shadow}, ${EYE.iris})`,
    ],
    projects: [
        PAL.pink,
        PAL.yellow,
        PAL.blue,
        PAL.orange,
        PAL.dark,
    ],
    about: [
        '#d8995c',
        '#080603',
        '#928544',
        '#23150d',
        '#c47c47',
    ],
}

/* ─── Page lookup ─── */

const PAGES = { home: HomePage, projects: ProjectsPage, experience: ExperiencePage, about: AboutPage }

export default function App() {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState('home')
    const [busy, setBusy] = useState(false)
    const stripsRef = useRef([])
    const grainRefA = useRef(null)
    const grainRefB = useRef(null)

    /* ── Grain texture animation ── */
    useEffect(() => {
        let frame
        const animate = () => {
            if (grainRefA.current) {
                grainRefA.current.style.transform = `translate(${Math.random() * 100}px, ${Math.random() * 100}px)`
            }
            if (grainRefB.current) {
                grainRefB.current.style.transform = `translate(${Math.random() * 80}px, ${Math.random() * 80}px)`
            }
            frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [])

    /* ── Page transition with art-directed strips ── */
    const go = useCallback(
        (target) => {
            if (target === page || busy) return
            setBusy(true)

            const strips = stripsRef.current.filter(Boolean)
            const bgs = STRIP_BG[target] || STRIP_BG.home
            const tl = gsap.timeline()

            strips.forEach((el, i) => {
                gsap.set(el, {
                    scaleY: 0,
                    background: bgs[i % bgs.length],
                    transformOrigin: 'top center',
                })
            })

            tl.to(strips, { scaleY: 1, duration: 0.6, stagger: 0.06, ease: 'power3.inOut' })
            tl.call(() => setPage(target), null, '-=0.1')
            tl.set(strips, { transformOrigin: 'bottom center' }, `-=${0.45 + 0.05 * STRIP_COUNT + 0.15}`)
            tl.to(strips, {
                scaleY: 0, duration: 0.6, stagger: 0.05,
                ease: 'power2.inOut', delay: 0.15,
                onComplete: () => setBusy(false),
            })
        },
        [page, busy],
    )

    const handleLoadingComplete = useCallback(() => setLoading(false), [])
    const ActivePage = PAGES[page]

    return (
        <>
            <style>{GRAIN_CSS}</style>

            <div style={{ position: 'fixed', inset: 0 }}>
                <ActivePage go={go} />
            </div>

            {/* Film grain A — multiply + warm drift */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none',
                opacity: 0.03, mixBlendMode: 'multiply',
                animation: 'grainDrift 9s ease-in-out infinite',
            }}>
                <div ref={grainRefA} style={{
                    position: 'absolute', inset: '-100px',
                    backgroundImage: GRAIN_A, backgroundSize: '100px 100px',
                }} />
            </div>

            {/* Film grain B — overlay + cool counter-drift */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none',
                opacity: 0.05, mixBlendMode: 'overlay',
                animation: 'grainDrift 11s ease-in-out infinite reverse',
            }}>
                <div ref={grainRefB} style={{
                    position: 'absolute', inset: '-100%',
                    backgroundImage: GRAIN_B,
                }} />
            </div>

            {/* Transition strips */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 600, pointerEvents: 'none', display: 'flex' }}>
                {Array.from({ length: STRIP_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => (stripsRef.current[i] = el)}
                        style={{ flex: 1, height: '100%', transform: 'scaleY(0)', transformOrigin: 'top center' }}
                    />
                ))}
            </div>

            {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
        </>
    )
}