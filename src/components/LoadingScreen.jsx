import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { playNote } from '../utils/audio'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'

/* ─── Musical scale: C4 → C5 ascending, one note per letter ─── */
const NOTES = [261.6, 293.7, 329.6, 349.2, 392.0, 440.0, 493.9, 523.3]
const LETTERS = ['C', 'o', 'c', 'o', ' ', 'C', 'h', 'o', 'i']
const NOTE_MAP = [0, 1, 2, 3, -1, 4, 5, 6, 7] // -1 = space, skip note

/**
 * Full-screen loading intro that plays once on site open.
 * Piano keys rise one by one with ascending notes,
 * then the screen lifts away like a piano lid.
 */
export default function LoadingScreen({ onComplete }) {
    const m = useIsMobile()
    const containerRef = useRef(null)
    const contentRef = useRef(null)
    const keysRef = useRef([])
    const subtitleRef = useRef(null)
    const topLineRef = useRef(null)
    const progressRef = useRef(null)
    const progressTrackRef = useRef(null)
    const tlRef = useRef(null)
    const exitingRef = useRef(false)

    /* ── Exit sequence (reusable — called on finish or skip) ── */
    const doExit = useCallback(() => {
        if (exitingRef.current) return
        exitingRef.current = true

        /* Kill the intro timeline if still running */
        if (tlRef.current) tlRef.current.kill()

        const exit = gsap.timeline({ onComplete })

        /* Phase 1: content floats up + fades */
        exit.to(contentRef.current, {
            y: m ? -30 : -50, opacity: 0,
            duration: 0.45, ease: 'power3.in',
        })

        /* Phase 2: container slides up off-screen */
        exit.to(containerRef.current, {
            y: '-100%',
            duration: 0.65, ease: 'power3.inOut',
        }, '-=0.15')
    }, [onComplete, m])

    /* ── Click / tap anywhere to skip ── */
    const handleSkip = useCallback(() => doExit(), [doExit])

    /* ── Stable ref so the timeline can call the latest doExit ── */
    const doExitRef = useRef(doExit)
    doExitRef.current = doExit

    /* ── Main intro timeline ── */
    useEffect(() => {
        const tl = gsap.timeline()
        tlRef.current = tl

        /* 1 — Top decorative line grows from center */
        tl.fromTo(topLineRef.current,
                  { scaleX: 0, opacity: 0 },
                  { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
                  0.3,
        )

        /* 2 — Piano keys spring up one by one */
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
                                  try { playNote(NOTES[noteIdx], 0.6) } catch (_) { /* silent */ }
                              }
                              /* Glow pulse — rose light blooms then fades */
                              gsap.fromTo(el,
                                          { boxShadow: `0 0 12px 4px ${EYE.rose}30, inset 0 0 8px ${EYE.rose}15` },
                                          { boxShadow: '0 0 0px 0px transparent, inset 0 0 0px transparent', duration: 0.6, ease: 'power2.out' },
                              )
                          },
                      },
                      0.55 + i * 0.11,
            )
        })

        /* 3 — Subtitle fades in */
        tl.fromTo(subtitleRef.current,
                  { opacity: 0, y: 8, filter: 'blur(4px)' },
                  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' },
                  '-=0.2',
        )

        /* 4 — Progress line fills */
        tl.fromTo(progressRef.current,
                  { scaleX: 0 },
                  { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
                  '-=0.3',
        )

        /* 5 — Brief hold, then auto-exit */
        tl.call(() => doExitRef.current(), null, '+=0.4')

        return () => tl.kill()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [m])

    /* ── Key dimensions ── */
    const keyW = m ? 30 : 52
    const keyH = m ? 64 : 100
    const gap = m ? 3 : 5
    const spaceW = m ? 10 : 18

    return (
        <div
            ref={containerRef}
            onClick={handleSkip}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: EYE.shadow,
                cursor: 'pointer',
                overflow: 'hidden',
            }}
        >
            {/* Subtle radial vignette */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
                pointerEvents: 'none',
            }} />

            {/* Centered content wrapper */}
            <div
                ref={contentRef}
                style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                }}
            >
                {/* Top decorative line */}
                <div
                    ref={topLineRef}
                    style={{
                        width: m ? 35 : 55, height: 1,
                        background: `linear-gradient(90deg, transparent, ${EYE.cream}30, transparent)`,
                        marginBottom: m ? 20 : 32,
                        transformOrigin: 'center',
                        opacity: 0,
                    }}
                />

                {/* Piano key letters */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap }}>
                    {LETTERS.map((ch, i) => {
                        if (ch === ' ') {
                            return <div key={i} style={{ width: spaceW }} />
                        }

                        /* Alternate subtle tint on "black key" positions (o, o, h, i) */
                        const isAccent = i === 1 || i === 3 || i === 6 || i === 8
                        const keyBg = isAccent
                                      ? 'rgba(255,255,255,0.025)'
                                      : 'rgba(255,255,255,0.04)'
                        const borderCol = isAccent
                                          ? `${EYE.rose}18`
                                          : 'rgba(255,255,255,0.07)'

                        return (
                            <div
                                key={i}
                                ref={(el) => (keysRef.current[i] = el)}
                                style={{
                                    opacity: 0,
                                    width: keyW, height: keyH,
                                    background: keyBg,
                                    border: `1px solid ${borderCol}`,
                                    borderTop: 'none',
                                    borderRadius: '0 0 4px 4px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    paddingBottom: m ? 10 : 16,
                                    position: 'relative',
                                    transformOrigin: 'top center',
                                }}
                            >
                                {/* Subtle top glow line per key */}
                                <div style={{
                                    position: 'absolute', top: 0, left: '20%', right: '20%',
                                    height: 1,
                                    background: `linear-gradient(90deg, transparent, ${EYE.rose}25, transparent)`,
                                }} />

                                <span style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: m ? 30 : 40,
                                    fontWeight: 1000,
                                    color: EYE.cream,
                                    lineHeight: 1,
                                    letterSpacing: -0.5,
                                    userSelect: 'none',
                                }}>
                  {ch}
                </span>
                            </div>
                        )
                    })}
                </div>

                {/* Subtitle */}
                <div
                    ref={subtitleRef}
                    style={{
                        opacity: 0,
                        marginTop: m ? 18 : 28,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: m ? 9 : 11,
                        fontWeight: 600,
                        letterSpacing: m ? 3 : 5,
                        textTransform: 'uppercase',
                        color: `${EYE.cream}50`,
                    }}
                >
                    Creative Developer
                </div>

                {/* Skip hint */}
                <div style={{
                    position: 'absolute',
                    bottom: m ? 50 : 70,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: m ? 7 : 8,
                    fontWeight: 500,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: `${EYE.cream}20`,
                }}>
                    {m ? 'Tap to skip' : 'Click anywhere to skip'}
                </div>
            </div>

            {/* Bottom progress track */}
            <div
                ref={progressTrackRef}
                style={{
                    position: 'absolute',
                    bottom: m ? 30 : 45,
                    left: '50%', transform: 'translateX(-50%)',
                    width: m ? 50 : 70, height: 1,
                    background: `${EYE.cream}0a`,
                    borderRadius: 1,
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={progressRef}
                    style={{
                        width: '100%', height: '100%',
                        background: `linear-gradient(90deg, ${EYE.rose}, ${EYE.skin})`,
                        transformOrigin: 'left center',
                        transform: 'scaleX(0)',
                        borderRadius: 1,
                    }}
                />
            </div>
        </div>
    )
}