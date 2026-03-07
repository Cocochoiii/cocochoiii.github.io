import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

import NavOverlay from './NavOverlay'
import AnimatedNumber from './shared/AnimatedNumber'
import useParallax from '../hooks/useParallax'
import useScrollReveal from '../hooks/useScrollReveal'
import useIsMobile from '../hooks/useIsMobile'
import { SKILLS, ABOUT_STATS, ABOUT_BIG_STATS, CONTACT_INFO, ABOUT_SOCIALS } from '../constants/data'

/*
 * Three artist palettes — each extracted from its Rive painting.
 * When the user clicks Da Vinci / Kahlo / Picasso inside the Rive,
 * the entire hero text + stats recolor to match.
 */
const ARTISTS = [
  {
    key: 'davinci',
    label: 'Da Vinci',
    name: '#D8995C',       /* warm skin gold */
    accent: '#C47C47',     /* blush */
    text: '#D8995Cbb',     /* bio primary */
    sub: '#928544cc',      /* bio secondary */
    stat: ['#C47C47', '#D8995C', '#928544'],
    labelColor: '#928544',
    divider: '#C47C47',
    bio: 'Part engineer, part artist. I paint with code the way Da Vinci painted with light — layering logic, design, and motion into experiences that feel alive.',
    bio2: 'Like the sfumato technique, I blend engineering and aesthetics until the seams disappear. Three studios shaped my craft:',
    quote: 'Details make perfection, and perfection is not a detail — every pixel, every millisecond of response time, matters.',
  },
  {
    key: 'kahlo',
    label: 'Kahlo',
    name: '#c4956a',       /* warm terracotta */
    accent: '#8a6e50',     /* earth brown */
    text: '#c4956abb',
    sub: '#7a7060cc',
    stat: ['#8a6e50', '#c4956a', '#6b7a5c'],
    labelColor: '#7a7060',
    divider: '#8a6e50',
    bio: 'Part engineer, part storyteller. Like Kahlo, I code from lived experience — building tools rooted in empathy, resilience, and bold self-expression.',
    bio2: 'Every bug is a brushstroke of honesty; every feature, a portrait of the user. Three studios shaped my craft:',
    quote: 'I used to think I was the strangest person in the world — then I realized we all build software from our own wounds and wonders.',
  },
  {
    key: 'picasso',
    label: 'Picasso',
    name: '#c88aaf',       /* soft mauve-pink */
    accent: '#7a6acd',     /* deep violet */
    text: '#c88aafbb',
    sub: '#9a8ab0cc',
    stat: ['#7a6acd', '#c88aaf', '#c4a040'],
    labelColor: '#9a8ab0',
    divider: '#7a6acd',
    bio: 'Part engineer, part cubist. Like Picasso, I deconstruct complex systems and reassemble them from unexpected angles — turning chaos into clarity.',
    bio2: 'I see every problem from multiple perspectives at once, then ship the one that surprises and delights. Three studios shaped my craft:',
    quote: 'Learn the rules like a pro, so you can break them like an artist — that\'s how I approach every architecture decision.',
  },
]

/* Shared constants */
const STORY_BG = '#f7f1e8'
const STORY_TEXT = '#5c4e3e'
const CONTACT_BG = '#23150D'

const MailIcon = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>)
const GitHubIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>)
const LinkedInIcon = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>)
const SOCIAL_ICONS = [<GitHubIcon />, <LinkedInIcon />]

const PAGE_CSS = `
  .skill-pill { transition: all 0.35s cubic-bezier(0.25,0,0,1); cursor: default; }
  .skill-pill:hover { transform: translateY(-3px) scale(1.06); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
  @keyframes marqueeRight { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes marqueeLeft  { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  @keyframes scrollBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
  @keyframes inkDrip {
    0%, 100% { transform: translateY(0); opacity: 0; }
    10% { opacity: 1; }
    50% { transform: translateY(10px); opacity: 0.6; }
    90% { opacity: 0; }
  }
  /* Drop-cap — medieval illuminated manuscript style */
  .story-para::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 2.4em;
    font-weight: 800;
    float: left;
    line-height: 0.8;
    margin-right: 4px;
    margin-top: 2px;
    color: #C47C47;
  }
`

export default function AboutPage({ go }) {
  const m = useIsMobile()
  const canvasRef = useRef(null)
  const textRef = useRef(null)
  const scrollRef = useRef(null)
  const riveInputRef = useRef(null)
  const [artistIdx, setArtistIdx] = useState(0)
  const prevIdxRef = useRef(0)

  useParallax(textRef, { xFactor: -5, yFactor: -3, enabled: !m })
  useScrollReveal(scrollRef)

  const a = ARTISTS[artistIdx]

  /* Rive — load + poll Number 1 input to detect artist changes */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let r = null
    let pollId = null
    import('@rive-app/canvas').then((rive) => {
      const dpr = window.devicePixelRatio || 1
      const size = m
                   ? Math.min(window.innerWidth * 0.88, 420)
                   : Math.min(window.innerHeight * 0.92, 680)
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = size + 'px'
      canvas.style.height = size + 'px'
      r = new rive.Rive({
                          src: '/about_me.riv', canvas,
                          stateMachines: 'State Machine 1', autoplay: true,
                          layout: new rive.Layout({ fit: rive.Fit.Contain, alignment: rive.Alignment.Center }),
                          onLoad: () => {
                            r.resizeDrawingSurfaceToCanvas()
                            const inputs = r.stateMachineInputs('State Machine 1')
                            const numInput = inputs?.find((i) => i.name === 'Number 1')
                            if (numInput) {
                              riveInputRef.current = numInput
                              /* Poll every 200ms to detect button clicks inside Rive */
                              pollId = setInterval(() => {
                                const val = Math.round(numInput.value)
                                const clamped = Math.max(0, Math.min(2, val))
                                setArtistIdx((prev) => (prev !== clamped ? clamped : prev))
                              }, 200)
                            }
                          },
                        })
    })
    return () => {
      if (pollId) clearInterval(pollId)
      if (r) r.cleanup()
    }
  }, [m])

  /* Animate text swap when artist changes */
  useEffect(() => {
    if (prevIdxRef.current === artistIdx) return
    prevIdxRef.current = artistIdx
    const els = document.querySelectorAll('.ab-morph')
    gsap.fromTo(els, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' })
  }, [artistIdx])

  /* Entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.ab-painting', { opacity: 0, x: m ? 0 : 40, y: m ? 15 : 0 }, { opacity: 1, x: 0, y: 0, duration: 1.4, ease: 'expo.out', delay: 0.15 })
    tl.fromTo('.ab-label', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.9')
    tl.fromTo('.ab-name', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    tl.fromTo('.ab-divider', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    tl.fromTo('.ab-bio', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.2')
    tl.fromTo('.ab-stats', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    tl.fromTo('.ab-scroll', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.1')
    return () => tl.kill()
  }, [m])

  const goHome = useCallback(() => go('home'), [go])
  const handleCtaEnter = useCallback((e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 25px #C47C4750' }, [])
  const handleCtaLeave = useCallback((e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px #C47C4740' }, [])

  const pad = m ? '0 16px' : '0 clamp(20px, 8vw, 80px)'

  /* ── Shared hero text block (used by both mobile + desktop) ── */
  const heroText = (
      <>
        <p className="ab-label" style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: m ? 8 : 10,
          fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase',
          color: a.labelColor, marginBottom: m ? 4 : 10, opacity: 0,
          transition: 'color 0.5s',
        }}>About Me</p>

        <h2 className="ab-name" style={{
          fontFamily: 'Patrick Hand',
          fontSize: m ? 36 : 'clamp(52px, 7vw, 90px)',
          color: a.name, lineHeight: 1,
          whiteSpace: m ? 'normal' : 'nowrap',
          marginBottom: m ? 6 : 14, opacity: 0,
          transition: 'color 0.5s',
        }}>Coco Choi</h2>

        <div className="ab-divider" style={{
          width: m ? 25 : 45, height: 1.5,
          background: a.divider, opacity: 0.5,
          marginBottom: m ? 8 : 18,
          marginLeft: m ? 'auto' : 0, marginRight: m ? 'auto' : 0,
          transformOrigin: m ? 'center' : 'left center',
          transition: 'background 0.5s',
        }} />

        {/* Primary bio — changes per artist */}
        <p className="ab-bio ab-morph" style={{
          fontFamily: 'Patrick Hand',
          fontSize: m ? 14 : 'clamp(16px, 1.8vw, 22px)',
          lineHeight: 1.55, color: a.text,
          marginBottom: m ? 10 : 16, maxWidth: m ? '100%' : 420,
          transition: 'color 0.5s',
        }}>{a.bio}</p>

        {/* Secondary bio — studio list */}
        <p className="ab-bio ab-morph" style={{
          fontFamily: 'Patrick Hand',
          fontSize: m ? 13 : 'clamp(14px, 1.5vw, 18px)',
          lineHeight: 1.6, color: a.sub,
          marginBottom: m ? 14 : 24, maxWidth: m ? '100%' : 420,
          transition: 'color 0.5s',
        }}>
          {a.bio2}{' '}
          <span style={{ color: a.name, transition: 'color 0.5s' }}>Audi</span>,{' '}
          <span style={{ color: a.name, transition: 'color 0.5s' }}>Mars Inc.</span> &{' '}
          <span style={{ color: a.name, transition: 'color 0.5s' }}>UbiWell Lab</span>.
          Now at <span style={{ color: a.name, transition: 'color 0.5s' }}>Northeastern</span> pursuing my MS.
        </p>

        {/* Stats */}
        <div className="ab-stats" style={{ display: 'flex', justifyContent: m ? 'center' : 'flex-start', gap: m ? 22 : 28, opacity: 0 }}>
          {ABOUT_STATS.map((st, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Patrick Hand', fontSize: m ? 22 : 32, color: a.stat[i], lineHeight: 1, transition: 'color 0.5s' }}>
                  <AnimatedNumber target={st.n} suffix={st.s} delay={0.8 + i * 0.2} />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 7, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: `${a.labelColor}90`, marginTop: 3, transition: 'color 0.5s' }}>
                  {st.label}
                </div>
              </div>
          ))}
        </div>
      </>
  )

  return (
      <div ref={scrollRef} style={{ width: '100vw', height: '100vh', background: STORY_BG, position: 'relative', overflowX: 'hidden', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <style>{PAGE_CSS}</style>

        {/* ═══════ HERO ═══════ */}
        <div style={{
          width: '100%', minHeight: m ? 'auto' : '100vh',
          background: '#000', position: 'relative', overflow: 'hidden',
        }}>

          {m ? (
              /* ── MOBILE ── */
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 20px 10px' }}>
                <div className="ab-painting" style={{ opacity: 0, marginBottom: 10, position: 'relative' }}>
                  <canvas ref={canvasRef} style={{ display: 'block', clipPath: 'inset(12% 7% 0 0)' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '8%', background: 'linear-gradient(90deg, #000, transparent)', pointerEvents: 'none', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8%', background: 'linear-gradient(180deg, transparent, #000)', pointerEvents: 'none', zIndex: 1 }} />
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>{heroText}</div>
              </div>
          ) : (
               /* ── DESKTOP: left text, right painting ── */
               <div style={{
                 display: 'flex', alignItems: 'center',
                 minHeight: '100vh', width: '100%',
                 paddingLeft: 'clamp(40px, 8vw, 140px)',
               }}>
                 <div ref={textRef} style={{
                   width: '40%', padding: '0 clamp(20px, 3vw, 50px) 0 0',
                   zIndex: 2, flexShrink: 0,
                 }}>{heroText}</div>

                 <div className="ab-painting" style={{
                   flex: 1, display: 'flex', alignItems: 'center',
                   justifyContent: 'flex-start', opacity: 0,
                   position: 'relative',
                 }}>
                   <canvas ref={canvasRef} style={{ display: 'block', clipPath: 'inset(12% 7% 0 0)' }} />
                   {/* Feathered left edge — painting emerges from darkness */}
                   <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '10%', background: 'linear-gradient(90deg, #000 0%, transparent 100%)', pointerEvents: 'none', zIndex: 1 }} />
                   {/* Feathered bottom edge */}
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8%', background: 'linear-gradient(180deg, transparent, #000)', pointerEvents: 'none', zIndex: 1 }} />
                 </div>
               </div>
           )}

          {/* Scroll hint — paintbrush drip */}
          <div className="ab-scroll" style={{
            position: m ? 'relative' : 'absolute',
            bottom: m ? undefined : 18, left: m ? undefined : '50%',
            transform: m ? undefined : 'translateX(-50%)',
            zIndex: 2, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, opacity: 0,
            marginTop: m ? 14 : 0, marginBottom: m ? 14 : 0,
          }}>
            <svg width="14" height="36" viewBox="0 0 14 36" fill="none" style={{ overflow: 'visible' }}>
              {/* Brush handle */}
              <rect x="5" y="0" width="4" height="16" rx="1.5" fill={`${a.labelColor}40`} style={{ transition: 'fill 0.5s' }} />
              {/* Bristles */}
              <path d="M4 16 C4 16, 3.5 20, 5 21 L9 21 C10.5 20, 10 16, 10 16" fill={`${a.accent}50`} stroke={`${a.accent}30`} strokeWidth="0.5" style={{ transition: 'fill 0.5s, stroke 0.5s' }} />
              {/* Drip */}
              <ellipse cx="7" cy="27" rx="1.8" ry="2.5" fill={`${a.accent}60`} style={{ animation: 'inkDrip 2.4s ease-in-out infinite', transition: 'fill 0.5s' }} />
              {/* Second drip — offset timing */}
              <ellipse cx="7" cy="32" rx="1.2" ry="1.8" fill={`${a.accent}35`} style={{ animation: 'inkDrip 2.4s ease-in-out infinite 1.2s', transition: 'fill 0.5s' }} />
            </svg>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 5, letterSpacing: 1.5, textTransform: 'uppercase', color: `${a.labelColor}50`, transition: 'color 0.5s', marginTop: 2 }}>Scroll</div>
          </div>
        </div>

        {/* ── Gradient transition: hero → story (画框底部延伸到展厅墙面) ── */}
        <div style={{
          width: '100%', height: m ? 50 : 70,
          background: `linear-gradient(180deg, #000 0%, #23150D 40%, ${STORY_BG} 100%)`,
        }} />

        {/* ═══════ STORY ═══════ */}
        <div style={{ width: '100%', background: STORY_BG, padding: m ? '30px 0' : 'clamp(40px, 10vw, 80px) 0', overflow: 'hidden' }}>
          <div className="ab-reveal" style={{ maxWidth: 550, margin: '0 auto', padding: pad, opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: m ? 6 : 10, marginBottom: m ? 18 : 30 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 20 : 'clamp(30px, 8vw, 50px)', fontWeight: 900, color: a.accent, lineHeight: 0.8, opacity: 0.25, transition: 'color 0.5s' }}>"</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 14 : 'clamp(14px, 3.5vw, 23px)', fontWeight: 700, fontStyle: 'italic', color: '#23150D', lineHeight: 1.3, letterSpacing: -1, marginTop: m ? 4 : 8 }}>
                {a.quote}
              </h3>
            </div>
          </div>

          <div className="ab-reveal" style={{ maxWidth: 550, margin: '0 auto', padding: pad, opacity: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 12 : 'clamp(20px, 5vw, 40px)' }}>
              <div>
                <p className="story-para" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 9, lineHeight: 2, color: STORY_TEXT }}>I studied film before I ever wrote a line of code. At Franklin & Marshall, I learned to storyboard scenes, direct the viewer's eye, and edit until every frame earned its place. Now, pursuing my MS in Computer Science at Northeastern, I bring that same cinematic instinct to software — every interaction is a scene, every transition a cut.</p>
                <div style={{ margin: m ? '10px 0' : '16px 0', height: 1, background: 'linear-gradient(90deg, #C47C4740, transparent)' }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 9, lineHeight: 2, color: STORY_TEXT }}>That duality shaped my career. At UbiWell Lab I built healthcare tools where clarity saves lives. At Audi I designed data pipelines that turned 20,000 sensor streams into stories engineers could read. At Mars Inc. in Hong Kong I shipped apps to thousands of daily users — each screen choreographed like a short film.</p>
              </div>
              <div>
                <p className="story-para" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 9, lineHeight: 2, color: STORY_TEXT }}>I believe code can be romantic. Not in a sentimental way — in the way a painter layers light, or a director holds a shot one beat longer than expected. The best software has rhythm, texture, and emotion. That's what I chase: the moment a user forgets they're using a tool and starts feeling something instead.</p>
                <div style={{ margin: m ? '10px 0' : '16px 0', height: 1, background: 'linear-gradient(90deg, #D8995C40, transparent)' }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 9, lineHeight: 2, color: STORY_TEXT }}>Outside of work I founded Pet Paradise — a full-stack platform born from caring for 20+ cats and dogs. When I'm not coding, you'll find me drawing, composing shots in my head, or animating things that probably don't need animating. This website is one of those things.</p>
              </div>
            </div>
          </div>

          <div className="ab-reveal" style={{ maxWidth: 550, margin: m ? '20px auto 0' : '40px auto 0', padding: pad, opacity: 0 }}>
            <div style={{ display: m ? 'grid' : 'flex', gridTemplateColumns: '1fr 1fr', gap: m ? 10 : 0, justifyContent: m ? undefined : 'space-between', borderTop: m ? 'none' : '2px solid #23150D12', paddingTop: m ? 0 : 20 }}>
              {ABOUT_BIG_STATS.map((s, i) => {
                const c = ['#C47C47', '#D8995C', '#928544', '#C47C47']
                return (
                    <div key={i} style={{ textAlign: 'center', flex: m ? undefined : 1 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 18 : 'clamp(16px, 3.5vw, 26px)', fontWeight: 800, color: c[i % c.length], lineHeight: 1 }}>{s.num}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 7, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9e9080', marginTop: m ? 2 : 5, lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                )
              })}
            </div>
          </div>

          <div className="ab-reveal" style={{ marginTop: m ? 20 : 40, opacity: 0 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? 5 : 7, color: '#928544', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center', marginBottom: m ? 8 : 14 }}>My Stack</p>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: m ? 20 : 40, background: `linear-gradient(90deg, ${STORY_BG}, transparent)`, zIndex: 2 }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: m ? 20 : 40, background: `linear-gradient(-90deg, ${STORY_BG}, transparent)`, zIndex: 2 }} />
              <div style={{ display: 'flex', gap: m ? 4 : 7, animation: 'marqueeRight 30s linear infinite', width: 'max-content' }}>
                {[...SKILLS, ...SKILLS].map((s, i) => <SkillPill key={i} skill={s} small={m} />)}
              </div>
              <div style={{ display: 'flex', gap: m ? 4 : 7, animation: 'marqueeLeft 35s linear infinite', width: 'max-content', marginTop: m ? 4 : 7 }}>
                {[...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()].map((s, i) => <SkillPill key={i} skill={s} small={m} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ CONTACT ═══════ */}
        <div style={{ width: '100%', background: CONTACT_BG, padding: m ? '30px 12px' : 'clamp(40px, 10vw, 80px) clamp(20px, 8vw, 80px)', textAlign: 'center' }}>
          <div className="ab-reveal" style={{ maxWidth: 400, margin: '0 auto', opacity: 0 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: m ? 5 : 7, color: '#928544', letterSpacing: 2, textTransform: 'uppercase', marginBottom: m ? 6 : 10 }}>Get In Touch</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 18 : 'clamp(18px, 5vw, 32px)', fontWeight: 800, color: '#D8995C', marginBottom: m ? 6 : 10, lineHeight: 1.1, letterSpacing: -2 }}>
              Let's create something<br/>beautiful together
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 7 : 9, color: '#D8995C50', marginBottom: m ? 14 : 24, lineHeight: 1.7 }}>
              Whether it's a project, a job opportunity, or just to say hi — I'd love to hear from you.
            </p>
            <a href="mailto:choi.coco@northeastern.edu" onMouseEnter={handleCtaEnter} onMouseLeave={handleCtaLeave} style={{ display: 'inline-flex', alignItems: 'center', gap: m ? 5 : 8, padding: m ? '8px 16px' : '11px 24px', borderRadius: 30, background: '#C47C47', color: 'white', fontFamily: "'Patrick Hand', cursive", fontSize: m ? 10 : 13, fontWeight: 400, letterSpacing: 0.5, textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.25,0,0,1)', boxShadow: '0 4px 15px #C47C4740' }}>
              <MailIcon /> Say Hello
            </a>

            <div style={{ display: 'flex', justifyContent: 'center', gap: m ? 10 : 'clamp(15px, 4vw, 30px)', marginTop: m ? 18 : 28, flexWrap: 'wrap' }}>
              {CONTACT_INFO.map((c, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 4 : 5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#92854450', marginBottom: 3 }}>{c.label}</div>
                    {c.href ? (
                        <a href={c.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 8, color: '#D8995C', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}
                           onMouseEnter={(e) => (e.currentTarget.style.color = '#C47C47')} onMouseLeave={(e) => (e.currentTarget.style.color = '#D8995C')}>{c.value}</a>
                    ) : (
                         <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 6 : 8, color: '#D8995C', fontWeight: 500 }}>{c.value}</div>
                     )}
                  </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: m ? 16 : 24 }}>
              {ABOUT_SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} style={{ width: m ? 20 : 26, height: m ? 20 : 26, borderRadius: '50%', background: '#D8995C0a', border: '1px solid #D8995C18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D8995C50', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.25,0,0,1)' }}
                     onMouseEnter={(e) => { e.currentTarget.style.background = '#C47C47'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#C47C47'; e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)' }}
                     onMouseLeave={(e) => { e.currentTarget.style.background = '#D8995C0a'; e.currentTarget.style.color = '#D8995C50'; e.currentTarget.style.borderColor = '#D8995C18'; e.currentTarget.style.transform = '' }}>
                    {SOCIAL_ICONS[i]}
                  </a>
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 450, margin: m ? '20px auto 0' : '40px auto 0', paddingTop: m ? 10 : 20, borderTop: '1px solid #D8995C0c', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: m ? 'column' : 'row', gap: m ? 4 : 0 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? 8 : 10, fontWeight: 700, color: '#D8995C' }}>Coco Choi</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: m ? 5 : 6, color: '#D8995C30', letterSpacing: 2 }}>© 2025 · Built with React, Rive & GSAP</div>
          </div>
        </div>

        <button className="page-back" onClick={goHome} style={{ color: '#aaa', background: 'rgba(0,0,0,0.03)', borderColor: 'rgba(0,0,0,0.06)', zIndex: 20, position: 'fixed' }}>←</button>
        <NavOverlay go={go} current="about" light />
      </div>
  )
}

function SkillPill({ skill, small }) {
  return (
      <span className="skill-pill" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: small ? 6 : 8, fontWeight: 600, padding: small ? '4px 8px' : '6px 13px', borderRadius: 20, whiteSpace: 'nowrap', background: 'white', color: skill.color, border: `1.5px solid ${skill.color}25`, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
      {skill.label}
    </span>
  )
}