import { memo } from 'react'
import { EYE } from '../../constants/theme'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * Inner content for experience cards. Rendered twice per card
 * (normal + hover layer) so text remains readable during clip-path animation.
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
      padding: m ? '4px 4px' : '11px 12px',
      pointerEvents: 'none',
    }}>
      {/* Period */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: m ? 4 : 8, fontWeight: 700,
        letterSpacing: m ? 0.8 : 1.5, textTransform: 'uppercase',
        color: periodCol, marginBottom: m ? 1 : 6,
      }}>
        {exp.period}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: m ? 11 : 'clamp(20px, 3vw, 40px)',
        fontWeight: 800, color: titleCol,
        lineHeight: 1.05, letterSpacing: -0.25,
        margin: 0, marginBottom: m ? 1 : 3,
        transform: isHover && hovered ? 'translateY(-1px)' : 'none',
        transition: 'transform 0.4s cubic-bezier(0.25,0,0,1)',
      }}>
        {exp.title}
      </h3>

      {/* Role */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: m ? 6 : 20, fontWeight: 500,
        color: subCol, marginBottom: m ? 2 : 8,
      }}>
        {exp.role}
      </div>

      {/* Highlights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 1 : 3, alignItems: 'center' }}>
        {exp.highlights.map((h, i) => (
          <div key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: m ? 4 : 13, color: hlCol,
            lineHeight: 1.45,
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
