import { memo } from 'react'
import { EYE } from '../../constants/theme'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * Inner content for experience cards.
 *
 * Font strategy:
 *   Patrick Hand  → company title (20px+, handwritten warmth)
 *   DM Sans       → period, role, highlights (functional, crisp at small sizes)
 */
function CardInner({ exp, isHover, hovered }) {
  const m = useIsMobile()

  const titleCol  = isHover ? exp.hText : EYE.cream
  const subCol    = isHover ? `${exp.hText}bb` : 'rgba(255,255,255,0.45)'
  const dotCol    = isHover ? exp.hText : exp.color
  const hlCol     = isHover ? `${exp.hText}cc` : 'rgba(255,255,255,0.4)'
  const periodCol = isHover ? `${exp.hText}99` : exp.color

  return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: m ? '3px 3px' : '11px 12px',
        pointerEvents: 'none',
      }}>
        {/* Period — DM Sans label */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: m ? 5 : 8, fontWeight: 700,
          letterSpacing: m ? 0.8 : 1.5, textTransform: 'uppercase',
          color: periodCol, marginBottom: m ? 1 : 5,
        }}>
          {exp.period}
        </div>

        {/* Title — Patrick Hand (large, readable) */}
        <h3 style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: m ? 16 : 'clamp(24px, 3.5vw, 42px)',
          fontWeight: 400, color: titleCol,
          lineHeight: 1, letterSpacing: 0,
          margin: 0, marginBottom: m ? 2 : 4,
          transform: isHover && hovered ? 'translateY(-1px)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.25,0,0,1)',
        }}>
          {exp.title}
        </h3>

        {/* Role — DM Sans (medium, clean) */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: m ? 7 : 15, fontWeight: 500,
          color: subCol, marginBottom: m ? 2 : 8,
        }}>
          {exp.role}
        </div>

        {/* Highlights — DM Sans (small, must be crisp) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 1 : 3, alignItems: 'center' }}>
          {exp.highlights.map((h, i) => (
              <div key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: m ? 5 : 11, color: hlCol,
                lineHeight: 1.5,
                display: 'flex', alignItems: 'center', gap: m ? 2 : 4,
              }}>
            <span style={{
              width: 2, height: 2, borderRadius: '50%',
              background: dotCol, opacity: 0.5, flexShrink: 0,
            }} />
                {h}
              </div>
          ))}
        </div>

        {/* Decorative line */}
        <div style={{
          width: isHover && hovered ? (m ? 13 : 25) : (m ? 7 : 14),
          height: 1, background: dotCol, opacity: 0.25,
          borderRadius: 1, marginTop: m ? 4 : 8,
          transition: 'width 0.5s cubic-bezier(0.25,0,0,1)',
        }} />
      </div>
  )
}

export default memo(CardInner)