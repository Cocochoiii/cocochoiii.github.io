import React from "react";
import "./WhatIDo.css";
import headerImg from "../assets/img/header2-img.svg";

export default function WhatIDo() {
    const tools = [
        { cls: "devicon-linux-plain", label: "Linux" },
        { cls: "devicon-ubuntu-plain", label: "Ubuntu" },
        { cls: "devicon-java-plain", label: "Java" },
        { cls: "devicon-javascript-plain", label: "JavaScript" },
        { cls: "devicon-react-original", label: "reactjs" },
        { cls: "devicon-nodejs-plain", label: "nodejs" },
        { cls: "devicon-swift-plain", label: "swift" },
        { cls: "devicon-npm-original-wordmark", label: "npm" },
        // “sql-database” look — pick one of the DB glyphs (this matches the cylinder vibe best)
        { cls: "devicon-postgresql-plain", label: "sql-database" },

        { cls: "devicon-amazonwebservices-plain-wordmark", label: "aws" },
        { cls: "devicon-firebase-plain", label: "firebase" },
        { cls: "devicon-python-plain", label: "python" },
        { cls: "devicon-docker-plain", label: "docker" },
        { cls: "devicon-github-original", label: "github" },
    ];

    const bullets = [
        "Low-latency backends (Go/Python/Java, REST/gRPC); p95 < 200 ms.",
        "Media infra: FFmpeg, HLS/DASH, WebRTC; CDN/storage tuned for cost & reliability.",
        "Streams & ETL: Kafka, Spark, Airflow; real-time analytics.",
        "Cloud/DevOps: AWS, Docker, K8s, CI/CD; OTel + Prometheus/Grafana.",
        "ML: LLM/NLP, BERT embeddings, TFLite; recommendations.",
        "Frontend: React/TypeScript dashboards (D3/Plotly) & React Native."
    ];

    return (
        <section id="what-i-do" className="do wrap container">
            <div className="do-grid">
                <div className="do-visual">
                    <img src={headerImg} alt="Developer at desk" className="do-hero" />
                </div>

                <div className="do-content">
                    <h2 className="do-title">What I do</h2>
                    <p className="do-sub">
                        Backend & Media Platform engineer who enjoys distributed systems,
                        video infrastructure, and ML-powered features.
                    </p>

                    <div className="tool-row" role="list">
                        {tools.map((t) => (
                            <div className="tool" role="listitem" key={t.label} aria-label={t.label}>
                                <div className="tool-icon" aria-hidden="true">
                                    <i className={t.cls} />
                                </div>
                                <div className="tool-label">{t.label}</div>
                            </div>
                        ))}
                    </div>

                    <ul className="do-bullets">
                        {bullets.map((b, i) => (
                            <li key={i}>
                                <span className="zap" aria-hidden>⚡</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
