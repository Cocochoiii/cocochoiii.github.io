import { useState, useRef, useEffect, useCallback, memo } from 'react'
import gsap from 'gsap'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'

/*
 * ChatSection — shared AI chat panel with per-page visual cohesion.
 *
 * config.bg         — section background color
 * config.parentBg   — page above (gradient transition)
 * config.theme      — 'light' | 'dark' — controls chat window interior
 * config.titleColor — header/footer text color (null = auto from theme)
 * config.cardStyle  — 'default' | 'gallery' | 'popart'
 */

const CSS = `
@keyframes chatDot{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-4px);opacity:.7}}
.typing-dot{animation:chatDot 1.3s ease-in-out infinite}.typing-dot:nth-child(2){animation-delay:.15s}.typing-dot:nth-child(3){animation-delay:.3s}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-in{animation:msgIn .25s ease-out forwards}
.ch-input:focus{outline:none}.ch-input{resize:none;overflow:hidden}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
.stream-cursor{display:inline-block;width:1.5px;height:1em;background:currentColor;opacity:0.5;margin-left:1px;vertical-align:text-bottom;animation:cursorBlink .8s ease-in-out infinite}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes sparkleRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes thinkPulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
.think-spinner{animation:sparkleRotate 3s linear infinite}
.think-pulse{animation:thinkPulse 1.5s ease-in-out infinite}
`

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

/* ─── Window theme: controls chat interior colors ─── */
function wTheme(theme) {
    const dark = theme === 'dark'
    return {
        dark,
        text:         dark ? EYE.cream : EYE.shadow,
        textSub:      dark ? 'rgba(240,232,220,0.55)' : 'rgba(61,47,42,0.55)',
        textMuted:    dark ? 'rgba(240,232,220,0.2)' : 'rgba(61,47,42,0.2)',
        bubbleAssist: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.85)',
        bubbleBorder: dark ? 'rgba(255,255,255,0.08)' : 'rgba(61,47,42,0.08)',
        bubbleShadow: dark ? 'none' : '0 1px 4px rgba(61,47,42,0.06)',
        winBg:        dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.65)',
        winBorder:    dark ? 'rgba(255,255,255,0.06)' : 'rgba(61,47,42,0.08)',
        winShadow:    dark
                      ? '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'
                      : '0 4px 30px rgba(61,47,42,0.08), inset 0 1px 0 rgba(255,255,255,0.7)',
        inputBg:      dark ? 'rgba(255,255,255,0.05)' : 'rgba(61,47,42,0.04)',
        inputBorder:  dark ? 'rgba(255,255,255,0.08)' : 'rgba(61,47,42,0.1)',
        placeholder:  dark ? 'rgba(240,232,220,0.2)' : 'rgba(61,47,42,0.3)',
        pillText:     dark ? 'rgba(240,232,220,0.5)' : `${EYE.shadow}80`,
        pillHover:    dark ? EYE.cream : EYE.shadow,
        divider:      dark ? 'rgba(255,255,255,0.04)' : 'rgba(61,47,42,0.06)',
        sendDisabled: dark ? 'rgba(255,255,255,0.05)' : 'rgba(61,47,42,0.05)',
        sendDisColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(61,47,42,0.2)',
    }
}

/* ─── Gallery frame corners ─── */
function FrameCorner({ pos, color, mobile }) {
    const len = mobile ? 10 : 16; const thick = mobile ? 1 : 1.5; const gap = mobile ? 3 : 5
    const isTop = pos[0] === 't'; const isLeft = pos[1] === 'l'
    return (
        <div style={{ position: 'absolute', top: isTop ? gap : 'auto', bottom: isTop ? 'auto' : gap, left: isLeft ? gap : 'auto', right: isLeft ? 'auto' : gap, pointerEvents: 'none', zIndex: 4 }}>
            <div style={{ position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0, width: len, height: thick, background: color, opacity: 0.3, borderRadius: 0.5 }} />
            <div style={{ position: 'absolute', top: 0, [isLeft ? 'left' : 'right']: 0, width: thick, height: len, background: color, opacity: 0.3, borderRadius: 0.5 }} />
        </div>
    )
}

/* ─── Thinking block ─── */
function SparkleIcon({ size = 14, color }) {
    return (<svg className="think-spinner" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/><circle cx="12" cy="12" r="3" strokeWidth="1.2"/></svg>)
}

function ThinkingBlock({ accent, mobile, elapsed, w }) {
    return (
        <div className="msg-in" style={{ display: 'flex', marginBottom: 8 }}>
            <div style={{ width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${accent}18, ${EYE.skin}12)`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: mobile ? 6 : 8, marginTop: 2, fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 10 : 12, color: w.text }}>C</div>
            <div style={{ maxWidth: mobile ? '80%' : '65%', borderRadius: '16px 16px 16px 4px', background: w.bubbleAssist, border: `1px solid ${w.bubbleBorder}`, overflow: 'hidden' }}>
                <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accent}40, ${accent}60, ${accent}40, transparent)`, backgroundSize: '200% 100%', animation: 'shimmer 1.8s ease-in-out infinite' }} />
                <div style={{ padding: mobile ? '10px 12px' : '12px 16px', display: 'flex', alignItems: 'center', gap: mobile ? 8 : 10 }}>
                    <SparkleIcon size={mobile ? 13 : 15} color={accent} />
                    <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 11 : 12.5, fontWeight: 500, color: w.text, opacity: 0.7 }}>Thinking</div>
                        <div className="think-pulse" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 9 : 10, color: w.textSub, marginTop: 2 }}>
                            {elapsed < 1 ? 'Analyzing your question...' : elapsed < 2 ? 'Looking through my experience...' : 'Preparing a thoughtful response...'}
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 9 : 10, color: w.textMuted, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{elapsed.toFixed(0)}s</div>
                </div>
            </div>
        </div>
    )
}

function useElapsed(running) {
    const [elapsed, setElapsed] = useState(0); const startRef = useRef(null); const rafRef = useRef(null)
    useEffect(() => { if (running) { startRef.current = Date.now(); const tick = () => { setElapsed((Date.now() - startRef.current) / 1000); rafRef.current = requestAnimationFrame(tick) }; rafRef.current = requestAnimationFrame(tick) } else { setElapsed(0); if (rafRef.current) cancelAnimationFrame(rafRef.current) }; return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) } }, [running])
    return elapsed
}

/* ─── Bubble ─── */
const Bubble = memo(function Bubble({ msg, mobile, accent, streaming, w }) {
    const isUser = msg.role === 'user'
    return (
        <div className="msg-in" style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: mobile ? 8 : 12, padding: '0 2px' }}>
            {!isUser && (<div style={{ width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${accent}18, ${EYE.skin}12)`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: mobile ? 6 : 8, marginTop: 2, fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 10 : 12, color: w.text }}>C</div>)}
            <div style={{ maxWidth: mobile ? '84%' : '72%', padding: mobile ? '10px 13px' : '12px 16px', borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isUser ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : w.bubbleAssist, border: isUser ? 'none' : `1px solid ${w.bubbleBorder}`, color: isUser ? '#fff' : w.text, fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 12 : 13.5, lineHeight: 1.65, fontWeight: isUser ? 600 : 400, whiteSpace: 'pre-line', boxShadow: isUser ? `0 3px 12px ${accent}25` : w.bubbleShadow }}>
                {msg.text}{streaming && <span className="stream-cursor" />}
            </div>
        </div>
    )
})

/* ─── Welcome ─── */
function WelcomeScreen({ questions, accent, mobile, onAsk, w }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: mobile ? '0 8px' : '0 20px' }}>
            <div style={{ width: mobile ? 40 : 50, height: mobile ? 40 : 50, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}15, ${EYE.skin}10)`, border: `1.5px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: mobile ? 10 : 14 }}>
                <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 18 : 22, color: w.text, opacity: 0.5 }}>C</span>
            </div>
            <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 16 : 20, color: w.textMuted, lineHeight: 1.4, marginBottom: mobile ? 16 : 22 }}>What would you like to know?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: mobile ? 6 : 8, justifyContent: 'center', maxWidth: mobile ? '100%' : 480 }}>
                {questions.map((q) => (
                    <button key={q.key} className="ch-pill" onClick={() => onAsk(q)} style={{ background: 'none', border: `1px solid ${accent}28`, borderRadius: 20, padding: mobile ? '6px 12px' : '7px 15px', fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 10 : 11.5, fontWeight: 500, color: w.pillText, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s cubic-bezier(0.25,0,0,1)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.style.borderColor = `${accent}50`; e.currentTarget.style.color = w.pillHover }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = `${accent}28`; e.currentTarget.style.color = w.pillText }}
                    >{q.label}</button>
                ))}
            </div>
        </div>
    )
}

/* ─── Auto textarea ─── */
function AutoTextarea({ value, onChange, onKeyDown, placeholder, accent, mobile, w }) {
    const ref = useRef(null)
    useEffect(() => { const el = ref.current; if (!el) return; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, mobile ? 80 : 120) + 'px' }, [value, mobile])
    return (
        <textarea ref={ref} className="ch-input" rows={1} value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder}
                  style={{ flex: 1, background: w.inputBg, border: `1px solid ${w.inputBorder}`, borderRadius: 12, padding: mobile ? '10px 13px' : '11px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 12 : 13, color: w.text, transition: 'border-color 0.3s, box-shadow 0.3s', lineHeight: 1.5 }}
                  onFocus={(e) => { e.target.style.borderColor = `${accent}40`; e.target.style.boxShadow = `0 0 0 2px ${accent}0a` }}
                  onBlur={(e) => { e.target.style.borderColor = w.inputBorder; e.target.style.boxShadow = 'none' }}
        />
    )
}

/* ═══════════════════════════════════════ */
export default function ChatSection({ config }) {
    const {
        questions, responses, accent = EYE.rose,
        title = 'Ask me anything', subtitle = 'Conversation',
        bg = EYE.cream, parentBg = null, theme = 'light',
        titleColor = null, cardStyle = 'default',
    } = config
    const m = useIsMobile()
    const w = wTheme(theme)
    const hdr = titleColor || (w.dark ? EYE.cream : EYE.shadow)
    const hdrSub = titleColor || accent

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [phase, setPhase] = useState('idle')
    const [streamText, setStreamText] = useState('')
    const [revealed, setRevealed] = useState(false)
    const chatBodyRef = useRef(null); const sectionRef = useRef(null); const lastUserRef = useRef(null); const streamRef = useRef(null); const pendingRef = useRef(null)
    const hasMessages = messages.length > 0
    const thinkElapsed = useElapsed(phase === 'thinking')

    useEffect(() => { if (messages.length === 0) return; requestAnimationFrame(() => { if (lastUserRef.current) lastUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }) }, [messages])
    useEffect(() => { if ((phase === 'streaming' || phase === 'thinking') && chatBodyRef.current) chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' }) }, [streamText, phase, thinkElapsed])
    useEffect(() => { const el = sectionRef.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !revealed) setRevealed(true) }, { threshold: 0.08 }); obs.observe(el); return () => obs.disconnect() }, [revealed])
    useEffect(() => { if (!revealed) return; const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }); tl.fromTo('.ch-label', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }); tl.fromTo('.ch-win', { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3'); tl.fromTo('.ch-pill', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.03 }, '-=0.3'); return () => tl.kill() }, [revealed])
    useEffect(() => { return () => { if (streamRef.current) clearInterval(streamRef.current); if (pendingRef.current) clearTimeout(pendingRef.current) } }, [])

    const streamResponse = useCallback((fullText) => { let i = 0; setStreamText(''); setPhase('streaming'); streamRef.current = setInterval(() => { i++; if (i >= fullText.length) { clearInterval(streamRef.current); streamRef.current = null; setMessages((prev) => [...prev, { role: 'assistant', text: fullText }]); setStreamText(''); setPhase('idle') } else { setStreamText(fullText.slice(0, i)) } }, 18) }, [])
    const send = useCallback((question, key) => { if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null }; if (pendingRef.current) { clearTimeout(pendingRef.current); pendingRef.current = null }; setMessages((prev) => [...prev, { role: 'user', text: question }]); setPhase('thinking'); setStreamText(''); const answer = key ? (responses[key] || responses.fallback) : matchResponse(question, responses); const thinkTime = 2000 + Math.min(answer.length * 2, 1500); pendingRef.current = setTimeout(() => { pendingRef.current = null; streamResponse(answer) }, thinkTime) }, [responses, streamResponse])
    const handlePill = useCallback((q) => send(q.label, q.key), [send])
    const handleSubmit = useCallback(() => { const txt = input.trim(); if (!txt || phase !== 'idle') return; setInput(''); send(txt, null) }, [input, phase, send])
    const handleKey = useCallback((e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }, [handleSubmit])
    const trapWheel = useCallback((e) => { const el = chatBodyRef.current; if (!el) return; const { scrollTop, scrollHeight, clientHeight } = el; if (!(scrollTop <= 0 && e.deltaY < 0) && !(scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0)) e.stopPropagation() }, [])

    const asked = new Set(messages.filter((msg) => msg.role === 'user').map((msg) => { const match = questions.find((q) => q.label === msg.text); return match?.key }).filter(Boolean))
    const pills = questions.filter((q) => !asked.has(q.key))
    let lastUserIdx = -1; for (let i = messages.length - 1; i >= 0; i--) { if (messages[i].role === 'user') { lastUserIdx = i; break } }
    const isBusy = phase !== 'idle'
    const isGallery = cardStyle === 'gallery'; const isPopart = cardStyle === 'popart'

    return (
        <section ref={sectionRef} style={{ width: '100%', height: '100vh', minHeight: '100vh', scrollSnapAlign: 'start', background: bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: m ? '10px 8px 8px' : '14px 20px 10px' }}>
            <style>{CSS}{`.ch-input::placeholder{color:${w.placeholder}}`}</style>

            {/* Gradient transition from parent page */}
            {parentBg && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: m ? 80 : 120, background: `linear-gradient(180deg, ${parentBg} 0%, ${parentBg}80 30%, transparent 100%)`, pointerEvents: 'none', zIndex: 1 }} />}
            {/* Film grain */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: w.dark ? 0.04 : 0.025, mixBlendMode: w.dark ? 'overlay' : 'multiply', backgroundImage: GRAIN_SVG, backgroundSize: '120px 120px' }} />
            {/* Decorative radial */}
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: m ? 280 : 450, height: m ? 280 : 450, borderRadius: '50%', background: `radial-gradient(circle, ${accent}06 0%, transparent 65%)`, pointerEvents: 'none' }} />

            {/* Header */}
            <div className="ch-label" style={{ textAlign: 'center', marginTop: parentBg ? (m ? 50 : 70) : 0, marginBottom: m ? 6 : 10, opacity: 0, flexShrink: 0, position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 8, fontWeight: 600, letterSpacing: m ? 2 : 3, textTransform: 'uppercase', color: hdrSub, opacity: titleColor ? 0.8 : 0.6, marginBottom: m ? 3 : 5 }}>{subtitle}</div>
                <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: m ? 20 : 28, fontWeight: 400, color: hdr, lineHeight: 1.15 }}>
                    {title.split(/(\S+)$/).map((part, i) => i === 1 ? <span key={i} style={{ color: hdrSub, fontStyle: 'italic', opacity: titleColor ? 0.8 : 1 }}>{part}</span> : part)}
                </h2>
            </div>

            {/* Chat window */}
            <div className="ch-win" style={{ width: '100%', maxWidth: m ? '100%' : 720, flex: 1, minHeight: 0, position: 'relative', background: w.winBg, border: `1px solid ${w.winBorder}`, borderRadius: m ? 14 : 18, display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: 0, zIndex: 2, boxShadow: w.winShadow, backdropFilter: 'blur(16px)', ...(isPopart ? { borderLeft: `3px solid ${accent}` } : {}) }}>
                <div style={{ height: isGallery ? 2 : 1.5, flexShrink: 0, background: `linear-gradient(90deg, transparent, ${accent}${isGallery ? '40' : '25'}, ${EYE.skin}${isGallery ? '30' : '18'}, transparent)` }} />
                {isGallery && <><FrameCorner pos="tl" color={accent} mobile={m} /><FrameCorner pos="tr" color={accent} mobile={m} /><FrameCorner pos="bl" color={accent} mobile={m} /><FrameCorner pos="br" color={accent} mobile={m} /></>}

                <div ref={chatBodyRef} onWheel={trapWheel} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: m ? '14px 10px 6px' : '22px 22px 10px', WebkitOverflowScrolling: 'touch' }}>
                    {!hasMessages && phase === 'idle' && <WelcomeScreen questions={questions} accent={accent} mobile={m} onAsk={handlePill} w={w} />}
                    {messages.map((msg, i) => (<div key={i} ref={i === lastUserIdx ? lastUserRef : null}><Bubble msg={msg} mobile={m} accent={accent} streaming={false} w={w} /></div>))}
                    {phase === 'thinking' && <ThinkingBlock accent={accent} mobile={m} elapsed={thinkElapsed} w={w} />}
                    {phase === 'streaming' && streamText && <Bubble msg={{ role: 'assistant', text: streamText }} mobile={m} accent={accent} streaming={true} w={w} />}
                </div>

                {hasMessages && pills.length > 0 && phase === 'idle' && (
                    <div style={{ padding: m ? '6px 6px' : '8px 14px', display: 'flex', flexWrap: 'wrap', gap: m ? 4 : 6, justifyContent: 'center', borderTop: `1px solid ${w.divider}`, flexShrink: 0 }}>
                        {pills.map((q) => (
                            <button key={q.key} className="ch-pill" onClick={() => handlePill(q)} style={{ background: 'none', border: `1px solid ${accent}28`, borderRadius: 20, padding: m ? '4px 9px' : '5px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: m ? 9 : 10.5, fontWeight: 500, color: w.pillText, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.3s cubic-bezier(0.25,0,0,1)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.style.borderColor = `${accent}50`; e.currentTarget.style.color = w.pillHover }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = `${accent}28`; e.currentTarget.style.color = w.pillText }}
                            >{q.label}</button>
                        ))}
                    </div>
                )}

                <div style={{ padding: m ? '6px 8px 8px' : '8px 14px 10px', borderTop: `1px solid ${w.divider}`, display: 'flex', gap: m ? 6 : 8, alignItems: 'flex-end', flexShrink: 0 }}>
                    <AutoTextarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Type your question..." accent={accent} mobile={m} w={w} />
                    <button onClick={handleSubmit} disabled={!input.trim() || isBusy} style={{ width: m ? 36 : 40, height: m ? 36 : 40, borderRadius: 12, border: 'none', flexShrink: 0, background: input.trim() && !isBusy ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : w.sendDisabled, color: input.trim() && !isBusy ? '#fff' : w.sendDisColor, cursor: input.trim() && !isBusy ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', marginBottom: 1 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: m ? 4 : 8, flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 7, color: titleColor ? `${titleColor}20` : (w.dark ? 'rgba(240,232,220,0.06)' : 'rgba(61,47,42,0.1)'), letterSpacing: 2, textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>Coco Choi · 2025</div>
        </section>
    )
}

function matchResponse(question, responses) {
    const q = question.toLowerCase()
    const map = {
        work: ['work', 'experience', 'intern', 'job', 'career', 'company', 'employ', 'worked'],
        projects: ['project', 'built', 'build', 'app', 'website', 'made', 'create', 'ship'],
        skills: ['skill', 'tech', 'stack', 'language', 'framework', 'tool', 'code', 'program'],
        contact: ['contact', 'email', 'hire', 'reach', 'connect', 'phone', 'linkedin', 'github'],
        education: ['school', 'university', 'degree', 'study', 'gpa', 'northeastern', 'franklin'],
        about: ['who', 'yourself', 'introduce', 'hobby', 'interest', 'fun'],
        design: ['design', 'rive', 'animation', 'gsap', 'ui', 'ux', 'aesthetic', 'site', 'portfolio'],
        why: ['why', 'motivation', 'passion', 'love', 'enjoy', 'inspire'],
        ubiwell: ['ubiwell'], ubiwell_ios: ['ios module', 'tensorflow lite', 'on-device'],
        ubiwell_kafka: ['kafka', '50k', 'event-driven', 'event driven'],
        ubiwell_dash: ['dashboard', '100+', 'react dashboard', 'd3', 'plotly'],
        audi: ['audi'], audi_etl: ['etl', 'airflow', 'batch', 'spark streaming'],
        audi_snow: ['snowflake', 'dbt', 'warehouse', 'sql performance'],
        audi_ml: ['pyspark', 'predictive', 'maintenance', 'retention model'],
        mars: ['mars', 'hong kong'], mars_rt: ['socket', 'concurrent', 'websocket', 'real-time', 'realtime'],
        mars_db: ['geospatial', 'mongodb', 'mongoose', 'latency'],
        petparadise: ['pet paradise', 'pets', 'animals', 'cats', 'dogs', 'stripe', 'rescue', 'boarding'],
        pet_payment: ['payment', 'stripe', 'checkout', 'refund'],
        pet_ios: ['pet.*ios', 'companion app', 'face id', 'push notification'],
        frontend: ['frontend', 'front-end', 'css', 'react', 'next.js', 'nextjs', 'tailwind'],
        backend: ['backend', 'back-end', 'django', 'fastapi', 'node', 'server', 'api', 'python'],
        mobile: ['swiftui', 'swift', 'apple', 'malhae', 'korean'],
        media: ['media', 'recommender', 'recommendation', 'bert', 'pytorch', 'sagemaker'],
        media_ml: ['cold start', 'collaborative', 'matrix factor', 'lstm', 'contrastive'],
        media_infra: ['sagemaker', 'gpu', 'training time', 'observability', 'prometheus'],
        medsync: ['medsync', 'health.*analytics', 'medical'],
        medsync_cache: ['cache', 'lru', 'l1', 'l2', 'multi-tier'],
        charging: ['charging', 'e-charging', 'ev', 'electric'],
        iotplatform: ['iot platform', 'timescale', 'telemetry', 'fleet', 'anomaly'],
        adserve: ['adserve', 'ads', 'advertising', 'tensorflow'],
        marsecom: ['e-commerce', 'ecommerce', 'mars.*commerce', 'graphql.*mongo'],
        scale: ['scale', 'performance', 'throughput', 'million'],
        challenge: ['challenge', 'hard', 'difficult', 'problem', 'struggle', 'lesson'],
        team: ['team', 'collaborate', 'agile', 'scrum', 'review', 'teamwork'],
        conflict: ['conflict', 'disagree', 'disagreement', 'argument'],
        failure: ['fail', 'failure', 'mistake', 'wrong', 'bug'],
        leadership: ['leader', 'led', 'initiative', 'mentor'],
        architecture: ['architecture', 'system design', 'microservice', 'distributed', 'pattern'],
        tradeoffs: ['tradeoff', 'trade-off', 'decision', 'choose'],
        testing: ['test', 'coverage', 'tdd', 'unit test', 'jest', 'pytest'],
        devops: ['docker', 'kubernetes', 'k8s', 'ci/cd', 'github actions', 'deploy'],
        database: ['database', 'postgres', 'mongo', 'redis', 'timescale'],
        favorite: ['favorite', 'proud', 'best', 'most meaningful'],
    }
    for (const [key, words] of Object.entries(map)) {
        if (words.some((w) => q.includes(w))) return responses[key] || responses.fallback
    }
    return responses.fallback
}