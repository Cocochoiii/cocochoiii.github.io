import React, { useRef, useState, useEffect } from "react";
import "./WhatIDo.css";
import headerImg from "../assets/img/header2-img.svg";

/* 小组件：视口可见时数字平滑计数 */
function useCountUp(inViewRef, {
    from = 0,
    to = 100,
    duration = 1200,
    enabled = true,        // ✅ 新增开关
} = {}) {
    const [val, setVal] = useState(from);

    useEffect(() => {
        // Tab 未开启或用户偏好减少动画 → 直接到目标值
        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (!enabled) { setVal(from); return; }
        if (prefersReduced || !("IntersectionObserver" in window)) { setVal(to); return; }

        const el = inViewRef.current;
        if (!el) return; // 元素尚未挂载，等下一次 enabled 变更再试

        let raf, start;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            io.disconnect();
            const step = (t) => {
                if (!start) start = t;
                const p = Math.min(1, (t - start) / duration);
                setVal(from + (to - from) * p);
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

        io.observe(el);
        return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
    }, [inViewRef, from, to, duration, enabled]);   // ✅ 把 enabled 放进依赖
    return val;
}


export default function WhatIDo() {
    const [tab, setTab] = useState("stacks");
    const visualRef = useRef(null);
    const m1Ref = useRef(null), m2Ref = useRef(null), m3Ref = useRef(null), m4Ref = useRef(null);

    // 右侧插画 3D 视差
    const onVisualMove = (e) => {
        const el = visualRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", px);
        el.style.setProperty("--my", py);
        el.style.setProperty("--rx", -(py - 0.5) * 8 + "deg");
        el.style.setProperty("--ry", (px - 0.5) * 8 + "deg");
    };
    const onVisualLeave = () => {
        const el = visualRef.current;
        if (!el) return;
        el.style.setProperty("--mx", .5);
        el.style.setProperty("--my", .5);
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    };

    const enableMetrics = tab === "metrics";

    const p95   = useCountUp(m1Ref, { from: 400, to: 200,  duration: 1100, enabled: enableMetrics });
    const users = useCountUp(m2Ref, { from:   0, to: 1000, duration: 1200, enabled: enableMetrics });
    const data  = useCountUp(m3Ref, { from:   0, to:   2.5, duration: 1200, enabled: enableMetrics });
    const up    = useCountUp(m4Ref, { from:   0, to:  99.9, duration: 1200, enabled: enableMetrics });

    const stacks = [
        {
            title: "Languages",
            items: [
                { cls: "devicon-python-plain",       label: "Python" },
                { cls: "devicon-java-plain",         label: "Java" },
                { cls: "devicon-javascript-plain",   label: "JavaScript" },
                { cls: "devicon-go-plain",           label: "Go" },
                { cls: "devicon-cplusplus-plain",    label: "C++" },
                { cls: "devicon-swift-plain",        label: "Swift" },
                { cls: "devicon-kotlin-plain",       label: "Kotlin" },
                { cls: "devicon-sqlite-plain",       label: "SQL" },
            ],
        },
        {
            title: "Backend",
            items: [
                { cls: "devicon-nodejs-plain",             label: "Node.js" },
                { cls: "devicon-django-plain",             label: "Django" },
                { cls: "devicon-fastapi-plain",            label: "FastAPI" },
                { cls: "devicon-spring-plain",             label: "Spring Boot" },
                { cls: "devicon-graphql-plain",            label: "GraphQL" },
                { cls: "devicon-apachekafka-plain",        label: "Kafka" },
                { cls: "devicon-redis-plain",              label: "Redis" },
                { cls: "devicon-mongodb-plain",            label: "MongoDB" },
                { cls: "devicon-postgresql-plain",         label: "PostgreSQL" },
            ],
        },
        {
            title: "Frontend",
            items: [
                { cls: "devicon-react-original",           label: "React" },
                { cls: "devicon-nextjs-original",          label: "Next.js" },   // 黑标志，下面CSS会反白
                { cls: "devicon-html5-plain",              label: "HTML5" },
                { cls: "devicon-css3-plain",               label: "CSS3" },
                { cls: "devicon-tailwindcss-plain",        label: "Tailwind" },
                { cls: "devicon-redux-original",           label: "Redux" },
                { cls: "devicon-d3js-plain",               label: "D3" },
                { cls: "devicon-jest-plain",               label: "Jest" },
            ],
        },
    ];

    const highlights = [
        "Low-latency backends — REST/JSON & gRPC on Django/FastAPI; p95 < 200ms.",
        "Media infra — FFmpeg + HLS/DASH/WebRTC; CDN & object storage with cost guardrails.",
        "Streaming & ETL — Kafka, Spark, Airflow powering realtime analytics.",
        "Cloud & DevOps — AWS, Docker, K8s; CI/CD on GitHub Actions; OTel + Grafana/Prom.",
        "ML — LLM/NLP & BERT embeddings; TFLite for on-device recommendations.",
        "UX — React/TS dashboards (D3/Plotly) + iOS with Swift/SwiftUI.",
    ];

    return (
        <section id="what-i-do" className="do wrap container">
            <div className="do-grid">
                {/* 文案 + Tabs */}
                <div className="do-content">
                    <h2 className="do-title">What I do</h2>
                    <p className="do-sub">
                        I build interactive, data-driven products across web, media, and mobile—blending
                        systems engineering with human-centered UX.
                    </p>

                    {/* Segmented Tabs */}
                    <div className="do-tabs" role="tablist" aria-label="What I do tabs">
                        {["stacks", "highlights", "metrics"].map((k) => (
                            <button
                                key={k}
                                role="tab"
                                aria-selected={tab === k}
                                className={`do-tab ${tab === k ? "active" : ""}`}
                                onClick={() => setTab(k)}
                            >
                                {k === "stacks" ? "Stacks" : k === "highlights" ? "Highlights" : "Metrics"}
                            </button>
                        ))}
                        <span className={`do-tab-indicator ${tab}`} aria-hidden />
                    </div>

                    {/* Tab Content */}
                    {tab === "stacks" && (
                        <div className="stack-grid" role="list">
                            {stacks.map((group) => (
                                <div className="stack-card" role="listitem" key={group.title}>
                                    <div className="stack-head">{group.title}</div>
                                    <div className="stack-icons">
                                        {group.items.map((t) => (
                                            <div
                                                className="stack-icon"
                                                key={t.label}
                                                aria-label={t.label}
                                                title={t.label}
                                            >
                                                <i className={t.cls} />
                                                <span>{t.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {tab === "highlights" && (
                        <ul className="do-bullets">
                            {highlights.map((b, i) => (
                                <li key={i}>
                                    <span className="zap" aria-hidden>⚡</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {tab === "metrics" && (
                        <div className="metric-grid">
                            <div className="metric" ref={m1Ref}>
                                <div className="metric-value">&lt;{Math.round(p95)}</div>
                                <div className="metric-unit">ms</div>
                                <div className="metric-label">p95 latency</div>
                            </div>
                            <div className="metric" ref={m2Ref}>
                                <div className="metric-value">{Math.round(users/100)/10}k</div>
                                <div className="metric-label">daily users served</div>
                            </div>
                            <div className="metric" ref={m3Ref}>
                                <div className="metric-value">{data.toFixed(1)}M+</div>
                                <div className="metric-label">datapoints processed</div>
                            </div>
                            <div className="metric" ref={m4Ref}>
                                <div className="metric-value">{up.toFixed(1)}%</div>
                                <div className="metric-label">uptime</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 插画（手机端在后） */}
                <div
                    className="do-visual"
                    ref={visualRef}
                    onMouseMove={onVisualMove}
                    onMouseLeave={onVisualLeave}
                >
                    <img src={headerImg} alt="Developer at desk" className="do-hero dev" />
                </div>
            </div>
        </section>
    );
}
