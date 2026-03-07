import { useRef, useState, memo, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import CardInner from './CardInner'
import useIsMobile from '../../hooks/useIsMobile'

/*
 * Gallery-frame corner ornament — L-shaped gilded mark.
 */
function FrameCorner({ pos, color, mobile }) {
    const len   = mobile ? 8 : 14
    const thick = mobile ? 1 : 1.5
    const gap   = mobile ? 1 : 2
    const o     = 0.3

    const isTop  = pos[0] === 't'
    const isLeft = pos[1] === 'l'

    return (
        <div style={{
            position: 'absolute',
            top: isTop ? gap : 'auto',
            bottom: isTop ? 'auto' : gap,
            left: isLeft ? gap : 'auto',
            right: isLeft ? 'auto' : gap,
            pointerEvents: 'none', zIndex: 4,
        }}>
            <div style={{
                position: 'absolute', top: 0,
                [isLeft ? 'left' : 'right']: 0,
                width: len, height: thick,
                background: color, opacity: o, borderRadius: 0.5,
            }} />
            <div style={{
                position: 'absolute', top: 0,
                [isLeft ? 'left' : 'right']: 0,
                width: thick, height: len,
                background: color, opacity: o, borderRadius: 0.5,
            }} />
        </div>
    )
}

function ExpCard({ exp, className = '', style = {} }) {
    const m = useIsMobile()
    const cardRef  = useRef(null)
    const hoverRef = useRef(null)
    const [hovered, setHovered] = useState(false)

    /*
     * ── Interaction split ──
     * Desktop: mouseEnter/Leave for hover, mouseMove for 3D tilt.
     * Mobile:  onClick only — toggles reveal/hide. No mouse events.
     *          This prevents the mouseEnter→mouseLeave race that killed
     *          the clip-path animation on touch devices.
     */

    /* Desktop: 3D tilt on mouse move */
    const onMove = useCallback((e) => {
        if (m) return
        const c = cardRef.current
        if (!c) return
        const r = c.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width  - 0.5
        const y = (e.clientY - r.top)  / r.height - 0.5
        gsap.to(c, { rotateY: x * 5, rotateX: -y * 5, duration: 0.4, ease: 'power2.out' })
    }, [m])

    const reveal = useCallback(() => {
        setHovered(true)
        if (hoverRef.current) {
            gsap.killTweensOf(hoverRef.current)
            gsap.fromTo(hoverRef.current,
                        /* Mobile: reveal from center for full coverage; Desktop: from top */
                        { clipPath: m ? 'circle(0% at 50% 50%)' : 'circle(0% at 50% 0%)' },
                        { clipPath: m ? 'circle(150% at 50% 50%)' : 'circle(150% at 50% 0%)', duration: m ? 0.7 : 1.0, ease: 'power3.out' },
            )
        }
    }, [m])

    const hide = useCallback(() => {
        setHovered(false)
        if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' })
        if (hoverRef.current) {
            gsap.killTweensOf(hoverRef.current)
            gsap.to(hoverRef.current, {
                clipPath: m ? 'circle(0% at 50% 50%)' : 'circle(0% at 50% 0%)',
                duration: m ? 0.5 : 0.7, ease: 'power2.in',
            })
        }
    }, [m])

    /* Desktop hover */
    const onEnter = useCallback(() => { if (!m) reveal() }, [m, reveal])
    const onLeave = useCallback(() => { if (!m) hide() }, [m, hide])

    /* Mobile tap toggle */
    const onClick = useCallback(() => {
        if (!m) return
        if (hovered) hide(); else reveal()
    }, [m, hovered, reveal, hide])

    /* Mobile: tap outside any card to close (via document listener) */
    useEffect(() => {
        if (!m || !hovered) return
        const handleOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) hide()
        }
        /* Small delay so the current tap doesn't immediately close */
        const timer = setTimeout(() => {
            document.addEventListener('touchstart', handleOutside, { passive: true })
        }, 50)
        return () => {
            clearTimeout(timer)
            document.removeEventListener('touchstart', handleOutside)
        }
    }, [m, hovered, hide])

    /* ── Frame styling ── */
    const c = exp.color
    const frameW = m ? 3 : 4

    const frameShadow = [
        `0 4px 16px rgba(0,0,0,0.25)`,
        `inset ${m ? 1 : 1.5}px ${m ? 1 : 1.5}px 0 ${c}18`,
        `inset -${m ? 1 : 1.5}px -${m ? 1 : 1.5}px 0 rgba(0,0,0,0.2)`,
        ...(hovered ? [`inset 0 0 40px ${c}0c`] : []),
    ].join(', ')

    return (
        <div ref={cardRef} className={`exp-card ${className}`}
             style={{
                 background: 'rgba(255,255,255,0.04)',
                 borderRadius: m ? 5 : 6,
                 overflow: 'hidden',
                 position: 'relative', cursor: 'default', perspective: 800,
                 border: `${frameW}px solid ${c}20`,
                 borderImage: `linear-gradient(135deg, ${c}35 0%, ${c}18 30%, ${c}10 50%, ${c}18 70%, ${c}30 100%) 1`,
                 boxShadow: frameShadow,
                 transition: 'box-shadow 0.5s cubic-bezier(0.25,0,0,1)',
                 ...style,
             }}
             onMouseMove={onMove}
             onMouseEnter={onEnter}
             onMouseLeave={onLeave}
             onClick={onClick}
        >
            {/* Top gilding */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: m ? 1.5 : 2,
                background: `linear-gradient(90deg, ${c}55, ${c}20, ${c}40, ${c}15, ${c}45)`,
                zIndex: 3,
            }} />

            {/* Inner lip */}
            <div style={{
                position: 'absolute', inset: 0,
                border: `${m ? 0.5 : 0.75}px solid rgba(0,0,0,0.15)`,
                borderRadius: m ? 3 : 4,
                pointerEvents: 'none', zIndex: 3,
            }} />

            {/* Corner ornaments */}
            <FrameCorner pos="tl" color={c} mobile={m} />
            <FrameCorner pos="tr" color={c} mobile={m} />
            <FrameCorner pos="bl" color={c} mobile={m} />
            <FrameCorner pos="br" color={c} mobile={m} />

            {/* Card content */}
            <CardInner exp={exp} isHover={false} hovered={hovered} />

            {/* Hover/tap reveal layer */}
            <div ref={hoverRef} style={{
                position: 'absolute', inset: 0,
                background: exp.hBg,
                clipPath: m ? 'circle(0% at 50% 50%)' : 'circle(0% at 50% 0%)',
                zIndex: 1,
            }}>
                <CardInner exp={exp} isHover={true} hovered={hovered} />
            </div>
        </div>
    )
}

export default memo(ExpCard)