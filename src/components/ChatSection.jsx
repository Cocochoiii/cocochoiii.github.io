import { useState, useRef, useEffect, useCallback, memo } from 'react'
import gsap from 'gsap'
import useIsMobile from '../hooks/useIsMobile'
import { EYE } from '../constants/theme'

/*
 * ChatSection — reusable AI chat panel for any page.
 *
 * Props:
 *   config.questions  — array of { key, label }
 *   config.responses  — object keyed by question key → answer string
 *   config.accent     — hex color for user bubbles
 *   config.title      — heading text
 *   config.subtitle   — small label above title
 */

const CSS = `
@keyframes chatDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:.8}}
.typing-dot{animation:chatDot 1.3s ease-in-out infinite}.typing-dot:nth-child(2){animation-delay:.15s}.typing-dot:nth-child(3){animation-delay:.3s}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-in{animation:msgIn .25s ease-out forwards}
.ch-input::placeholder{color:rgba(255,255,255,.18)}.ch-input:focus{outline:none}
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

const Bubble = memo(function Bubble({ msg, mobile, accent }) {
    const isUser = msg.role === 'user'
    return (
        <div className="msg-in" style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: mobile ? 8 : 12, padding: '0 2px' }}>
            {!isUser && (
                <div style={{ width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${accent}30, ${EYE.skin}20)`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: mobile ? 6 : 8, marginTop: 2, fontFamily: "'Patrick Hand', cursive", fontSize: mobile ? 10 : 12, color: EYE.cream }}>C</div>
            )}
            <div style={{
                maxWidth: mobile ? '84%' : '72%', padding: mobile ? '10px 13px' : '12px 16px',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : 'rgba(255,255,255,0.04)',
                border: isUser ? 'none' : '1px solid rgba(255,255,255,0.05)',
                color: isUser ? '#fff' : 'rgba(255,255,255,0.7)',
                fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? 12 : 13.5, lineHeight: 1.65,
                fontWeight: isUser ? 600 : 400, whiteSpace: 'pre-line',
            }}>{msg.text}</div>
        </div>
    )
})

export default function ChatSection({ config }) {
    const { questions, responses, accent = EYE.rose, title = 'Ask me anything', subtitle = 'Conversation' } = config
    const m = useIsMobile()
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [typing, setTyping] = useState(false)
    const [revealed, setRevealed] = useState(false)
    const chatBodyRef = useRef(null)
    const sectionRef = useRef(null)
    const lastUserRef = useRef(null)

    /* Scroll to user message context */
    useEffect(() => {
        if (messages.length === 0) return
        requestAnimationFrame(() => {
            if (lastUserRef.current) lastUserRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }, [messages])

    useEffect(() => {
        if (typing && chatBodyRef.current) chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' })
    }, [typing])

    /* Entrance */
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

    const send = useCallback((question, key) => {
        setMessages((prev) => [...prev, { role: 'user', text: question }])
        setTyping(true)
        const answer = key ? (responses[key] || responses.fallback) : matchResponse(question, responses)
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
            setTyping(false)
        }, 350 + Math.min(answer.length, 600))
    }, [responses])

    const handlePill = useCallback((q) => send(q.label, q.key), [send])
    const handleSubmit = useCallback(() => { const t = input.trim(); if (!t || typing) return; setInput(''); send(t, null) }, [input, typing, send])
    const handleKey = useCallback((e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }, [handleSubmit])

    const trapWheel = useCallback((e) => {
        const el = chatBodyRef.current; if (!el) return
        const { scrollTop, scrollHeight, clientHeight } = el
        if (!(scrollTop <= 0 && e.deltaY < 0) && !(scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0)) e.stopPropagation()
    }, [])

    const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => { const match = questions.find((q) => q.label === m.text); return match?.key }).filter(Boolean))
    const pills = questions.filter((q) => !asked.has(q.key))
    let lastUserIdx = -1
    for (let i = messages.length - 1; i >= 0; i--) { if (messages[i].role === 'user') { lastUserIdx = i; break } }

    return (
        <section ref={sectionRef} style={{ width: '100%', height: '100vh', minHeight: '100vh', scrollSnapAlign: 'start', background: EYE.shadow, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: m ? '10px 8px 8px' : '14px 20px 10px' }}>
            <style>{CSS}</style>
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: m ? 280 : 450, height: m ? 280 : 450, borderRadius: '50%', background: `radial-gradient(circle, ${accent}05 0%, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, ${accent}10, transparent)` }} />

            {/* Header */}
            <div className="ch-label" style={{ textAlign: 'center', marginBottom: m ? 6 : 10, opacity: 0, flexShrink: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 8, fontWeight: 600, letterSpacing: m ? 2 : 3, textTransform: 'uppercase', color: accent, opacity: 0.5, marginBottom: m ? 3 : 5 }}>{subtitle}</div>
                <h2 style={{ fontFamily: "'Patrick Hand', cursive", fontSize: m ? 20 : 28, fontWeight: 400, color: EYE.cream, lineHeight: 1.15 }}>{title}</h2>
            </div>

            {/* Chat window */}
            <div className="ch-win" style={{ width: '100%', maxWidth: m ? '100%' : 720, flex: 1, minHeight: 0, background: 'rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: m ? 14 : 18, display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: 0, boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.02)' }}>
                <div style={{ height: 1.5, flexShrink: 0, background: `linear-gradient(90deg, transparent, ${accent}20, ${EYE.skin}15, transparent)` }} />

                {/* Messages */}
                <div ref={chatBodyRef} onWheel={trapWheel} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: m ? '14px 10px 6px' : '22px 22px 10px', WebkitOverflowScrolling: 'touch' }}>
                    {messages.length === 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Patrick Hand', cursive", fontSize: m ? 14 : 17, color: 'rgba(255,255,255,0.07)' }}>Pick a question or type your own...</div>
                        </div>
                    )}
                    {messages.map((msg, i) => (
                        <div key={i} ref={i === lastUserIdx ? lastUserRef : null}><Bubble msg={msg} mobile={m} accent={accent} /></div>
                    ))}
                    {typing && (
                        <div className="msg-in" style={{ display: 'flex', marginBottom: 8 }}>
                            <div style={{ width: m ? 22 : 26, height: m ? 22 : 26, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${accent}30, ${EYE.skin}20)`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: m ? 6 : 8, marginTop: 2, fontFamily: "'Patrick Hand', cursive", fontSize: m ? 10 : 12, color: EYE.cream }}>C</div>
                            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px 16px 16px 4px' }}><TypingDots accent={accent} /></div>
                        </div>
                    )}
                </div>

                {/* Pills */}
                {pills.length > 0 && (
                    <div style={{ padding: m ? '6px 6px' : '8px 14px', display: 'flex', flexWrap: 'wrap', gap: m ? 4 : 6, justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', flexShrink: 0 }}>
                        {pills.map((q) => (
                            <button key={q.key} className="ch-pill" onClick={() => handlePill(q)} style={{ background: 'none', border: `1px solid ${accent}22`, borderRadius: 20, padding: m ? '4px 9px' : '5px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: m ? 9 : 10.5, fontWeight: 500, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', whiteSpace: 'nowrap', opacity: 0, transition: 'all 0.3s cubic-bezier(0.25,0,0,1)' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}0d`; e.currentTarget.style.borderColor = `${accent}45`; e.currentTarget.style.color = EYE.cream }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = `${accent}22`; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                            >{q.label}</button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div style={{ padding: m ? '6px 8px 8px' : '8px 14px 10px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', gap: m ? 6 : 8, alignItems: 'center', flexShrink: 0 }}>
                    <input className="ch-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Type your question..."
                           style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: m ? '10px 13px' : '11px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: m ? 12 : 13, color: EYE.cream, transition: 'border-color 0.3s, box-shadow 0.3s' }}
                           onFocus={(e) => { e.target.style.borderColor = `${accent}35`; e.target.style.boxShadow = `0 0 0 2px ${accent}08` }}
                           onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.05)'; e.target.style.boxShadow = 'none' }}
                    />
                    <button onClick={handleSubmit} disabled={!input.trim() || typing} style={{ width: m ? 36 : 40, height: m ? 36 : 40, borderRadius: 12, border: 'none', flexShrink: 0, background: input.trim() && !typing ? `linear-gradient(135deg, ${accent}, ${accent}cc)` : 'rgba(255,255,255,0.04)', color: input.trim() && !typing ? '#fff' : 'rgba(255,255,255,0.12)', cursor: input.trim() && !typing ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: m ? 4 : 8, flexShrink: 0, fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 7, color: 'rgba(255,255,255,0.05)', letterSpacing: 2, textTransform: 'uppercase' }}>Coco Choi · 2025</div>
        </section>
    )
}

/* Keyword matcher */
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
        architecture: ['architecture', 'system design', 'microservice', 'distributed', 'pattern'],
    }
    for (const [key, words] of Object.entries(map)) {
        if (words.some((w) => q.includes(w))) return responses[key] || responses.fallback
    }
    return responses.fallback
}