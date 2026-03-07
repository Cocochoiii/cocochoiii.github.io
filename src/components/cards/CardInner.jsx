import { memo } from 'react'
import { EYE } from '../../constants/theme'
import useIsMobile from '../../hooks/useIsMobile'

// 关键：在组件外层定义样式，确保字体生效并开启抗锯齿
const CARD_STYLE_FIX = `
  @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
  .patrick-font {
    font-family: 'Patrick Hand', cursive !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`

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
        <style>{CARD_STYLE_FIX}</style>

        {/* Period */}
        <div className="patrick-font" style={{
          fontSize: m ? 9 : 12,
          fontWeight: 400,
          letterSpacing: 0,
          textTransform: 'uppercase',
          color: periodCol, marginBottom: m ? 1 : 4,
        }}>
          {exp.period}
        </div>

        {/* Title */}
        <h3 className="patrick-font" style={{
          fontSize: m ? 18 : 'clamp(24px, 3.5vw, 44px)',
          fontWeight: 400, color: titleCol,
          lineHeight: 0.9, // 调低行高，匹配 About 页面的紧凑感
          letterSpacing: 0,
          margin: 0, marginBottom: m ? 2 : 5,
          transform: isHover && hovered ? 'translateY(-1px)' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.25,0,0,1)',
        }}>
          {exp.title}
        </h3>

        {/* Role */}
        <div className="patrick-font" style={{
          fontSize: m ? 11 : 18,
          fontWeight: 400,
          color: subCol, marginBottom: m ? 2 : 10,
        }}>
          {exp.role}
        </div>

        {/* Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 1 : 3, alignItems: 'center' }}>
          {exp.highlights.map((h, i) => (
              <div key={i} className="patrick-font" style={{
                fontSize: m ? 9 : 13, color: hlCol,
                lineHeight: 1.2,
                display: 'flex', alignItems: 'center', gap: m ? 2 : 5,
              }}>
                <span style={{
                  width: 3, height: 3, borderRadius: '50%',
                  background: dotCol, opacity: 0.6, flexShrink: 0,
                }} />
                {h}
              </div>
          ))}
        </div>

        {/* Decorative line */}
        <div style={{
          width: isHover && hovered ? (m ? 15 : 30) : (m ? 8 : 16),
          height: 1.5, background: dotCol, opacity: 0.3,
          borderRadius: 1, marginTop: m ? 6 : 12,
          transition: 'width 0.5s cubic-bezier(0.25,0,0,1)',
        }} />
      </div>
  )
}

export default memo(CardInner)