import { memo } from 'react'
import useIsMobile from '../../hooks/useIsMobile'

function CardContent({ p, compact, hovered, isHover = false }) {
  const m = useIsMobile()
  const col = isHover ? p.hText : p.text
  /* orig: normal clamp(26px,3vw,42px) compact clamp(20px,2.2vw,28px) → half min/max, keep vw */
  const titleSize = m
    ? (compact ? 10 : 13)
    : (compact ? 'clamp(10px, 2.2vw, 14px)' : 'clamp(13px, 3vw, 21px)')
  /* orig: normal clamp(90px,14vw,180px) compact clamp(70px,10vw,110px) → half min/max, keep vw */
  const yearSize = m
    ? (compact ? 25 : 35)
    : (compact ? 'clamp(35px, 10vw, 55px)' : 'clamp(45px, 14vw, 90px)')

  return (
    /* orig padding: normal '26px 28px' compact '18px 20px' → '13px 14px' / '9px 10px' */
    <div style={{ position: 'absolute', inset: 0, zIndex: isHover ? 2 : 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: m ? (compact ? '5px 5px' : '7px 7px') : (compact ? '9px 10px' : '13px 14px'), pointerEvents: 'none' }}>
      {/* year watermark: letterSpacing orig -6 → -3 */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: "'Playfair Display', serif", fontSize: yearSize, fontWeight: 900, fontStyle: 'italic', color: col, opacity: 0.06, lineHeight: 1, letterSpacing: -3, userSelect: 'none', whiteSpace: 'nowrap' }}>{p.year}</div>
      {/* year label: orig fontSize 11→6, letterSpacing 3→1.5, top 24/16→12/8, left 28/20→14/10 */}
      <div style={{ position: 'absolute', top: m ? 4 : (compact ? 8 : 12), left: m ? 5 : (compact ? 10 : 14), fontFamily: "'DM Sans', sans-serif", fontSize: m ? 5 : 6, fontWeight: 700, letterSpacing: 1.5, color: col, opacity: 0.3 }}>{p.year}</div>
      {/* arrow: orig top 22/14→11/7, right 26/18→13/9, svg 18→9 */}
      {isHover && (
        <div style={{ position: 'absolute', top: m ? 4 : (compact ? 7 : 11), right: m ? 5 : (compact ? 9 : 13), opacity: hovered ? 0.6 : 0, transform: hovered ? 'translate(0,0)' : 'translate(-3px, 3px)', transition: 'all 0.4s cubic-bezier(0.25,0,0,1)' }}>
          <svg width={m ? 7 : 9} height={m ? 7 : 9} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      )}
      {/* title: marginBottom orig compact?8:12 → 4:6 */}
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: titleSize, fontWeight: 800, color: col, lineHeight: 1.05, letterSpacing: -0.5, margin: 0, marginBottom: m ? 2 : (compact ? 4 : 6), transform: isHover && hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 0.45s cubic-bezier(0.25,0,0,1)' }}>{p.title}</h3>
      {/* meta: orig compact?13:14→7, letterSpacing 1.2→0.6 */}
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 5 : 7, fontWeight: 500, letterSpacing: 0.6, color: col, opacity: 0.55, textTransform: 'uppercase', lineHeight: 1.5 }}>{p.meta}</div>
      {/* line: orig 30/50→15/25, h 2.5→1.25, mt compact?10:14→5:7 */}
      <div style={{ width: isHover && hovered ? (m ? 13 : 25) : (m ? 8 : 15), height: 1.25, background: col, opacity: 0.2, borderRadius: 1.5, marginTop: m ? 3 : (compact ? 5 : 7), transition: 'width 0.5s cubic-bezier(0.25,0,0,1)' }} />
    </div>
  )
}
export default memo(CardContent)
