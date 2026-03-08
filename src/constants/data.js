import { EYE, PAL } from './theme'

export const NAV_PAGES = [
  { key: 'home',       label: 'Home',       subtitle: 'Piano Hero',      accent: '#E37B88' },
  { key: 'experience', label: 'Experience',  subtitle: "Where I've Been", accent: EYE.iris },
  { key: 'projects',   label: 'Projects',    subtitle: 'Selected Work',   accent: PAL.orange },
  { key: 'about',      label: 'About',       subtitle: 'Get to Know Me',  accent: '#928544' },
]

export const TYPEWRITER_TITLES = [
  'Creative Software Engineering',
  'Full Stack Development',
  'Innovative iOS Development',
  'Data Engineering & IoT',
  'Product & Project Innovation',
  'Design Driven Development',
]

export const HOME_ZONES = (musicOn) => [
  { id: 'exp',    top: '62.5%', left: '45%',   w: 50,  h: 50,  r: '50%',  label: 'Experience', msg: "That's my little globe!\nI've worked across 3 countries",  nav: 'experience', freq: 261.6 },
  { id: 'proj',   top: '60%',   left: '48%',   w: 38,  h: 45,  r: '4px',  label: 'Projects',   msg: "My notebook of ideas —\nwanna peek inside?",              nav: 'projects',   freq: 329.6 },
  { id: 'resume', top: '61%',   left: '55.5%', w: 28,  h: 28,  r: '50%',  label: 'Resume',     msg: "My resume — grab a copy!",                                nav: null,         freq: 392.0 },
  { id: 'keys',   top: '69%',   left: '52%',   w: 250, h: 20,  r: '4px',  label: '♫ Music',    msg: musicOn ? 'Click to pause the melody 🎵' : 'These keys actually play!\nClick to start music 🎶', nav: '_music', freq: 523.3 },
  { id: 'about',  top: '75%',   left: '51%',   w: 100, h: 100, r: '50%',  label: 'About Me',   msg: "That's me, Coco!\nI code, draw & care for 20+ pets",      nav: 'about',      freq: 659.3 },
  { id: 'lid',    top: '42%',   left: '50%',   w: 180, h: 80,  r: '8px',  label: 'Piano',      msg: "My grand piano —\nwhere code meets creativity",            nav: null,         freq: 196.0 },
  { id: 'coffee', top: '57%',   left: '57%',   w: 30,  h: 30,  r: '50%',  label: 'Coffee',     msg: "Fuel for late-night coding ☕\nUsually iced oat latte",     nav: null,         freq: 440.0 },
  { id: 'shadow', top: '52%',   left: '38%',   w: 40,  h: 40,  r: '50%',  label: 'Music Note', msg: "♫ I play piano in real life too!\nClassical & jazz",        nav: null,         freq: 349.2 },
]

export const SOCIALS = [
  { href: 'https://github.com/Cocochoiii',                      label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/coco-choi-5a16511a2/',   label: 'LinkedIn' },
  { href: 'mailto:choi.coco@northeastern.edu',                   label: 'Email' },
]

export const EXPERIENCES = [
  { title: 'UbiWell Lab', role: 'Software Engineer Intern', period: 'May 2025 – Oct 2025', color: EYE.rose, hBg: EYE.cream, hText: EYE.shadow, highlights: ['Django/FastAPI microservices · 2.5M+ data points/day','100+ React/TS dashboards · 1,000+ daily users','iOS module with on-device ML · 99.7% reliability','Kafka event-driven · 50K events/s'] },
  { title: 'Audi Innovation', role: 'Data Engineer Intern', period: 'Jan 2023 – Aug 2024', color: EYE.skin, hBg: EYE.shadow, hText: EYE.skin, highlights: ['500+ GB/day from 20K+ IoT sensors · 99.9% uptime','Airflow + Spark ETL · batch time ↓42%','Snowflake + dbt · SQL perf ↑60%','15+ PySpark models · $2M/yr retention'] },
  { title: 'Mars Inc. HK', role: 'Full Stack Developer', period: 'Feb 2022 – Dec 2022', color: EYE.warm, hBg: EYE.cream, hText: EYE.shadow, highlights: ['React Native + GraphQL · 5,000+ DAU','Socket.IO + Redis · 10K concurrent','MongoDB geospatial · latency ↓65%','Architecture supporting $300K Q1 rev'] },
  { title: 'Pet Paradise', role: 'Founder & Developer', period: '2024 – Now', color: EYE.iris, hBg: EYE.shadow, hText: EYE.iris, highlights: ['Next.js 14 + TypeScript + Stripe','iOS companion app · Swift/SwiftUI','Real-time chat · booking · admin','Caring for 20+ cats & dogs'] },
  { title: 'Northeastern', role: 'MS Computer Science', period: '2024 – 2027', color: EYE.rose, hBg: EYE.rose, hText: '#fff', highlights: ['GPA 3.8/4.0 · Boston, MA','OOD · Algorithms · Cloud · Distributed Systems'] },
  { title: 'Franklin & Marshall', role: 'BA Business & Film', period: '2018 – 2021', color: EYE.skin, hBg: EYE.skin, hText: EYE.shadow, highlights: ['GPA 3.72/4.0 · Lancaster, PA','Double major: Business & Film Studies'] },
]

export const PROJECTS = [
  { title: 'Pet Paradise',      meta: 'Next.js · TypeScript · MongoDB · Stripe',       year: "'24", bg: PAL.pink,   text: '#fff',     hBg: PAL.dark,   hText: PAL.pink,   link: 'https://github.com/Cocochoiii/coco_pets' },
  { title: 'Media Recommender', meta: 'Python · PyTorch · BERT · AWS SageMaker',       year: "'24", bg: PAL.blue,   text: PAL.dark,   hBg: PAL.dark,   hText: PAL.blue,   link: 'https://github.com/Cocochoiii/media-recs_platform' },
  { title: 'MedSync Pro',       meta: 'React · FastAPI · PostgreSQL · Redis · Docker', year: "'25", bg: PAL.yellow, text: PAL.dark,   hBg: PAL.dark,   hText: PAL.yellow, link: 'https://github.com/Cocochoiii/healthcare-analytics-platform' },
  { title: 'Audi E-Charging',   meta: 'React · TypeScript · Express · Socket.IO',      year: "'23", bg: PAL.dark,   text: PAL.yellow, hBg: PAL.yellow, hText: PAL.dark,   link: 'https://github.com/Cocochoiii/audi-e-charging-app' },
  { title: 'Audi IoT Platform', meta: 'FastAPI · Kafka · TimescaleDB · React · ML',    year: "'23", bg: PAL.orange, text: PAL.dark,   hBg: PAL.dark,   hText: PAL.orange, link: 'https://github.com/Cocochoiii/audi-iot-platform' },
  { title: 'MalHae 말해',       meta: 'Swift · SwiftUI · MapKit · MVVM',               year: "'25", bg: PAL.pink,   text: PAL.dark,   hBg: PAL.grey,   hText: '#fff',     link: 'https://github.com/Cocochoiii/korean_learning_APP' },
  { title: 'Mars E-Commerce',   meta: 'React · GraphQL · Node.js · RabbitMQ',          year: "'22", bg: PAL.yellow, text: PAL.dark,   hBg: PAL.orange, hText: '#fff',     link: 'https://github.com/Cocochoiii/mars-ecommerce' },
  { title: 'AdServe Pro',       meta: 'TypeScript · TensorFlow.js · Kafka · K8s',      year: "'25", bg: PAL.grey,   text: '#fff',     hBg: PAL.blue,   hText: PAL.dark,   link: 'https://github.com/Cocochoiii/google_ads' },
]

export const SKILLS = [
  { label: 'React', color: EYE.rose },{ label: 'TypeScript', color: EYE.skin },{ label: 'Next.js', color: EYE.iris },{ label: 'Node.js', color: EYE.warm },
  { label: 'Python', color: EYE.rose },{ label: 'Swift', color: EYE.skin },{ label: 'Django', color: EYE.iris },{ label: 'FastAPI', color: EYE.warm },
  { label: 'GraphQL', color: EYE.rose },{ label: 'Kafka', color: EYE.skin },{ label: 'Docker', color: EYE.iris },{ label: 'MongoDB', color: EYE.warm },
  { label: 'PostgreSQL', color: EYE.rose },{ label: 'AWS', color: EYE.skin },{ label: 'Redis', color: EYE.iris },{ label: 'Spark', color: EYE.warm },
  { label: 'SwiftUI', color: EYE.rose },{ label: 'GSAP', color: EYE.skin },{ label: 'Rive', color: EYE.iris },{ label: 'Git', color: EYE.warm },
]

export const ABOUT_STATS = [
  { n: '3.8', s: '',  label: 'GPA',        color: EYE.rose },
  { n: '3',   s: '+', label: 'Internships', color: EYE.skin },
  { n: '8',   s: '+', label: 'Projects',    color: EYE.iris },
]

export const ABOUT_BIG_STATS = [
  { num: '2.5M+', label: 'Data Points Processed Daily', color: EYE.rose },
  { num: '50K',   label: 'Events per Second (Kafka)',    color: EYE.skin },
  { num: '20+',   label: 'Cats & Dogs Cared For',       color: EYE.warm },
  { num: '99.9%', label: 'System Availability',         color: EYE.iris },
]

export const CONTACT_INFO = [
  { label: 'Email',    value: 'choi.coco@northeastern.edu', href: 'mailto:choi.coco@northeastern.edu' },
  { label: 'Phone',    value: '(617) 762-8179',             href: 'tel:6177628179' },
  { label: 'Location', value: 'Wellesley, MA',              href: null },
]

export const ABOUT_SOCIALS = [
  { href: 'https://github.com/Cocochoiii',                    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/coco-choi-5a16511a2/', label: 'LinkedIn' },
]

/* ═══════════════════════════════════════════════════════════
 *  HOME CHAT — broad intro + behavioral questions
 * ═══════════════════════════════════════════════════════════ */
export const HOME_CHAT = {
  questions: [
    { key: 'about',     label: 'Who are you?' },
    { key: 'work',      label: 'Where have you worked?' },
    { key: 'projects',  label: 'What have you built?' },
    { key: 'skills',    label: "What's your tech stack?" },
    { key: 'education', label: 'Where did you study?' },
    { key: 'design',    label: 'How did you make this site?' },
    { key: 'why',       label: 'What drives you as an engineer?' },
    { key: 'teamwork',  label: 'How do you work in teams?' },
    { key: 'conflict',  label: 'How do you handle disagreements?' },
    { key: 'failure',   label: 'Tell me about a time you failed' },
    { key: 'leadership',label: 'Have you led any initiatives?' },
    { key: 'contact',   label: 'How can I reach you?' },
  ],
  responses: {
    about: `I'm Coco Choi — creative software developer, MS Computer Science at Northeastern. I hold a BA in Business and Film, which is why I treat every interface like a story worth telling.\n\nI've shipped production systems in three countries and care for 20+ rescue animals in my spare time. What would you like to know more about?`,
    work: `Three companies, three countries, three very different scales:\n\nUbiWell Lab (2025) — healthcare research, 2.5M+ data points daily\nAudi Innovation (2023-2024) — IoT pipelines, 500+ GB/day\nMars Inc. Hong Kong (2022) — real-time apps, 5K+ daily users\n\nEach one taught me something different. Ask about any role.`,
    projects: `Eight shipped projects — Pet Paradise (full-stack + iOS), MedSync Pro (healthcare analytics), Media Recommender (ML with PyTorch), two Audi platforms, MalHae (Korean learning iOS), Mars E-Commerce, and AdServe Pro.\n\nCurious about the architecture or story behind any of them?`,
    skills: `Applications: React, TypeScript, Python, Swift. Data: Kafka, Spark, PostgreSQL, Redis. Infrastructure: AWS, Docker, K8s. Creative: GSAP and Rive — which is what makes this site feel alive.\n\nI can go deeper on frontend, backend, or mobile if you're interested.`,
    education: `MS Computer Science at Northeastern (2024-2027), 3.8 GPA — distributed systems, algorithms, cloud.\n\nBA Business and Film at Franklin & Marshall (2018-2021), 3.72 GPA. The film degree taught me visual storytelling; the business degree taught me product thinking. Both show up in my engineering.`,
    design: `React + Vite, GSAP for animations, Rive for illustrations. Each page has its own identity — piano parallax, oil-painting eye, pop-art Warhol grid. Art-directed color strip transitions between pages.\n\nThe hardest part was color-matching Rive artboards to CSS backgrounds — it took days of iteration.`,
    why: `I grew up drawing and making short films. Programming became my creative medium — you build systems that think and respond to people.\n\nWhat drives me is crafting software that people remember. Not just functional, but something with soul. That's why I spend extra time on the 1% details — the hover animations, the sound design, the transitions.`,
    teamwork: `At Audi, I worked in a team of 8 engineers, a PM, and UX designer using Agile sprints. We shipped two sprints ahead of schedule because we front-loaded design reviews.\n\nAt UbiWell, I led code reviews and wrote 200+ tests that raised coverage to 92%. My approach is: clear ownership, thorough reviews, and documentation of every non-obvious decision. That reduced our production bugs by 80% over three months.`,
    conflict: `At Mars, our team disagreed on whether to use REST or GraphQL for the new API. I advocated for GraphQL because our frontend needed flexible queries for 11 different views.\n\nRather than debating abstractly, I built a prototype over a weekend showing both approaches side by side with benchmarks. The data made the decision obvious. GraphQL cut our network requests by 60% and became the standard for the team.`,
    failure: `At Audi, I deployed an ETL pipeline change that looked correct in staging but caused a 4-hour data gap in production. The root cause was a timezone edge case I hadn't tested.\n\nI wrote a post-mortem, added 15 new integration tests specifically for timezone boundaries, and implemented a data completeness check that runs before every pipeline swap. We never had that issue again. It taught me that production is a different country from staging.`,
    leadership: `At UbiWell, I led the initiative to adopt test-driven development across the team. We had a 40% test coverage and frequent production regressions.\n\nI started by writing the first 50 tests myself to show the patterns, then pair-programmed with each team member. Within three months, coverage reached 92% and production bugs dropped 80%. The key was leading by example rather than mandating process.`,
    contact: `Email: choi.coco@northeastern.edu\nPhone: (617) 762-8179\nLocation: Wellesley, MA\n\nGitHub: github.com/Cocochoiii\nLinkedIn: linkedin.com/in/coco-choi-5a16511a2`,
    fallback: `I'm Coco Choi — creative software developer at Northeastern. Worked at Audi, Mars, and UbiWell Lab across three countries.\n\nAsk about my experience, projects, tech stack, teamwork, or what motivates me!`,
  },
}

/* ═══════════════════════════════════════════════════════════
 *  EXPERIENCE CHAT — deep, storytelling, data-driven
 * ═══════════════════════════════════════════════════════════ */
export const EXP_CHAT = {
  questions: [
    { key: 'ubiwell',     label: 'Tell me about UbiWell Lab' },
    { key: 'audi',        label: 'What did you do at Audi?' },
    { key: 'mars',        label: 'How was Mars Inc. in HK?' },
    { key: 'ubiwell_ios', label: 'The UbiWell iOS module?' },
    { key: 'audi_etl',    label: 'The Audi ETL pipeline?' },
    { key: 'mars_rt',     label: 'Real-time at Mars?' },
    { key: 'scale',       label: 'How do you handle scale?' },
    { key: 'challenge',   label: 'Hardest technical problem?' },
    { key: 'growth',      label: 'What did each role teach you?' },
    { key: 'team',        label: 'How do you collaborate?' },
    { key: 'petparadise', label: 'Why build Pet Paradise?' },
    { key: 'tools',       label: 'Day-to-day tools?' },
  ],
  responses: {
    ubiwell: `UbiWell is a healthcare research lab at Northeastern. I built the data infrastructure — Django and FastAPI microservices processing 2.5 million data points daily at p95 under 200ms with 99.9% availability.\n\nThe biggest win was optimizing report generation from 8 hours down to 1.2 hours — an 85% reduction through multi-tier caching and algorithm redesign.\n\nWant to hear about the iOS module or the Kafka pipeline?`,
    audi: `Audi Innovation in Beijing, working on connected vehicle data at a scale that changed how I think about engineering: 500+ GB per day from 20,000+ IoT sensors.\n\nI designed the ETL with Airflow and Spark that cut batch processing from 6 hours to 3.5. Built the Snowflake warehouse with dbt that improved SQL performance 60%. The 15+ PySpark models I built drove a 25% increase in customer retention — roughly $2M/year.\n\nAsk about the ETL design or the predictive models.`,
    mars: `Mars Inc. in Hong Kong was my first production-facing role. I built React Native + GraphQL apps for 5,000+ daily users with OAuth 2.0/JWT auth.\n\nThe defining challenge was scaling to 10K concurrent WebSocket connections during a 2x traffic spike. I implemented distributed rate limiting with token bucket and sliding window algorithms, plus Redis pub/sub and RabbitMQ for message durability.\n\nMongoDB geospatial queries cut search latency by 65%. The architecture supported $300K in Q1 revenue. Want specifics on the real-time system?`,
    ubiwell_ios: `The iOS module was my proudest engineering at UbiWell. It runs on-device ML via TensorFlow Lite — no cloud round-trip — processing 10,000+ daily sensor readings at 99.7% reliability.\n\nThe key design decision was keeping inference local. This cut cloud costs by $3K/month and eliminated network latency from the critical path. I used Core Data for offline persistence so the app works in hospital dead zones.\n\nI also wrote the test suite — XCTest with 92% coverage, following the same TDD discipline as the backend.`,
    audi_etl: `The Audi ETL handled 500+ GB daily across 12 teams. The original pipeline took 6 hours; I got it to 3.5.\n\nThe architecture: Kafka for ingestion with horizontal sharding and round-robin load balancing (3x throughput increase, 75% fewer ingestion failures). Airflow orchestrates Spark Structured Streaming jobs with parallelized Pandas/NumPy transforms reaching sub-second latency.\n\nThe Snowflake warehouse uses dbt for transformation — 60% SQL performance improvement through materialized views and incremental models. Want to know about the monitoring setup?`,
    mars_rt: `The real-time system at Mars handled 10K concurrent connections using a three-layer architecture:\n\nSocket.IO for WebSocket management, Redis pub/sub for cross-server message broadcasting, and RabbitMQ for guaranteed delivery of order events.\n\nThe rate limiting was interesting — I implemented both token bucket (for API endpoints) and sliding window (for WebSocket messages) as custom data structures. During our 2x peak traffic event, the system held without dropping connections.\n\nThe 90% Redis cache hit rate was crucial — it meant most reads never touched MongoDB.`,
    scale: `Each role taught me a different dimension of scale:\n\nAudi was data volume — 500GB/day. Horizontal sharding and Spark parallelism were the answers.\nUbiWell was event throughput — 50K Kafka events per second. Fault-tolerant consumers with dead letter queues.\nMars was connection concurrency — 10K WebSockets. Stateless servers, Redis pub/sub, and connection pooling.\n\nThe common principle: measure the actual bottleneck before optimizing. At Audi I spent a week profiling before writing any optimization code.`,
    challenge: `At UbiWell, report generation took 8 hours — researchers were waiting overnight for results. I profiled the pipeline and found three bottlenecks: redundant database queries, unindexed joins, and serialized processing.\n\nThe fix: multi-tier caching (L1 memory + L2 Redis), query batching with DataLoader patterns, and parallel processing of independent report sections. Result: 8 hours down to 1.2 — an 85% reduction.\n\nThat was the moment I learned that the best optimizations come from understanding the data access patterns, not from algorithmic cleverness.`,
    growth: `Mars taught me shipping velocity — real users, real revenue, real pressure. I learned to make pragmatic tradeoffs and ship incrementally.\n\nAudi taught me data engineering rigor. When you're processing 500GB daily, every inefficient query costs real money. I became obsessive about profiling and monitoring.\n\nUbiWell taught me research-grade reliability. Healthcare data demands 99.9% uptime and 92% test coverage. I became the person who writes the post-mortem.\n\nThe through-line: each role raised my bar for what "production-ready" means.`,
    team: `I believe engineering culture is a multiplier. At UbiWell, I led code reviews and authored 200+ tests — production bugs dropped 80% in three months.\n\nAt Audi, our 8-person team used Agile sprints with CI/CD via GitHub Actions. We achieved 90% test coverage and shipped two sprints early. My role was often the bridge between PM requirements and technical implementation.\n\nMy style: write clear PRs, review thoroughly, and document the "why" behind non-obvious decisions.`,
    petparadise: `I actually care for 20+ rescue cats and dogs. The existing tools for managing bookings, payments, and client communication were terrible — so I built my own.\n\nNext.js 14, TypeScript, MongoDB, Stripe. The iOS companion has Face ID, push notifications, and offline browsing. 33 production deployments on Vercel. It's the project where I have the most emotional investment.`,
    tools: `Daily: VS Code for TypeScript, PyCharm for Python, Xcode for iOS. Docker for local services. Git with conventional commits.\n\nData work: Jupyter for exploration, Airflow for orchestration, Grafana + Prometheus for monitoring.\n\nDesign: Rive for animations, Figma for wireframes. I believe in using the right tool, not the trending one.`,
    fallback: `I've worked at UbiWell Lab, Audi Innovation, and Mars Inc. — each role shaped a different part of how I think about building software.\n\nAsk about any specific role, the technical challenges, scaling strategies, or how I work in teams!`,
  },
}

/* ═══════════════════════════════════════════════════════════
 *  PROJECTS CHAT — architecture, decisions, storytelling
 * ═══════════════════════════════════════════════════════════ */
export const PROJ_CHAT = {
  questions: [
    { key: 'petparadise',  label: 'Tell me about Pet Paradise' },
    { key: 'media',        label: 'How does the Recommender work?' },
    { key: 'medsync',      label: "What's MedSync Pro?" },
    { key: 'charging',     label: 'Audi E-Charging details?' },
    { key: 'iotplatform',  label: 'Audi IoT Platform?' },
    { key: 'mobile',       label: 'Tell me about MalHae' },
    { key: 'marsecom',     label: 'Mars E-Commerce?' },
    { key: 'adserve',      label: "What's AdServe Pro?" },
    { key: 'favorite',     label: 'Which project is your favorite?' },
    { key: 'architecture', label: 'How do you design systems?' },
    { key: 'tradeoffs',    label: 'Hardest technical tradeoff?' },
    { key: 'testing',      label: 'How do you approach testing?' },
  ],
  responses: {
    petparadise: `Born from real need — I care for 20+ rescue animals and the existing tools were awful. So I built a complete platform.\n\nThe web app (Next.js 14, TypeScript, MongoDB, Stripe) has JWT auth with refresh tokens, real-time availability, dynamic pricing with 5 promo codes, and a full admin dashboard with revenue tracking.\n\nThe iOS companion (Swift/SwiftUI) adds Face ID, push notifications, offline browsing, and MapKit directions. 33 production deployments so far.\n\nWant to know about the payment architecture or the booking system?`,
    media: `This project solves the cold start problem — how do you recommend content to a user with zero history?\n\nThe answer: a hybrid engine combining collaborative filtering (what similar users liked) with BERT embeddings (understanding content semantics). I implemented 4 algorithms to compare: Matrix Factorization, BERT Content-Based, LSTM Sequential, and Contrastive Learning.\n\nThe hybrid model won — 0.85 Precision@10, 0.79 NDCG@10. Trained on SageMaker with 4 GPUs, cutting training from 12h to 4h. A/B testing showed 35% engagement improvement and 2.5h more watch time per user.\n\nCurious about the ML architecture or the observability stack?`,
    medsync: `MedSync Pro serves 1,000+ daily healthcare users with 2.5M+ data points processed daily. The backend is FastAPI with a multi-tier cache — L1 memory LRU plus L2 Redis — achieving p95 under 200ms.\n\nThe frontend has 8 pages: real-time dashboard with auto-refresh, patient management with search/filter/pagination, alert system with severity levels, analytics with Recharts, and report generation.\n\nPostgreSQL for primary data (ACID compliance for medical records), MongoDB for analytics (flexible schema), Redis for caching. Docker Compose ties it together.\n\nWhat interests you — the caching strategy or the real-time dashboard?`,
    charging: `A premium EV charging app inspired by Tesla and Porsche charging experiences. React 18 + TypeScript with Zustand state management, TanStack Query, and Framer Motion.\n\nThe backend (Express.js, TypeScript) uses Socket.IO for live charging progress — you see your battery fill in real-time. Features include remote vehicle commands, trip planning with charging stop optimization, and cost analytics.\n\nThe dark theme with Audi brand colors and glassmorphism UI was designed to feel as premium as the car itself. Want to know about the real-time architecture?`,
    iotplatform: `Enterprise-grade fleet management handling telemetry from thousands of vehicles.\n\nFastAPI backend with Kafka streaming, PostgreSQL + TimescaleDB for time-series data, and Celery async workers. The ML layer does two things: Isolation Forest for anomaly detection (catching sensor failures before they cascade) and Gradient Boosting for predictive maintenance.\n\nInfrastructure is fully containerized — Docker, Kubernetes, Terraform for AWS. Monitoring via Prometheus, Grafana, and Jaeger distributed tracing.\n\nThe hardest part was designing the data model for time-series queries across heterogeneous sensor types.`,
    mobile: `MalHae is a K-pop-themed Korean learning app — 96 lessons, 328 vocabulary words, 15 idol groups. Built entirely in Swift/SwiftUI with zero third-party dependencies.\n\nThe technical highlight is the on-device AI: KoreanAnalyzer does particle error detection, verb conjugation checking, politeness level analysis, and similarity scoring — all locally, no network needed.\n\n15 idol groups with verified fan colors dynamically re-theme the entire app via a single .tint modifier. 22 Swift files, 2,400 lines, 18 XCTest unit tests.\n\nWant to hear about the speech recognition or the map system?`,
    marsecom: `11,000+ lines of TypeScript — React 18 + Apollo Client + GraphQL + MongoDB. Full e-commerce with cart, checkout, order tracking, reviews, and three user roles.\n\nThe backend uses DataLoader to prevent N+1 queries, circuit breakers for external services, and RabbitMQ for async order processing. Multi-layer caching: LRU memory plus Redis distributed.\n\nThe frontend has Zustand for state, Framer Motion for animations, and Apollo's normalized cache. Docker Compose runs everything with Nginx reverse proxy.\n\nWhat interests you — the GraphQL design or the caching strategy?`,
    adserve: `AdServe Pro does real-time ad relevance scoring in the browser using TensorFlow.js — no server round-trip for predictions. This is the key differentiator.\n\nKafka handles the event pipeline for impression and click tracking. The services are stateless and horizontally scalable on Kubernetes, with event sourcing for full auditability.\n\nIt's designed for the scale where milliseconds matter — every ad request needs a prediction before the page renders.`,
    favorite: `Pet Paradise — because every line of code connects to something real. My 20+ rescue animals depend on the booking and communication systems I built.\n\nTechnically, the Media Recommender was the most challenging — four ML algorithms, cold start with BERT embeddings, 35% engagement improvement in A/B testing.\n\nAnd MalHae is my craftsmanship showcase — zero dependencies, on-device NLP, dynamic theming. Pure native iOS engineering.`,
    architecture: `I start from the user experience and work backwards. The question is always: what does the user need to feel, and what's the simplest system that delivers that?\n\nFor databases, I pick per use case — PostgreSQL for ACID, MongoDB for flexibility, Redis for speed, TimescaleDB for time-series. For real-time: Socket.IO for <1K connections, Kafka for event streaming at scale.\n\nThe principle that guides everything: design for the failure mode. Circuit breakers, graceful degradation, multi-tier caching. If a cache misses, the system should still respond in under a second.`,
    tradeoffs: `On the Media Recommender, I had to choose between model accuracy and inference speed. The BERT-based model was 15% more accurate but 9x slower (45ms vs 5ms per prediction).\n\nThe solution: I precompute BERT embeddings offline and serve them from Redis. Live inference only runs collaborative filtering (5ms). The hybrid gets most of BERT's accuracy at collaborative filtering's speed.\n\nThat pattern — compute expensive things offline, serve cheap things live — became my default for ML systems.`,
    testing: `I follow the testing pyramid: many unit tests, fewer integration tests, minimal E2E tests. At UbiWell I raised coverage from 40% to 92% with 200+ tests.\n\nMy approach: test the contracts (inputs/outputs), not the implementation. Mock external services, but test database queries against real databases in CI.\n\nFor ML projects, I add data validation tests — checking for distribution shifts, missing features, and prediction bounds. The Media Recommender has tests that flag when recommendation diversity drops below a threshold.`,
    fallback: `I've shipped 8+ projects spanning web, mobile, ML, and data engineering. Each one taught me different lessons about architecture, scale, and craft.\n\nAsk about any project's technical decisions, the story behind it, or how I approach testing and system design!`,
  },
}