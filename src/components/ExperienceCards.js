import "./ExperienceCards.css";

import ubiLogo  from "../assets/img/ubiwell-logo.svg";
import audiLogo from "../assets/img/audi-logo.png";
import marsLogo from "../assets/img/mars-logo.png";

const CARDS = [
  {
    company: "UbiWell Lab",
    role: "Software Engineering Intern",
    dates: "Boston, MA — May 2025 – Oct 2025",
    logo: ubiLogo,
    head: { start: "#ea444f", end: "#1f2937" },
    desc:
      "Built and scaled REST APIs in Python/Django handling 2.5M+ health datapoints (p95 < 200ms, 99.9% uptime). " +
      "Shipped a real‑time patient video pipeline (transcoding, storage/CDN) cutting latency by ~40%. " +
      "Kafka-based ingestion for video & sensor streams; React/TS dashboards; TDD with pytest/Jest/XCTest (≈92% coverage)."
  },
  {
    company: "Audi",
    role: "Innovation Data Engineer",
    dates: "Beijing, China — Jan 2023 – Aug 2024",
    logo: audiLogo,
    head: { start: "#64748b", end: "#0b1220" },
    desc:
      "Designed distributed microservices (Java Spring Boot + Flask) ingesting 500GB+/day from 20K+ sensors with 99.9% uptime. " +
      "Spark Streaming + Airflow ETL (sub‑second) reduced processing time by ~40%. " +
      "Snowflake + dbt analytics; SQL tuned for ~60% faster queries; 15+ PySpark/SQL models for predictive maintenance."
  },
  {
    company: "Mars Inc.",
    role: "Full‑Stack SWE Intern",
    dates: "Hong Kong — Feb 2022 – Dec 2022",
    logo: marsLogo,
    head: { start: "#3b82f6", end: "#0b1220" },
    desc:
      "React Native app (hooks + context) with Node.js/Express microservices and OAuth2/JWT RBAC serving 5k+ DAU. " +
      "Realtime orders via Socket.IO, Redis pub/sub, RabbitMQ event sourcing. " +
      "MongoDB geospatial + compound indexes trimmed search latency by ≈65%."
  }
];

export default function ExperienceCards() {
  return (
    <section id="experience" className="exp-wrap">
      <div className="container-narrow">
        <h2 className="exp-title">Experiences</h2>

        <div className="exp-grid">
          {CARDS.map((c) => (
            <article
              className="exp-card"
              key={c.company}
              style={{ "--head-start": c.head.start, "--head-end": c.head.end }}
              tabIndex={0}
              aria-label={`${c.company}, ${c.role}`}
            >
              <div className="exp-head">
                <h3 className="exp-company">{c.company}</h3>
              </div>

              <div className="exp-logo" aria-hidden="true">
                {c.logo ? <img src={c.logo} alt={`${c.company} logo`} /> : <span />}
              </div>

              <div className="exp-body">
                <h3 className="exp-role">{c.role}</h3>
                <div className="exp-dates">{c.dates}</div>
                <p className="exp-desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
