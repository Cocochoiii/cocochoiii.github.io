import React from "react";
import "./WhatIDo.css";
import headerImg from "../assets/img/header2-img.svg"; // 程序员这张

export default function WhatIDo() {
    const tools = [
        { cls: "devicon-linux-plain", label: "Linux" },
        { cls: "devicon-ubuntu-plain", label: "Ubuntu" },
        { cls: "devicon-java-plain", label: "Java" },
        { cls: "devicon-javascript-plain", label: "JavaScript" },
        { cls: "devicon-react-original", label: "React" },
        { cls: "devicon-nodejs-plain", label: "Node.js" },
        { cls: "devicon-swift-plain", label: "Swift" },
        { cls: "devicon-npm-original-wordmark", label: "npm" },
        { cls: "devicon-postgresql-plain", label: "PostgreSQL" },
        { cls: "devicon-amazonwebservices-plain-wordmark", label: "AWS" },
        { cls: "devicon-firebase-plain", label: "Firebase" },
        { cls: "devicon-python-plain", label: "Python" },
        { cls: "devicon-docker-plain", label: "Docker" },
        { cls: "devicon-github-original", label: "GitHub" },
    ];

    // 按你的“新简历”精炼后的要点
    const bullets = [
        "Low-latency backends (Go/Python/Java; REST/gRPC/GraphQL) — p95 < 200 ms, 99.9% uptime.",
        "Media infra — FFmpeg, HLS/DASH, WebRTC; cost-aware CDN/object storage.",
        "Streams & ETL — Kafka, Spark, Airflow; real-time analytics at scale.",
        "Cloud & DevOps — AWS, Docker, Kubernetes; CI/CD (GitHub Actions/Jenkins); OTel + Prometheus/Grafana.",
        "ML — LLM/NLP, BERT embeddings; TFLite for on-device recommendations.",
        "Frontend & Mobile — React/TypeScript dashboards (D3/Plotly); React Native & iOS (Swift/SwiftUI).",
    ];

    return (
        <section id="what-i-do" className="do wrap container">
            <div className="do-grid">
                {/* 文字内容（手机端先出现） */}
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

                {/* 配图（手机端排在文字后） */}
                <div className="do-visual">
                    <img src={headerImg} alt="Developer at desk" className="do-hero dev" />
                </div>
            </div>
        </section>
    );
}
