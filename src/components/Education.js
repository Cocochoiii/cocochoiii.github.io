// src/components/Education.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";

// ✅ use public assets (no SVGR import → no namespace errors)
const neuLogo = "/logos/Northeastern_Wordmark.svg";
const fmLogo  = "/logos/Franklin_marshall_college_logo.svg";

const schools = [
  {
    id: "neu",
    title: "Master of Science in Computer Science",
    subtitle: "Boston/Seattle • Sep 2024 – Dec 2026 • GPA 4.0/4.0",
    logo: neuLogo,
    details: [
      "Relevant coursework: Objected Oriented Programming, Data Structures & Algorithms, Web + Mobile Development, Advanced Software Development, Data Base Management, Cloud Computing, NLP",
    ],
  },
  {
    id: "fandm",
    title: "Bachelor of Arts in Business, Administration & Management and Film & Media Double Major",
    subtitle: "Lancaster, PA • Aug 2018 – Dec 2021 • GPA 3.72/4.0",
    logo: fmLogo,
    details: [
      "Foundations in analytics, management, and communication supporting cross-functional engineering work."
      + "Film studies background, user-centered storytelling and better UX."
    ],
  },
];

export const Education = () => {
  const [openId, setOpenId] = useState("neu");  // which card is flipped
  const [tilt, setTilt] = useState({});         // per-card tilt (rx/ry)

  // keyboard navigation on the grid: ↑/↓ to move, Enter to flip
  useEffect(() => {
    const handler = (e) => {
      const idx = schools.findIndex((s) => s.id === openId);
      if (e.key === "ArrowDown") {
        const next = Math.min(idx + 1, schools.length - 1);
        document.querySelector(`[data-edu="${schools[next].id}"]`)?.focus();
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        const prev = Math.max(idx - 1, 0);
        document.querySelector(`[data-edu="${schools[prev].id}"]`)?.focus();
        e.preventDefault();
      } else if (e.key === "Enter") {
        setOpenId((id) => (id === schools[idx].id ? "" : schools[idx].id));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openId]);

  const handleMouseMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    const ry = (px - 0.5) * 8;  // rotateY
    const rx = -(py - 0.5) * 8; // rotateX
    setTilt((t) => ({ ...t, [id]: { rx, ry } }));
  };

  const handleMouseLeave = (id) => {
    setTilt((t) => ({ ...t, [id]: { rx: 0, ry: 0 } }));
  };

  // tiny style system kept inline so you don't need to edit CSS files
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 20,
      perspective: 1200,
    },
    card: (id) => ({
      height: 300,
      transformStyle: "preserve-3d",
      cursor: "pointer",
      transition: "transform .18s ease",
      transform: `rotateX(${tilt[id]?.rx ?? 0}deg) rotateY(${tilt[id]?.ry ?? 0}deg)`,
    }),
    inner: (open) => ({
      position: "relative",
      width: "100%",
      height: "100%",
      transformStyle: "preserve-3d",
      transition: "transform .5s ease",
      transform: open ? "rotateY(180deg)" : "rotateY(0deg)",
    }),
    face: {
      position: "absolute",
      inset: 0,
      borderRadius: 20,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backfaceVisibility: "hidden",
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
    },
    back: { transform: "rotateY(180deg)", alignItems: "flex-start" },
    logo: { width: 350, height: 150, objectFit: "contain", marginBottom: 10, opacity: 0.9 },
    sub: { fontSize: 16, opacity: 0.8 },
    list: { margin: "10px 0 0 16px" },
  };

  return (
      <section className="education" id="education">
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                    <div
                        className={isVisible ? "animate__animated animate__fadeIn" : ""}
                        aria-label="Education cards"
                    >
                      <h2>Education</h2>
                      <div className="edu-grid" style={styles.grid}>
                        {schools.map((s) => {
                          const open = openId === s.id;
                          return (
                              <div
                                  key={s.id}
                                  data-edu={s.id}
                                  className={"edu-card " + (open ? "open" : "")}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => setOpenId(open ? "" : s.id)}
                                  onKeyDown={(e) => e.key === "Enter" && setOpenId(open ? "" : s.id)}
                                  onMouseMove={(e) => handleMouseMove(s.id, e)}
                                  onMouseLeave={() => handleMouseLeave(s.id)}
                                  style={styles.card(s.id)}
                                  aria-expanded={open}
                              >
                                <div style={styles.inner(open)}>
                                  {/* FRONT */}
                                  <div style={styles.face}>
                                    <img
                                        src={s.logo}
                                        alt={`${s.id === "neu" ? "Northeastern University" : "Franklin & Marshall College"} logo`}
                                        style={styles.logo}
                                    />
                                    <h4>{s.title}</h4>
                                    <span className="edu-sub" style={styles.sub}>{s.subtitle}</span>
                                  </div>
                                  {/* BACK */}
                                  <div style={{ ...styles.face, ...styles.back }}>
                                    <h5 style={{ margin: 0, color: "#9a97ff" }}>Highlights</h5>
                                    <ul style={styles.list}>
                                      {s.details.map((d, i) => (
                                          <li key={i}>{d}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
  );
};
