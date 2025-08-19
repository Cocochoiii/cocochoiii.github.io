import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";

import ubiLogo from "../assets/img/ubiwell-logo.svg";
import audiLogo from "../assets/img/audi-logo.svg";
import marsLogo from "../assets/img/mars-logo.svg";




const jobs = [
    {
        id: "ubi",
        company: "UbiWell Lab",
        role: "Software Engineering Intern",
        location: "Boston, MA",
        dates: "May 2025 – Oct 2025",
        logo: ubiLogo,
        bullets: [
            "Designed backend services with Python/Django + PostgreSQL/MongoDB; REST APIs processed 2.5M+ health datapoints with <200ms latency and 99.9% uptime.",
            "Built 100+ real-time dashboards (React, TypeScript, D3.js, Plotly) for 1,000+ daily research users.",
            "Automated data pipelines (500+ hrs of monitoring data) + Kafka for real-time streams.",
            "Extended to iOS (Swift/SwiftUI/Core Data; ML via TensorFlow Lite) with 99.7% reliability on 10k+ daily sensor readings.",
            "Led code reviews & TDD (pytest/Jest/XCTest) to ~92% coverage; 200+ tests cut prod bugs by ~80%."
        ],
        tags: ["Python","Django","PostgreSQL","MongoDB","React","TypeScript","D3","Plotly","Kafka","Swift","TFLite","TDD"]
    },
    {
        id: "audi",
        company: "Audi",
        role: "Innovation Data Engineer",
        location: "Beijing, China",
        dates: "Jan 2023 – Aug 2024",
        logo: audiLogo,
        bullets: [
            "Spring Boot + Flask microservices processing 500GB+/day; Kafka for 20k+ IoT sensors (99.9% uptime).",
            "Airflow/Pandas/NumPy ETL; Spark Streaming sub-second analytics (-40% time).",
            "Snowflake + dbt; SQL optimized (-60% latency); 15+ PySpark/SQL solutions (+25% retention).",
            "CI/CD (Docker/Kubernetes + GitHub Actions), ~90% coverage; Agile/Scrum."
        ],
        tags: ["Java","Spring Boot","Flask","Kafka","Airflow","Spark","Snowflake","dbt","PySpark","Docker","Kubernetes","GitHub Actions"]
    },
    {
        id: "mars",
        company: "Mars Inc.",
        role: "Full-Stack SWE Intern",
        location: "Hong Kong",
        dates: "Feb 2022 – Dec 2022",
        logo: marsLogo,
        bullets: [
            "React Native app (hooks/context); Node.js/Express microservices; OAuth2/JWT + RBAC for 5k+ DAU.",
            "Socket.IO + Redis pub/sub; RabbitMQ event sourcing for orders.",
            "MongoDB geospatial + compound indexes (-65% search latency); Agile + Git."
        ],
        tags: ["React Native","Node.js","Express","OAuth2","JWT","Socket.IO","Redis","RabbitMQ","MongoDB","Mongoose"]
    }
];

export const Work = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [openId, setOpenId] = useState(jobs[0].id);
    const listRef = useRef(null);

    // Highlight the job nearest the viewport center
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const handler = () => {
            const centerY = window.innerHeight / 2;
            const nodes = Array.from(el.querySelectorAll(".work-node"));
            let best = 0, bestDist = Infinity;
            nodes.forEach((n, i) => {
                const r = n.getBoundingClientRect();
                const mid = (r.top + r.bottom) / 2;
                const d = Math.abs(mid - centerY);
                if (d < bestDist) { bestDist = d; best = i; }
            });
            setActiveIdx(best);
        };
        handler();
        window.addEventListener("scroll", handler, { passive: true });
        window.addEventListener("resize", handler);
        return () => {
            window.removeEventListener("scroll", handler);
            window.removeEventListener("resize", handler);
        };
    }, []);

    // Keyboard nav: ↑/↓ move focus, Enter toggles open
    useEffect(() => {
        const handler = (e) => {
            if (!listRef.current) return;
            if (e.key === "ArrowDown") {
                setActiveIdx((i) => Math.min(i + 1, jobs.length - 1));
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                setActiveIdx((i) => Math.max(i - 1, 0));
                e.preventDefault();
            } else if (e.key === "Enter") {
                const id = jobs[activeIdx].id;
                setOpenId((cur) => (cur === id ? "" : id));
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [activeIdx]);

    return (
        <section className="work" id="work">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) => (
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <h2>Work</h2>
                                    <p>Scroll the path; click (or press Enter) to expand.</p>

                                    {/* Rail + perfectly aligned dots are handled by CSS on each node */}
                                    <div className="work-items" ref={listRef} aria-label="Work timeline">
                                        {jobs.map((j, i) => {
                                            const open = openId === j.id;
                                            return (
                                                <div
                                                    key={j.id}
                                                    className={
                                                        "work-node" +
                                                        (i === activeIdx ? " active" : "") +
                                                        (open ? " open" : "")
                                                    }
                                                    onClick={() => setOpenId(open ? "" : j.id)}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-expanded={open}
                                                >
                                                    <div className="work-row">
                                                        <img src={j.logo} alt="" className="work-logo" />
                                                        <div className="work-meta">
                                                            <h4>{j.company} — {j.role}</h4>
                                                            <span className="work-sub">{j.location} • {j.dates}</span>
                                                            <div className="work-tags">
                                                                {j.tags.map((t) => (
                                                                    <span key={t} className="chip">{t}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {open && (
                                                        <ul className="work-details">
                                                            {j.bullets.map((b, k) => (
                                                                <li key={k}>{b}</li>
                                                            ))}
                                                        </ul>
                                                    )}
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
