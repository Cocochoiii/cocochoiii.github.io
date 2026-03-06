import { memo } from 'react'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * Inner content for project cards. Rendered twice per card
 * (normal + hover layer) so text remains readable during clip-path animation.
 */
function CardContent({ p, compact, hovered, isHover = false }) {
  const m = useIsMobile()
  const col = isHover ? p.hText : p.text

  const titleSize = m
    ? (compact ? 10 : 13)
    : (compact ? 'clamp(10px, 2.2vw, 14px)' : 'clamp(13px, 3vw, 21px)')

  const yearSize = m
    ? (compact ? 25 : 35)
    : (compact ? 'clamp(35px, 10vw, 55px)' : 'clamp(45px, 14vw, 90px)')

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: m
        ? (compact ? '5px 5px' : '7px 7px')
        : (compact ? '9px 10px' : '13px 14px'),
      pointerEvents: 'none',
    }}>
      {/* Year watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Playfair Display', serif",
        fontSize: yearSize, fontWeight: 900, fontStyle: 'italic',
        color: col, opacity: 0.06, lineHeight: 1, letterSpacing: -3,
        userSelect: 'none', whiteSpace: 'nowrap',
      }}>
        {p.year}
      </div>

      {/* Year label */}
      <div style={{
        position: 'absolute',
        top: m ? 4 : (compact ? 8 : 12),
        left: m ? 5 : (compact ? 10 : 14),
        fontFamily: "'DM Sans', sans-serif",
        fontSize: m ? 5 : 6, fontWeight: 700,
        letterSpacing: 1.5, color: col, opacity: 0.3,
      }}>
        {p.year}
      </div>

      {/* Arrow (hover layer only) */}
      {isHover && (
        <div style={{
          position: 'absolute',
          top: m ? 4 : (compact ? 7 : 11),
          right: m ? 5 : (compact ? 9 : 13),
          opacity: hovered ? 0.6 : 0,
          transform: hovered ? 'translate(0,0)' : 'translate(-3px, 3px)',
          transition: 'all 0.4s cubic-bezier(0.25,0,0,1)',
        }}>
          <svg width={m ? 7 : 9} height={m ? 7 : 9} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8">
            <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: titleSize, fontWeight: 800,
        color: col, lineHeight: 1.05, letterSpacing: -0.5,
        margin: 0, marginBottom: m ? 2 : (compact ? 4 : 6),
        transform: isHover && hovered ? 'translateX(2px)' : 'translateX(0)',
        transition: 'transform 0.45s cubic-bezier(0.25,0,0,1)',
      }}>
        {p.title}
      </h3>

      {/* Meta */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: m ? 5 : 7, fontWeight: 500,
        letterSpacing: 0.6, color: col, opacity: 0.55,
        textTransform: 'uppercase', lineHeight: 1.5,
      }}>
        {p.meta}
      </div>

      {/* Decorative line */}
      <div style={{
        width: isHover && hovered ? (m ? 13 : 25) : (m ? 8 : 15),
        height: 1.25, background: col, opacity: 0.2,
        borderRadius: 1.5,
        marginTop: m ? 3 : (compact ? 5 : 7),
        transition: 'width 0.5s cubic-bezier(0.25,0,0,1)',
      }} />
    </div>
  )
}

export default memo(CardContent)
