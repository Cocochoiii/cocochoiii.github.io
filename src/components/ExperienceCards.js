import "./ExperienceCards.css";

import ubiLogo    from "../assets/img/ubiwell-logo.svg";
import audiLogo   from "../assets/img/audi-logo.png";
import marsLogo   from "../assets/img/mars-logo.png";
import groupmLogo from "../assets/img/groupm-logo.png"; // 新增：请放置该文件

const CARDS = [
  /* UbiWell */
  {
    company: "UbiWell Lab",
    role: "Software Engineering Intern",
    dates: "Boston, MA — May 2025 – Oct 2025",
    logo: ubiLogo,
    head: { start: "#515151", end: "#1f2937" },
    desc:
        "Designed Python/Django REST APIs on PostgreSQL & MongoDB processing 2.5M+ health datapoints with p95 < 200 ms and 99.9% uptime; " +
        "built React/TypeScript dashboards (D3, Plotly) serving 1,000+ daily research users. " +
        "Automated data collection (Python + BeautifulSoup) for 500+ hours of patient monitoring; integrated Kafka for streaming and shipped an iOS app (Swift/SwiftUI, Core Data) with 99.7% sync reliability. " +
        "Led TDD/CI using pytest & Jest — ~92% coverage and 200+ unit tests — cutting production bugs by ~80%."
  },

  /* Audi */
  {
    company: "Audi",
    role: "Backend Software Engineer Intern",
    dates: "Beijing — Aug 2023 – Aug 2024",
    logo: audiLogo,
    head: { start: "rgba(205,0,16,0.91)", end: "#0b1220" },
    desc:
        "Built Go/C++ video processing for connected-car media (500GB+/day), including H.264/H.265/VP9 transcoding that cut bandwidth ~45% for 2M+ vehicles. " +
        "Designed Golang microservices + CDN for OTA media with adaptive bitrate streaming (99.9% uptime, sub-200ms) across 20+ edge locations. " +
        "Delivered S3-backed storage with Redis caching; Docker/K8s CI/CD moved releases from weekly to daily with zero-downtime deploys."
  },

  /* GroupM — 新增卡片 */
  {
    company: "GroupM",
    role: "Frontend Software Engineer Intern",
    dates: "Hong Kong — Jan 2023 – Jun 2023",
    logo: groupmLogo,
    head: { start: "#2563eb", end: "#0b1220" },
    desc:
        "Shipped large-scale customer platform in React/Vue with data-viz dashboards for 50k+ DAU; " +
        "built Node.js/Express APIs and WebSocket chat delivering 95% CSAT. " +
        "Implemented cross-platform features in React Native with Swift/Kotlin native modules (iOS/Android) — engagement +40%, retention +35%. " +
        "Established a reusable component library and CI testing (Jest ~95% coverage), reducing deploy time by ~60%."
  },

  /* Mars */
  {
    company: "Mars Inc.",
    role: "Full-Stack Software Engineer Intern",
    dates: "Hong Kong — Feb 2022 – Dec 2022",
    logo: marsLogo,
    head: { start: "#0bf4da", end: "#0b1220" },
    desc:
        "Built an e-commerce app in React Native with Node.js/Express microservices and OAuth2/JWT RBAC for 5,000+ daily users. " +
        "Launched realtime order updates via Socket.IO + Redis pub/sub + RabbitMQ event-sourcing. " +
        "Optimized MongoDB (geospatial + compound indexes) to reduce search latency by ~65%; applied OOP patterns with Agile delivery."
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
