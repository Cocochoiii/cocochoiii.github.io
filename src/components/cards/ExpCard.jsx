import { useRef, useState, memo, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import CardInner from './CardInner'

function ExpCard({ exp, className = '', style = {} }) {
  const cardRef  = useRef(null)
  const hoverRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const isTouchRef = useRef(false)

  /* Detect touch device once */
  useEffect(() => { isTouchRef.current = 'ontouchstart' in window }, [])

  const onMove = useCallback((e) => {
    if (isTouchRef.current) return
    const c = cardRef.current
    if (!c) return
    const r = c.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    gsap.to(c, { rotateY: x * 5, rotateX: -y * 5, duration: 0.4, ease: 'power2.out' })
  }, [])

  const reveal = useCallback(() => {
    setHovered(true)
    if (hoverRef.current) {
      gsap.fromTo(hoverRef.current,
        { clipPath: 'circle(0% at 50% 0%)' },
        { clipPath: 'circle(150% at 50% 0%)', duration: 0.6, ease: 'power3.out' },
      )
    }
  }, [])

  const hide = useCallback(() => {
    setHovered(false)
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' })
    if (hoverRef.current) gsap.to(hoverRef.current, { clipPath: 'circle(0% at 50% 0%)', duration: 0.4, ease: 'power2.in' })
  }, [])

  /* Desktop: mouse hover. Mobile: tap toggles. */
  const onMouseEnter = useCallback(() => { if (!isTouchRef.current) reveal() }, [reveal])
  const onMouseLeave = useCallback(() => { if (!isTouchRef.current) hide() }, [hide])

  const onClick = useCallback(() => {
    if (!isTouchRef.current) return
    if (hovered) hide(); else reveal()
  }, [hovered, reveal, hide])

  return (
    <div ref={cardRef} className={`exp-card ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden',
        position: 'relative', cursor: 'default', perspective: 800,
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'box-shadow 0.5s cubic-bezier(0.25,0,0,1)',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.3), 0 0 60px ${exp.color}10` : 'none',
        ...style,
      }}
      onMouseMove={onMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.25, background: `linear-gradient(90deg, ${exp.color}, ${exp.color}33)`, zIndex: 3 }} />
      <CardInner exp={exp} isHover={false} hovered={hovered} />
      <div ref={hoverRef} style={{ position: 'absolute', inset: 0, background: exp.hBg, clipPath: 'circle(0% at 50% 0%)', zIndex: 1 }}>
        <CardInner exp={exp} isHover={true} hovered={hovered} />
      </div>
    </div>
  )
}
export default memo(ExpCard)
