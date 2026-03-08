import { useState, useRef, useEffect, useCallback, memo } from 'react'
import gsap from 'gsap'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'

const CSS = `
@keyframes chatDot{0%,80%,100%{transform:translateY(0);opacity:.3}40%{transform:translateY(-4px);opacity:.7}}
.typing-dot{animation:chatDot 1.3s ease-in-out infinite}.typing-dot:nth-child(2){animation-delay:.15s}.typing-dot:nth-child(3){animation-delay:.3s}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-in{animation:msgIn .25s ease-out forwards}
.ch-input::placeholder{color:rgba(61,47,42,0.25)}
.ch-input:focus{outline:none}
.ch-input{resize:none;overflow:hidden}
@keyframes cursorBlink{0%,100%{opacity:1}50%{opacity:0}}
.stream-cursor{display:inline-block;width:1.5px;height:1em;background:currentColor;opacity:0.5;margin-left:1px;vertical-align:text-bottom;animation:cursorBlink 0.8s ease-in-out infinite}
`

function TypingDots({ accent }) {
    return (
        <div style={{ display: 'flex', gap: 5, padding: '10px 16px', alignItems: 'center' }}>
            {[0, 1, 2].map((i) => (
                <div key={i} className="typing-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: accent }} />
            ))}
        </div>
    )
}

/* ─── Message bubble with streaming support ─── */
const Bubble = memo(function Bubble({ msg, mobile, accent, streaming }) {
    const isUser = msg.role === 'user'
    return (
        <div className="msg-in" style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: mobile ? 8 : 12, padding: '0 2px' }}>
            {!isUser && (
                <div style={{
                    width: mobile ? 22 : 26, height: mobile ? 22 : 26,
                    borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${accent}18, ${EYE.skin}12)`,
                    border: `1px solid ${accent}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginRight: mobile ? 6 : 8, marginTop: 2,
                    fontFamily: "'Patrick Hand', cursive",
                    fontSize: mobile ? 10 : 12, color: EYE.shadow,
                }}>C</div>
            )}
            <div style={{
                maxWidth: mobile ? '84%' : '72%', padding: mobile ? '10px 13px' : '12px 16px',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : 'rgba(255,255,255,0.7)',
                border: isUser ? 'none' : '1px solid rgba(61,47,42,0.06)',
                color: isUser ? '#fff' : EYE.shadow,
                fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 12 : 13.5, lineHeight: 1.65,
                fontWeight: isUser ? 600 : 400, whiteSpace: 'pre-line',
                boxShadow: isUser ? `0 3px 12px ${accent}25` : '0 1px 4px rgba(61,47,42,0.06)',
            }}>
                {msg.text}
                {streaming && <span className="stream-cursor" />}
            </div>
        </div>
    )
})

/* ─── Welcome screen (centered pills + avatar) ─── */
function WelcomeScreen({ questions, accent, mobile, onAsk }) {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '100%', textAlign: 'center', padding: mobile ? '0 8px' : '0 20px',
        }}>
            {/* Avatar */}
            <div style={{
                width: mobile ? 40 : 50, height: mobile ? 40 : 50, borderRadius: '50%',
                background: `linear-gradient(135deg, ${accent}15, ${EYE.skin}10)`,
                border: `1.5px solid ${accent}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: mobile ? 10 : 14,
            }}>
                <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 18 : 22, color: EYE.shadow, opacity: 0.7 }}>C</span>
            </div>

            <div style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: mobile ? 16 : 20, color: `${EYE.shadow}40`,
                lineHeight: 1.4, marginBottom: mobile ? 16 : 22,
            }}>
                What would you like to know?
            </div>

            {/* Centered suggested questions */}
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: mobile ? 6 : 8,
                justifyContent: 'center', maxWidth: mobile ? '100%' : 480,
            }}>
                {questions.map((q) => (
                    <button key={q.key} className="ch-pill" onClick={() => onAsk(q)} style={{
                        background: 'none', border: `1px solid ${accent}28`,
                        borderRadius: 20, padding: mobile ? '6px 12px' : '7px 15px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: mobile ? 10 : 11.5, fontWeight: 500,
                        color: `${EYE.shadow}80`, cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s cubic-bezier(0.25,0,0,1)',
                    }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.style.borderColor = `${accent}50`; e.currentTarget.style.color = EYE.shadow }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = `${accent}28`; e.currentTarget.style.color = `${EYE.shadow}80` }}
                    >{q.label}</button>
                ))}
            </div>
        </div>
    )
}

/* ─── Auto-resize textarea ─── */
function AutoTextarea({ value, onChange, onKeyDown, placeholder, accent, mobile }) {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, mobile ? 80 : 120) + 'px'
    }, [value, mobile])

    return (
        <textarea
            ref={ref}
            className="ch-input"
            rows={1}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            style={{
                flex: 1, background: 'rgba(61,47,42,0.03)',
                border: '1px solid rgba(61,47,42,0.08)',
                borderRadius: 12, padding: mobile ? '10px 13px' : '11px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: mobile ? 12 : 13, color: EYE.shadow,
                transition: 'border-color 0.3s, box-shadow 0.3s',
                lineHeight: 1.5,
            }}
            onFocus={(e) => { e.target.style.borderColor = `${accent}40`; e.target.style.boxShadow = `0 0 0 2px ${accent}0a` }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(61,47,42,0.08)'; e.target.style.boxShadow = 'none' }}
        />
    )
}

/* ═══════════════════════════════════════
 *  ChatSection
 * ═══════════════════════════════════════ */
export default function ChatSection({ config }) {
    const { questions, responses, accent = EYE.rose, title = 'Ask me anything', subtitle = 'Conversation' } = config
    const m = useIsMobile()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [phase, setPhase] = useState('idle') // 'idle' | 'thinking' | 'streaming'
    const [streamText, setStreamText] = useState('')
    const [revealed, setRevealed] = useState(false)
    const chatBodyRef = useRef(null)
    const sectionRef = useRef(null)
    const lastUserRef = useRef(null)
    const streamRef = useRef(null) // holds interval ID

    const hasMessages = messages.length > 0

    /* ── Scroll helpers ── */
    useEffect(() => {
        if (messages.length === 0) return
        requestAnimationFrame(() => {
            if (lastUserRef.current) lastUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }, [messages])

    /* Scroll during streaming */
    useEffect(() => {
        if (phase === 'streaming' && chatBodyRef.current) {
            chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' })
        }
    }, [streamText, phase])

    useEffect(() => {
        if (phase === 'thinking' && chatBodyRef.current) {
            chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' })
        }
    }, [phase])

    /* ── Entrance ── */
    useEffect(() => {
        const el = sectionRef.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !revealed) setRevealed(true) }, { threshold: 0.08 })
        obs.observe(el); return () => obs.disconnect()
    }, [revealed])

    useEffect(() => {
        if (!revealed) return
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo('.ch-label', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.1 })
        tl.fromTo('.ch-win', { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, '-=0.3')
        tl.fromTo('.ch-pill', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.03 }, '-=0.3')
        return () => tl.kill()
    }, [revealed])

    /* ── Cleanup stream on unmount ── */
    useEffect(() => {
        return () => { if (streamRef.current) clearInterval(streamRef.current) }
    }, [])

    /* ── Stream a response character by character ── */
    const streamResponse = useCallback((fullText) => {
        let i = 0
        setStreamText('')
        setPhase('streaming')

        streamRef.current = setInterval(() => {
            i++
            if (i >= fullText.length) {
                clearInterval(streamRef.current)
                streamRef.current = null
                setMessages((prev) => [...prev, { role: 'assistant', text: fullText }])
                setStreamText('')
                setPhase('idle')
            } else {
                /* Stream 1-3 chars per tick for natural speed variation */
                const chunk = fullText.slice(0, i)
                setStreamText(chunk)
            }
        }, 18)
    }, [])

    /* ── Send ── */
    const send = useCallback((question, key) => {
        /* Cancel any active stream */
        if (streamRef.current) {
            clearInterval(streamRef.current)
            streamRef.current = null
        }

        setMessages((prev) => [...prev, { role: 'user', text: question }])
        setPhase('thinking')
        setStreamText('')

        const answer = key ? (responses[key] || responses.fallback) : matchResponse(question, responses)
        const thinkDelay = 300 + Math.random() * 400

        setTimeout(() => {
            streamResponse(answer)
        }, thinkDelay)
    }, [responses, streamResponse])

    const handlePill = useCallback((q) => send(q.label, q.key), [send])
    const handleSubmit = useCallback(() => {
        const t = input.trim(); if (!t || phase !== 'idle') return
        setInput(''); send(t, null)
    }, [input, phase, send])
    const handleKey = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() }
    }, [handleSubmit])

    const trapWheel = useCallback((e) => {
        const el = chatBodyRef.current; if (!el) return
        const { scrollTop, scrollHeight, clientHeight } = el
        if (!(scrollTop <= 0 && e.deltaY < 0) && !(scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0)) e.stopPropagation()
    }, [])

    /* Remaining pills */
    const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => { const match = questions.find((q) => q.label === m.text); return match?.key }).filter(Boolean))
    const pills = questions.filter((q) => !asked.has(q.key))

    /* Last user message index for scroll anchor */
    let lastUserIdx = -1
    for (let i = messages.length - 1; i >= 0; i--) { if (messages[i].role === 'user') { lastUserIdx = i; break } }

    const isBusy = phase !== 'idle'

    return (
        <section ref={sectionRef} style={{
            width: '100%', height: '100vh', minHeight: '100vh',
            scrollSnapAlign: 'start', background: EYE.cream,
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: m ? '10px 8px 8px' : '14px 20px 10px',
        }}>
            <style>{CSS}</style>

            {/* Decorative */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: m ? 280 : 450, height: m ? 280 : 450, borderRadius: '50%', background: `radial-gradient(circle, ${accent}08 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, ${accent}18, ${EYE.skin}12, transparent)` }} />

            {/* Header */}
            <div className="ch-label" style={{ textAlign: 'center', marginBottom: m ? 6 : 10, opacity: 0, flexShrink: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 8, fontWeight: 600, letterSpacing: m ? 2 : 3, textTransform: 'uppercase', color: accent, opacity: 0.6, marginBottom: m ? 3 : 5 }}>{subtitle}</div>
                <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: m ? 20 : 28, fontWeight: 400, color: EYE.shadow, lineHeight: 1.15 }}>
                    {title.split(/(\S+)$/).map((part, i) =>
                                                   i === 1 ? <span key={i} style={{ color: accent, fontStyle: 'italic' }}>{part}</span> : part
                    )}
                </h2>
            </div>

            {/* Chat window */}
            <div className="ch-win" style={{
                width: '100%', maxWidth: m ? '100%' : 720,
                flex: 1, minHeight: 0,
                background: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(61,47,42,0.06)',
                borderRadius: m ? 14 : 18,
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden', opacity: 0,
                boxShadow: '0 4px 30px rgba(61,47,42,0.06), 0 1px 0 rgba(255,255,255,0.6) inset',
                backdropFilter: 'blur(12px)',
            }}>
                <div style={{ height: 1.5, flexShrink: 0, background: `linear-gradient(90deg, transparent, ${accent}25, ${EYE.skin}18, transparent)` }} />

                {/* Messages area */}
                <div ref={chatBodyRef} onWheel={trapWheel} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: m ? '14px 10px 6px' : '22px 22px 10px', WebkitOverflowScrolling: 'touch' }}>

                    {/* Welcome screen when no messages */}
                    {!hasMessages && phase === 'idle' && (
                        <WelcomeScreen questions={questions} accent={accent} mobile={m} onAsk={handlePill} />
                    )}

                    {/* Conversation */}
                    {messages.map((msg, i) => (
                        <div key={i} ref={i === lastUserIdx ? lastUserRef : null}>
                            <Bubble msg={msg} mobile={m} accent={accent} streaming={false} />
                        </div>
                    ))}

                    {/* Thinking dots */}
                    {phase === 'thinking' && (
                        <div className="msg-in" style={{ display: 'flex', marginBottom: 8 }}>
                            <div style={{ width: m ? 22 : 26, height: m ? 22 : 26, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${accent}18, ${EYE.skin}12)`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: m ? 6 : 8, marginTop: 2, fontFamily: "'Patrick Hand', cursive", fontSize: m ? 10 : 12, color: EYE.shadow }}>C</div>
                            <div style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(61,47,42,0.06)', borderRadius: '16px 16px 16px 4px' }}><TypingDots accent={accent} /></div>
                        </div>
                    )}

                    {/* Streaming bubble */}
                    {phase === 'streaming' && streamText && (
                        <Bubble msg={{ role: 'assistant', text: streamText }} mobile={m} accent={accent} streaming={true} />
                    )}
                </div>

                {/* Bottom pills — only show after first message */}
                {hasMessages && pills.length > 0 && phase === 'idle' && (
                    <div style={{ padding: m ? '6px 6px' : '8px 14px', display: 'flex', flexWrap: 'wrap', gap: m ? 4 : 6, justifyContent: 'center', borderTop: '1px solid rgba(61,47,42,0.04)', flexShrink: 0 }}>
                        {pills.map((q) => (
                            <button key={q.key} className="ch-pill" onClick={() => handlePill(q)} style={{
                                background: 'none', border: `1px solid ${accent}28`,
                                borderRadius: 20, padding: m ? '4px 9px' : '5px 12px',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: m ? 9 : 10.5, fontWeight: 500,
                                color: `${EYE.shadow}90`, cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s cubic-bezier(0.25,0,0,1)',
                            }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}10`; e.currentTarget.style.borderColor = `${accent}50`; e.currentTarget.style.color = EYE.shadow }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = `${accent}28`; e.currentTarget.style.color = `${EYE.shadow}90` }}
                            >{q.label}</button>
                        ))}
                    </div>
                )}

                {/* Input area — textarea with auto-resize */}
                <div style={{ padding: m ? '6px 8px 8px' : '8px 14px 10px', borderTop: '1px solid rgba(61,47,42,0.04)', display: 'flex', gap: m ? 6 : 8, alignItems: 'flex-end', flexShrink: 0 }}>
                    <AutoTextarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Type your question..."
                        accent={accent}
                        mobile={m}
                    />
                    <button onClick={handleSubmit} disabled={!input.trim() || isBusy} style={{
                        width: m ? 36 : 40, height: m ? 36 : 40, borderRadius: 12, border: 'none', flexShrink: 0,
                        background: input.trim() && !isBusy ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : 'rgba(61,47,42,0.05)',
                        color: input.trim() && !isBusy ? '#fff' : 'rgba(61,47,42,0.2)',
                        cursor: input.trim() && !isBusy ? 'pointer' : 'default',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
                        marginBottom: 1,
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: m ? 4 : 8, flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 7, color: 'rgba(61,47,42,0.1)', letterSpacing: 2, textTransform: 'uppercase' }}>Coco Choi · 2025</div>
        </section>
    )
}

/* ── Keyword matcher ── */
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
        ubiwell: ['ubiwell', 'healthcare', 'ml', 'machine learning', 'django'],
        audi: ['audi', 'iot', 'sensor', 'data engineer', 'spark', 'pipeline', 'etl'],
        mars: ['mars', 'hong kong', 'graphql', 'react native', 'ecommerce', 'socket'],
        petparadise: ['pet paradise', 'pets', 'animals', 'cats', 'dogs', 'stripe', 'rescue', 'boarding'],
        frontend: ['frontend', 'front-end', 'css', 'react', 'next.js', 'nextjs', 'swiftui', 'tailwind'],
        backend: ['backend', 'back-end', 'django', 'fastapi', 'node', 'server', 'api', 'python'],
        mobile: ['mobile', 'swiftui', 'ios', 'swift', 'apple', 'malhae', 'korean'],
        media: ['media', 'recommender', 'recommendation', 'bert', 'pytorch', 'sagemaker'],
        medsync: ['medsync', 'health', 'analytics', 'dashboard', 'medical'],
        charging: ['charging', 'e-charging', 'ev', 'electric'],
        iotplatform: ['iot platform', 'timescale', 'telemetry', 'fleet'],
        adserve: ['adserve', 'ads', 'advertising', 'tensorflow'],
        scale: ['scale', 'performance', 'latency', 'throughput', 'concurrent', 'million'],
        challenge: ['challenge', 'hard', 'difficult', 'problem', 'struggle', 'lesson', 'learn'],
        team: ['team', 'collaborate', 'leadership', 'agile', 'scrum', 'review'],
        teamwork: ['teamwork', 'collaborate', 'team'],
        conflict: ['conflict', 'disagree', 'disagreement', 'argument'],
        failure: ['fail', 'failure', 'mistake', 'wrong', 'bug'],
        architecture: ['architecture', 'system design', 'microservice', 'distributed', 'pattern'],
        tradeoffs: ['tradeoff', 'trade-off', 'decision', 'choose'],
        testing: ['test', 'testing', 'coverage', 'tdd', 'unit test'],
    }
    for (const [key, words] of Object.entries(map)) {
        if (words.some((w) => q.includes(w))) return responses[key] || responses.fallback
    }
    return responses.fallback
}