import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Smooth scroll for a scrollable container.
 *
 * Desktop: intercepts wheel events and uses GSAP to lerp scrollTop,
 *   giving a silky inertia feel like Lenis / ScrollSmoother.
 * Mobile:  does nothing — native momentum scroll is better on touch.
 *
 * @param {React.RefObject} containerRef — the scrollable element
 * @param {object}          options
 * @param {number}          options.lerp      — smoothing factor (0.06 = very smooth, 0.15 = snappy)
 * @param {number}          options.wheelMultiplier — scroll speed multiplier
 * @param {boolean}         options.enabled   — toggle on/off
 */
export default function useSmoothScroll(
    containerRef,
    { lerp = 0.08, wheelMultiplier = 1, enabled = true } = {},
) {
    const targetRef = useRef(0)
    const currentRef = useRef(0)
    const rafRef = useRef(null)

    useEffect(() => {
        if (!enabled) return
        const el = containerRef.current
        if (!el) return

        /* Sync initial scroll position */
        targetRef.current = el.scrollTop
        currentRef.current = el.scrollTop

        /* Intercept wheel and use GSAP-lerp instead of native scroll */
        const onWheel = (e) => {
            e.preventDefault()
            targetRef.current += e.deltaY * wheelMultiplier
            /* Clamp to scroll bounds */
            const maxScroll = el.scrollHeight - el.clientHeight
            targetRef.current = Math.max(0, Math.min(targetRef.current, maxScroll))
        }

        /* rAF loop: lerp current toward target */
        const tick = () => {
            currentRef.current += (targetRef.current - currentRef.current) * lerp
            /* Stop sub-pixel jitter */
            if (Math.abs(targetRef.current - currentRef.current) < 0.5) {
                currentRef.current = targetRef.current
            }
            el.scrollTop = currentRef.current
            rafRef.current = requestAnimationFrame(tick)
        }

        /* Sync if user scrolls natively (e.g. keyboard, scrollbar drag) */
        const onScroll = () => {
            /* Only sync if the difference is large (means native scroll happened) */
            if (Math.abs(el.scrollTop - currentRef.current) > 50) {
                targetRef.current = el.scrollTop
                currentRef.current = el.scrollTop
            }
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        el.addEventListener('scroll', onScroll, { passive: true })
        rafRef.current = requestAnimationFrame(tick)

        return () => {
            el.removeEventListener('wheel', onWheel)
            el.removeEventListener('scroll', onScroll)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [containerRef, lerp, wheelMultiplier, enabled])
}