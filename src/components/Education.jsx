import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import "./Education.css";

// Public assets (ensure files exist under public/logos/)
const neuLogo = "/logos/Northeastern_Wordmark.svg";
const fmLogo  = "/logos/Franklin_marshall_college_logo.svg";

const schools = [
  {
    id: "neu",
    title: "Master of Science in Computer Science",
    subtitle: "Boston / Seattle • Sep 2024 – Dec 2026 • GPA 4.0/4.0",
    logo: neuLogo,
    details: [
      "Courses: Object-Oriented Programming, Data Structures & Algorithms, Web Development, Mobile Development, Advanced Software Development, Database Management Systems, Cloud Computing, Natural Language Processing"
    ],
  },
  {
    id: "fandm",
    title: "B.A. in Business Admin & Management • Film & Media (Double Major)",
    subtitle: "Lancaster, PA • Aug 2018 – Dec 2021 • GPA 3.72/4.0",
    logo: fmLogo,
    details: [
      "Foundations in analytics, management, and communication supporting cross-functional engineering work."
      + "Film studies background, user-centered storytelling and better UX."
    ],
  },
];

export const Education = () => {
  const [openId, setOpenId] = useState("neu");

  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    const ry = (px - 0.5) * 10; // rotateY deg
    const rx = -(py - 0.5) * 10; // rotateX deg
    // Set CSS variables directly on the element (no React re-render on every mouse move)
    el.style.setProperty("--mx", px);
    el.style.setProperty("--my", py);
    el.style.setProperty("--rx", rx + "deg");
    el.style.setProperty("--ry", ry + "deg");
  };

  const handleLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", 0.5);
    el.style.setProperty("--my", 0.5);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const toggle = (id) => setOpenId((cur) => (cur === id ? "" : id));

  const onKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  return (
    <section className="education" id="education">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 className="edu2-title">Education</h2>
                  <div className="edu2-grid" role="list">
                    {schools.map((s) => {
                      const open = openId === s.id;
                      return (
                        <div
                          key={s.id}
                          role="listitem"
                          className={"edu2-card" + (open ? " open" : "")}
                          tabIndex={0}
                          aria-label={`${s.id === "neu" ? "Northeastern University" : "Franklin & Marshall College"} card`}
                          aria-expanded={open}
                          onMouseMove={handleMove}
                          onMouseLeave={handleLeave}
                          onClick={() => toggle(s.id)}
                          onKeyDown={(e) => onKey(e, s.id)}
                        >
                          <div className="edu2-inner">
                            {/* Front */}
                            <div className="edu2-face front">
                              <img
                                className="edu2-logo"
                                src={s.logo}
                                alt={`${s.id === "neu" ? "Northeastern University" : "Franklin & Marshall College"} logo`}
                                loading="lazy"
                              />
                              <h4 className="edu2-program">{s.title}</h4>
                              <div className="edu2-sub">{s.subtitle}</div>
                            </div>
                            {/* Back */}
                            <div className="edu2-face back">
                              <h5 className="edu2-head">Highlights</h5>
                              <ul className="edu2-list">
                                {s.details.map((d, i) => (
                                  <li key={i}>{d}</li>
                                ))}
                              </ul>
                              <button
                                type="button"
                                className="edu2-close"
                                aria-label="Close highlight"
                                onClick={(e) => { e.stopPropagation(); toggle(s.id); }}
                              >
                                Close
                              </button>
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

