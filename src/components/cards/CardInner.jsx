import { memo } from 'react'
import { EYE } from '../../constants/theme'
import useIsMobile from '../../hooks/useIsMobile'

function CardInner({ exp, isHover, hovered }) {
  const m = useIsMobile()
  const titleCol  = isHover ? exp.hText : EYE.cream
  const subCol    = isHover ? `${exp.hText}bb` : 'rgba(255,255,255,0.45)'
  const dotCol    = isHover ? exp.hText : exp.color
  const hlCol     = isHover ? `${exp.hText}cc` : 'rgba(255,255,255,0.4)'
  const periodCol = isHover ? `${exp.hText}99` : exp.color

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: m ? '6px 6px' : '11px 12px', pointerEvents: 'none' }}>
      {/* period: orig 15/3/12 */}
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 8, fontWeight: 700, letterSpacing: m ? 0.8 : 1.5, textTransform: 'uppercase', color: periodCol, marginBottom: m ? 2 : 6 }}>{exp.period}</div>
      {/* title: orig clamp(80px,3vw,40px)→always 80px, half=40 */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 16 : 'clamp(20px, 3vw, 40px)', fontWeight: 800, color: titleCol, lineHeight: 1.05, letterSpacing: -0.25, margin: 0, marginBottom: m ? 1 : 3, transform: isHover && hovered ? 'translateY(-1px)' : 'none', transition: 'transform 0.4s cubic-bezier(0.25,0,0,1)' }}>{exp.title}</h3>
      {/* role: orig 40, half=20 */}
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 8 : 20, fontWeight: 500, color: subCol, marginBottom: m ? 3 : 8 }}>{exp.role}</div>
      {/* highlights: orig 25/gap5/gap8, half=13/3/4 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 1 : 3, alignItems: 'center' }}>
        {exp.highlights.map((h, i) => (
          <div key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 5 : 13, color: hlCol, lineHeight: 1.45, display: 'flex', alignItems: 'center', gap: m ? 2 : 4 }}>
            {/* dot: orig 4x4, half=2x2 */}
            <span style={{ width: 2, height: 2, borderRadius: '50%', background: dotCol, opacity: 0.5, flexShrink: 0 }} />{h}
          </div>
        ))}
      </div>
      {/* line: orig 28/50 h2 mt16, half=14/25 h1 mt8 */}
      <div style={{ width: isHover && hovered ? (m ? 13 : 25) : (m ? 7 : 14), height: 1, background: dotCol, opacity: 0.25, borderRadius: 1, marginTop: m ? 4 : 8, transition: 'width 0.5s cubic-bezier(0.25,0,0,1)' }} />
    </div>
  )
}
export default memo(CardInner)
