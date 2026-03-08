import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { playNote } from '../utils/audio'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'

/* ─── Musical scale: C4 → C5 ascending, one note per letter ─── */
const NOTES = [261.6, 293.7, 329.6, 349.2, 392.0, 440.0, 493.9, 523.3]
const LETTERS = ['C', 'o', 'c', 'o', ' ', 'C', 'h', 'o', 'i']
const NOTE_MAP = [0, 1, 2, 3, -1, 4, 5, 6, 7]

/* ─── Assets to preload (Rive files) ─── */
const PRELOAD_ASSETS = [
    '/piano.riv',
    '/experience.riv',
    '/warhol.riv',
    '/about_me.riv',
]

/**
 * Fetch a single file with progress tracking via XMLHttpRequest.
 * Returns a promise that resolves when complete.
 */
function fetchWithProgress(url, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        xhr.onprogress = (e) => {
            if (e.lengthComputable) onProgress(e.loaded, e.total)
            else onProgress(0, 0) /* unknown size — will use count-based fallback */
        }
        xhr.onload = () => { onProgress(1, 1); resolve() }
        xhr.onerror = () => resolve() /* don't block loading on failure */
        xhr.send()
    })
}

export default function LoadingScreen({ onComplete }) {
    const m = useIsMobile()
    const containerRef = useRef(null)
    const contentRef = useRef(null)
    const keysRef = useRef([])
    const subtitleRef = useRef(null)
    const topLineRef = useRef(null)
    const progressRef = useRef(null)
    const progressTrackRef = useRef(null)
    const pctRef = useRef(null)
    const tlRef = useRef(null)
    const exitingRef = useRef(false)

    const [progress, setProgress] = useState(0)
    const animDoneRef = useRef(false)
    const assetsDoneRef = useRef(false)

    /* ── Exit sequence ── */
    const doExit = useCallback(() => {
        if (exitingRef.current) return
        exitingRef.current = true
        if (tlRef.current) tlRef.current.kill()

        const exit = gsap.timeline({ onComplete })
        exit.to(contentRef.current, { y: m ? -30 : -50, opacity: 0, duration: 0.45, ease: 'power3.in' })
        exit.to(containerRef.current, { y: '-100%', duration: 0.65, ease: 'power3.inOut' }, '-=0.15')
    }, [onComplete, m])

    const handleSkip = useCallback(() => doExit(), [doExit])
    const doExitRef = useRef(doExit)
    doExitRef.current = doExit

    /* ── Try to exit when both conditions met ── */
    const tryExit = useCallback(() => {
        if (animDoneRef.current && assetsDoneRef.current) {
            doExitRef.current()
        }
    }, [])

    /* ── Preload assets with real progress ── */
    useEffect(() => {
        const fileProgress = PRELOAD_ASSETS.map(() => ({ loaded: 0, total: 0 }))
        let filesComplete = 0

        const updateProgress = () => {
            /* Try byte-based progress first */
            const totalBytes = fileProgress.reduce((s, f) => s + f.total, 0)
            const loadedBytes = fileProgress.reduce((s, f) => s + f.loaded, 0)

            let pct
            if (totalBytes > 0) {
                pct = Math.round((loadedBytes / totalBytes) * 100)
            } else {
                /* Fallback: count-based (for servers that don't send Content-Length) */
                pct = Math.round((filesComplete / PRELOAD_ASSETS.length) * 100)
            }
            setProgress(Math.min(pct, 100))
        }

        const promises = PRELOAD_ASSETS.map((url, i) =>
                                                fetchWithProgress(url, (loaded, total) => {
                                                    fileProgress[i] = { loaded, total }
                                                    updateProgress()
                                                }).then(() => {
                                                    filesComplete++
                                                    updateProgress()
                                                })
        )

        Promise.all(promises).then(() => {
            setProgress(100)
            assetsDoneRef.current = true
            tryExit()
        })
    }, [tryExit])

    /* ── Animate progress bar from real progress state ── */
    useEffect(() => {
        if (progressRef.current) {
            gsap.to(progressRef.current, {
                scaleX: progress / 100,
                duration: 0.4, ease: 'power2.out',
            })
        }
        if (pctRef.current) {
            pctRef.current.textContent = `${progress}%`
        }
    }, [progress])

    /* ── Piano key animation (plays immediately, independent of loading) ── */
    useEffect(() => {
        const tl = gsap.timeline()
        tlRef.current = tl

        tl.fromTo(topLineRef.current,
                  { scaleX: 0, opacity: 0 },
                  { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
                  0.3,
        )

        LETTERS.forEach((ch, i) => {
            const el = keysRef.current[i]
            if (!el || ch === ' ') return
            const noteIdx = NOTE_MAP[i]
            tl.fromTo(el,
                      { opacity: 0, y: 25, scaleY: 0.85 },
                      {
                          opacity: 1, y: 0, scaleY: 1,
                          duration: 0.18, ease: 'back.out(2.5)',
                          onStart: () => {
                              if (noteIdx >= 0) {
                                  try { playNote(NOTES[noteIdx], 0.6) } catch (_) {}
                              }
                              gsap.fromTo(el,
                                          { boxShadow: `0 0 12px 4px ${EYE.rose}30, inset 0 0 8px ${EYE.rose}15` },
                                          { boxShadow: '0 0 0px 0px transparent, inset 0 0 0px transparent', duration: 0.6, ease: 'power2.out' },
                              )
                          },
                      },
                      0.55 + i * 0.11,
            )
        })

        tl.fromTo(subtitleRef.current,
                  { opacity: 0, y: 8, filter: 'blur(4px)' },
                  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
                  '-=0.2',
        )

        /* Mark animation done after keys + subtitle finish + short hold */
        tl.call(() => {
            animDoneRef.current = true
            tryExit()
        }, null, '+=0.6')

        return () => tl.kill()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [m])

    /* ── Key dimensions ── */
    const keyW = m ? 30 : 52
    const keyH = m ? 64 : 100
    const gap = m ? 3 : 5
    const spaceW = m ? 10 : 18

    return (
        <div ref={containerRef} onClick={handleSkip}
             style={{ position: 'fixed', inset: 0, zIndex: 1000, background: EYE.shadow, cursor: 'pointer', overflow: 'hidden' }}>

            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)', pointerEvents: 'none' }} />

            <div ref={contentRef} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <div ref={topLineRef} style={{ width: m ? 35 : 55, height: 1, background: `linear-gradient(90deg, transparent, ${EYE.cream}30, transparent)`, marginBottom: m ? 20 : 32, transformOrigin: 'center', opacity: 0 }} />

                {/* Piano key letters */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap }}>
                    {LETTERS.map((ch, i) => {
                        if (ch === ' ') return <div key={i} style={{ width: spaceW }} />
                        const isAccent = i === 1 || i === 3 || i === 6 || i === 8
                        return (
                            <div key={i} ref={(el) => (keysRef.current[i] = el)} style={{
                                opacity: 0, width: keyW, height: keyH,
                                background: isAccent ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${isAccent ? `${EYE.rose}18` : 'rgba(255,255,255,0.07)'}`,
                                borderTop: 'none', borderRadius: '0 0 4px 4px',
                                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                                paddingBottom: m ? 10 : 16, position: 'relative', transformOrigin: 'top center',
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${EYE.rose}25, transparent)` }} />
                                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 30 : 40, fontWeight: 1000, color: EYE.cream, lineHeight: 1, letterSpacing: -0.5, userSelect: 'none' }}>{ch}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Subtitle */}
                <div ref={subtitleRef} style={{ opacity: 0, marginTop: m ? 18 : 28, fontFamily: "'DM Sans', sans-serif", fontSize: m ? 9 : 11, fontWeight: 600, letterSpacing: m ? 3 : 5, textTransform: 'uppercase', color: `${EYE.cream}50` }}>
                    Creative Developer
                </div>

                {/* Skip hint */}
                <div style={{ position: 'absolute', bottom: m ? 50 : 70, fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 8, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', color: `${EYE.cream}20` }}>
                    {m ? 'Tap to skip' : 'Click anywhere to skip'}
                </div>
            </div>

            {/* Progress track + percentage */}
            <div style={{ position: 'absolute', bottom: m ? 30 : 45, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: m ? 4 : 6 }}>
                <div ref={progressTrackRef} style={{ width: m ? 50 : 70, height: 1, background: `${EYE.cream}0a`, borderRadius: 1, overflow: 'hidden' }}>
                    <div ref={progressRef} style={{ width: '100%', height: '100%', background: `linear-gradient(90deg, ${EYE.rose}, ${EYE.skin})`, transformOrigin: 'left center', transform: 'scaleX(0)', borderRadius: 1 }} />
                </div>
                <div ref={pctRef} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 7, fontWeight: 600, letterSpacing: 1.5, color: `${EYE.cream}25` }}>0%</div>
            </div>
        </div>
    )
}