import { memo } from 'react'
import useIsMobile from '../../hooks/useIsMobile'

// 注入字体和抗锯齿优化，确保与 About 页面渲染效果完全一致
const CARD_STYLE_FIX = `
  @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
  .patrick-font {
    font-family: 'Patrick Hand', cursive !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`

/**
 * Inner content for project cards. Rendered twice per card
 * (normal + hover layer) so text remains readable during clip-path animation.
 */
function CardContent({ p, compact, hovered, isHover = false }) {
  const m = useIsMobile()
  const col = isHover ? p.hText : p.text

  // Patrick Hand 视觉上比无衬线体小，适当增加 2-3px 的基础字号
  const titleSize = m
                    ? (compact ? 10 : 13)
                    : (compact ? 'clamp(13px, 2.5vw, 18px)' : 'clamp(16px, 3.5vw, 26px)')

  const yearSize = m
                   ? (compact ? 18 : 25)
                   : (compact ? 'clamp(35px, 10vw, 55px)' : 'clamp(45px, 14vw, 90px)')

  return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: m
                 ? (compact ? '4px 5px' : '5px 6px')
                 : (compact ? '9px 10px' : '13px 14px'),
        pointerEvents: 'none',
      }}>
        <style>{CARD_STYLE_FIX}</style>

        {/* Year watermark */}
        <div className="patrick-font" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: yearSize, fontWeight: 400,
          color: col, opacity: 0.06, lineHeight: 1, letterSpacing: -2,
          userSelect: 'none', whiteSpace: 'nowrap',
        }}>
          {p.year}
        </div>

        {/* Year label - 替换为 Patrick Hand 并调整字号和间距 */}
        <div className="patrick-font" style={{
          position: 'absolute',
          top: m ? 4 : (compact ? 8 : 12),
          left: m ? 5 : (compact ? 10 : 14),
          fontSize: m ? 8 : 10, fontWeight: 400,
          letterSpacing: 0.5, color: col, opacity: 0.4,
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
              <svg width={m ? 8 : 10} height={m ? 8 : 10} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
        )}

        {/* Title */}
        <h3 className="patrick-font" style={{
          fontSize: titleSize, fontWeight: 400,
          color: col, lineHeight: 0.95, letterSpacing: 0,
          margin: 0, marginBottom: m ? 2 : (compact ? 4 : 6),
          transform: isHover && hovered ? 'translateX(2px)' : 'translateX(0)',
          transition: 'transform 0.45s cubic-bezier(0.25,0,0,1)',
        }}>
          {p.title}
        </h3>

        {/* Meta - 替换为 Patrick Hand */}
        <div className="patrick-font" style={{
          fontSize: m ? 8 : 11, fontWeight: 400,
          letterSpacing: 0, color: col, opacity: 0.6,
          textTransform: 'uppercase', lineHeight: 1.2,
        }}>
          {p.meta}
        </div>

        {/* Decorative line */}
        <div style={{
          width: isHover && hovered ? (m ? 15 : 28) : (m ? 8 : 16),
          height: 1.5, background: col, opacity: 0.3,
          borderRadius: 1.5,
          marginTop: m ? 3 : (compact ? 5 : 7),
          transition: 'width 0.5s cubic-bezier(0.25,0,0,1)',
        }} />
      </div>
  )
}

export default memo(CardContent)