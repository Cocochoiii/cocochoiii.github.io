import React, { useState } from "react";
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
    uni: "Northeastern University",
    title: "Master of Science in Computer Science",
    subtitle: "Boston / Seattle • Sep 2024 – Dec 2026 • GPA 4.0/4.0",
    logo: neuLogo,
    gpa: 4.0,
    // ✅ 你可以自由编辑这里的课程 chips
    courses: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Web Development",
      "Mobile Development",
      "Advanced Software Development",
      "Database Management Systems",
      "Cloud Computing",
      "Natural Language Processing",
    ],
    details: [
      "Focused on systems, cloud, and ML-backed products; projects spanned full-stack apps, streaming pipelines, and model-serving.",
      "TA for CS5001 and CS 5002, Member in Women in Tech"
    ],
    head: { start: "rgba(229,0,0,0.73)", end: "#0b1020" },
  },
  {
    id: "fandm",
    uni: "Franklin & Marshall College",
    title: "B.A. in Business Admin & Management • Film & Media (Double Major)",
    subtitle: "Lancaster, PA • Aug 2018 – Dec 2021 • GPA 3.72/4.0",
    logo: fmLogo,
    gpa: 3.72,
    // ✅ 自己写想展示的课程/主题（下面是示例，可改）
    courses: [
      "Business Analytics",
      "Operations & Strategy",
      "Organizational Communication",
      "Film Production",
      "Film Theory",
      "Media Studies",
    ],
    details: [
      "Foundations in analytics, management, and communication supporting cross-functional engineering work.",
      "Film background → media systems literacy (codecs/FFmpeg/HLS), user-centered storytelling, and better UX."
    ],
    head: { start: "rgba(29,41,96,0.8)", end: "#0b1020" },
  },
];

// GPA 进度环（带渐变描边）
function GpaRing({ value = 4, max = 4 }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = 22, c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
      <svg className="gpa-svg" viewBox="0 0 64 64" aria-label={`GPA ${value}/${max}`}>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED"/>
            <stop offset="100%" stopColor="#F43F5E"/>
          </linearGradient>
        </defs>
        <circle className="gpa-track" cx="32" cy="32" r={r} />
        <circle
            className="gpa-progress"
            cx="32" cy="32" r={r}
            stroke="url(#grad)"
            strokeDasharray={`${dash} ${c - dash}`}
        />
        <text x="32" y="36" className="gpa-text">{value.toFixed(2)}</text>
      </svg>
  );
}

export const Education = () => {
  const [openId, setOpenId] = useState("");
  const [pulseId, setPulseId] = useState("");

  const toggle = (id) => {
    setOpenId((cur) => (cur === id ? "" : id));
    setPulseId(id);
    window.setTimeout(() => setPulseId(""), 500);
  };

  const onKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  };

  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 10;
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
                          const courses = s.courses || []; // ✅ 直接使用手写的 courses
                          return (
                              <div
                                  key={s.id}
                                  role="listitem"
                                  className={
                                      "edu2-card" +
                                      (open ? " open" : "") +
                                      (pulseId === s.id ? " pulse" : "")
                                  }
                                  tabIndex={0}
                                  aria-label={`${s.uni} card`}
                                  aria-expanded={open}
                                  onMouseMove={handleMove}
                                  onMouseLeave={handleLeave}
                                  onClick={() => toggle(s.id)}
                                  onKeyDown={(e) => onKey(e, s.id)}
                                  style={{
                                    "--head-start": s.head.start,
                                    "--head-end": s.head.end,
                                  }}
                              >
                                <div className={"edu2-badge" + (open ? " show" : "")}>
                                  <GpaRing value={s.gpa} max={4} />
                                </div>

                                <div className="edu2-inner">
                                  {/* Front */}
                                  <div className="edu2-face front">
                                    <div className="edu2-headband">
                                      <img
                                          className="edu2-logo"
                                          src={s.logo}
                                          alt={`${s.uni} logo`}
                                          loading="lazy"
                                      />
                                    </div>
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

                                    {courses.length > 0 && (
                                        <>
                                          <h6 className="edu2-head small">Key Courses</h6>
                                          <div className="edu2-chips" role="list">
                                            {courses.map((c, i) => (
                                                <span role="listitem" key={i} className="chip">
                                        {c}
                                      </span>
                                            ))}
                                          </div>
                                        </>
                                    )}

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
