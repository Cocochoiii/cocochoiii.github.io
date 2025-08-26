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
    head: { start: "#515151", end: "#1f2937" },
    desc: (
        <>
          I built backends in <strong>Python</strong> (<strong>Django/FastAPI</strong>) on
          {" "}<strong>PostgreSQL/MongoDB</strong>, exposing <strong>REST/JSON</strong> &
          {" "}<strong>gRPC/Proto</strong> for 2.5M+ datapoints (p95 &lt; 200ms, 99.9% uptime).
          {" "}I delivered 100+ real-time dashboards in <strong>React/TypeScript</strong> with
          {" "}<strong>D3/Plotly</strong> for 1k+ users. I automated pipelines
          {" "}(<strong>Python</strong>, <strong>BeautifulSoup/Selenium</strong>, <strong>Kafka</strong>)
          {" "}and shipped an iOS client (<strong>Swift/SwiftUI</strong>, <strong>Core Data</strong>,
          {" "}<strong>TFLite</strong>) with 99.7% reliability; led <strong>TDD</strong>
          {" "}(<strong>pytest/Jest/XCTest</strong>, ~92% coverage, 200+ tests).
        </>
    ),
  },

  {
    company: "Audi",
    role: "Innovation Data Engineer",
    dates: "Beijing, China — Jan 2023 – Aug 2024",
    logo: audiLogo,
    head: { start: "rgba(205,0,16,0.91)", end: "#0b1220" },
    desc: (
        <>
          I built a distributed platform with <strong>Java Spring Boot</strong> +
          {" "}<strong>Python Flask</strong>, ingesting 500GB+/day via <strong>Kafka</strong> from
          {" "}20k sensors (99.9% uptime). I orchestrated <strong>Airflow</strong> ETL with
          {" "}<strong>Pandas/NumPy</strong> and <strong>Spark Structured Streaming</strong>
          {" "}（sub-second, ~40% faster）. I designed <strong>Snowflake</strong> + <strong>dbt</strong>,
          {" "}tuned <strong>SQL</strong> (~60% faster), and shipped 15+ <strong>PySpark/SQL</strong> models
          {" "}improving retention +25%; I ran <strong>CI/CD</strong> on <strong>Docker/K8s</strong> with
          {" "}<strong>GitHub Actions</strong> (~90% coverage).
        </>
    ),
  },

  {
    company: "Mars Inc.",
    role: "Full-Stack Software Engineer Intern",
    dates: "Hong Kong — Feb 2022 – Dec 2022",
    logo: marsLogo,
    head: { start: "#0bf4da", end: "#0b1220" },
    desc: (
        <>
          I built a mobile commerce stack: <strong>React Native</strong> app +
          {" "}<strong>Node.js/Express</strong>/<strong>GraphQL</strong> services with
          {" "}<strong>OAuth2/JWT RBAC</strong> for 5k+ DAU. I launched event-driven messaging
          {" "}with <strong>Socket.IO</strong>, <strong>Redis pub/sub</strong>, <strong>RabbitMQ</strong>,
          {" "}plus rate-limiting & event sourcing. I optimized <strong>MongoDB</strong> (<strong>Mongoose</strong>,
          {" "}geospatial/compound indexes) cutting search latency ~65%.
        </>
    ),
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
