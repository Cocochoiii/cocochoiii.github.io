import "./ExperienceCards.css";

// Put these SVG/PNGs in src/assets/img/
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
            "Shipped a real-time patient video pipeline (transcoding, storage/CDN) cutting latency by ~40%. " +
            "Kafka-based ingestion for video & sensor streams; React/TS dashboards; TDD with pytest/Jest/XCTest (≈92% cov)."
    },
    {
        company: "Audi",
        role: "Innovation Data Engineer",
        dates: "Beijing, China — Jan 2023 – Aug 2024",
        logo: audiLogo,
        head: { start: "#9ca3af", end: "#111827" },
        desc:
            "Designed distributed microservices (Java Spring Boot + Flask) ingesting 500GB+/day from 20K+ sensors with 99.9% uptime. " +
            "Spark Streaming + Airflow ETL (sub-second) reduced processing time by ~40%. " +
            "Snowflake + dbt analytics; SQL tuned for ~60% faster queries; 15+ PySpark/SQL models for predictive maintenance."
    },
    {
        company: "Mars Inc.",
        role: "Full-Stack SWE Intern",
        dates: "Hong Kong — Feb 2022 – Dec 2022",
        logo: marsLogo,
        head: { start: "#3b82f6", end: "#1f2937" },
        desc:
            "React Native app (hooks + context) with Node.js/Express microservices and OAuth2/JWT RBAC serving 5k+ DAU. " +
            "Realtime orders via Socket.IO, Redis pub/sub, RabbitMQ event sourcing. " +
            "MongoDB geospatial + compound indexes trimmed search latency by ≈65%."
    }
];

export default function ExperienceCards() {
    return (
        <section className="exp-wrap" id="experience">
            <h2 className="exp-title">Experiences</h2>
            <div className="exp-grid">
                {CARDS.map((c) => (
                    <article
                        key={c.company}
                        className="exp-card"
                        style={{ "--head-start": c.head.start, "--head-end": c.head.end }}
                    >
                        <div className="exp-head">
                            <div className="exp-company">{c.company}</div>
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
        </section>
    );
}
