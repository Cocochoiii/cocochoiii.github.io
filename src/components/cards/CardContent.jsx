import { memo } from 'react'
import useIsMobile from '../../hooks/useIsMobile'

/*
 * Split "React · TypeScript · MongoDB" into individual techs.
 * First 2 are "headline" techs (bigger, bold), rest are "secondary" (smaller).
 * Mimics 1960s newspaper classified ad typesetting.
 */
function ClassifiedMeta({ meta, color, mobile, compact }) {
  const techs = meta.split(' · ')
  const headlineCount = 2

  const baseSize = mobile ? 5 : (compact ? 6 : 7)
  const bigSize  = mobile ? 6 : (compact ? 7.5 : 9)

  return (
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'baseline', gap: mobile ? '1px 3px' : '2px 4px',
        lineHeight: 1.6,
      }}>
        {techs.map((tech, i) => {
          const isHeadline = i < headlineCount
          return (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'baseline', gap: mobile ? 3 : 4 }}>
            {i > 0 && (
                <span style={{
                  fontSize: baseSize * 0.8,
                  color, opacity: 0.3,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                }}>
                ·
              </span>
            )}
                <span style={{
                  fontFamily: isHeadline ? "'Playfair Display', serif" : "'DM Sans', sans-serif",
                  fontSize: isHeadline ? bigSize : baseSize,
                  fontWeight: isHeadline ? 800 : 500,
                  fontStyle: isHeadline ? 'italic' : 'normal',
                  letterSpacing: isHeadline ? -0.3 : 0.6,
                  color,
                  opacity: isHeadline ? 0.7 : 0.45,
                  textTransform: isHeadline ? 'none' : 'uppercase',
                }}>
              {tech}
            </span>
          </span>
          )
        })}
      </div>
  )
}

/**
 * Inner content for project cards. Rendered twice per card
 * (normal + hover layer) so text remains readable during clip-path animation.
 */
function CardContent({ p, compact, hovered, isHover = false }) {
  const m = useIsMobile()
  const col = isHover ? p.hText : p.text

  const titleSize = m
                    ? (compact ? 8 : 10)
                    : (compact ? 'clamp(10px, 2.2vw, 14px)' : 'clamp(13px, 3vw, 21px)')

  const yearSize = m
                   ? (compact ? 18 : 25)
                   : (compact ? 'clamp(35px, 10vw, 55px)' : 'clamp(45px, 14vw, 90px)')

  /* Silkscreen shift amount — bigger on desktop, subtle on mobile */
  const shiftX = m ? 1.5 : 3
  const shiftY = m ? -1 : -2

  return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: m
                 ? (compact ? '4px 5px' : '5px 6px')
                 : (compact ? '9px 10px' : '13px 14px'),
        pointerEvents: 'none',
      }}>
        {/* Year watermark — silkscreen misregistration effect */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          {/* Ghost layer — shifted, more transparent (the "first print pass") */}
          <div style={{
            position: 'absolute', top: shiftY, left: shiftX,
            fontFamily: "'Playfair Display', serif",
            fontSize: yearSize, fontWeight: 900, fontStyle: 'italic',
            color: col, opacity: 0.03, lineHeight: 1, letterSpacing: -3,
          }}>
            {p.year}
          </div>
          {/* Main layer — the "second print pass" */}
          <div style={{
            position: 'relative',
            fontFamily: "'Playfair Display', serif",
            fontSize: yearSize, fontWeight: 900, fontStyle: 'italic',
            color: col, opacity: 0.06, lineHeight: 1, letterSpacing: -3,
          }}>
            {p.year}
          </div>
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

        {/* Meta — newspaper classified style */}
        <ClassifiedMeta meta={p.meta} color={col} mobile={m} compact={compact} />

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