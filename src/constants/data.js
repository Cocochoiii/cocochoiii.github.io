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
    { key: 'design',    label: 'How did you build this site?' },
    { key: 'why',       label: 'What drives you?' },
    { key: 'teamwork',  label: 'How do you work in teams?' },
    { key: 'conflict',  label: 'Handling disagreements?' },
    { key: 'failure',   label: 'A time you failed?' },
    { key: 'leadership',label: 'Leadership experience?' },
    { key: 'contact',   label: 'How to reach you?' },
  ],
  responses: {
    about: "I'm Coco Choi \u2014 creative software developer, MS CS at Northeastern. I blend engineering with design, which is why this portfolio has Rive animations instead of stock photos.\n\nI\u2019ve shipped production systems across three countries and I care for 20+ rescue animals. Want to hear about my work, my projects, or what motivates me?",
    work: "Three companies, three countries, three different scales:\n\nUbiWell Lab (2025) \u2014 healthcare research, 2.5M+ data points/day\nAudi Innovation (2023\u20132024) \u2014 IoT pipelines, 500+ GB/day\nMars Inc. HK (2022) \u2014 real-time apps, 5K+ DAU\n\nWhich role would you like to dig into?",
    projects: "Eight shipped projects so far \u2014 spanning full-stack web, iOS, ML, and data engineering.\n\nThe big ones: Pet Paradise, MedSync Pro, Media Recommender, Audi E-Charging, Audi IoT, MalHae, Mars E-Commerce, AdServe Pro.\n\nPick any one and I'll walk you through the architecture and decisions behind it.",
    skills: "Applications: React, TypeScript, Python, Swift\nData: Kafka, Spark, PostgreSQL, Redis\nInfra: AWS, Docker, K8s\nCreative: GSAP, Rive\n\nI can go deeper on frontend, backend, data engineering, mobile, or DevOps. What interests you?",
    education: "MS Computer Science at Northeastern (2024\u20132027), 3.8 GPA \u2014 distributed systems, algorithms, cloud computing.\n\nBA Business and Film at Franklin & Marshall (2018\u20132021), 3.72 GPA. The film degree taught me visual storytelling; the business degree taught me product thinking.\n\nCurious how the film background shapes my engineering approach?",
    design: "React + Vite, GSAP for animations, Rive for interactive illustrations. Each page has its own artistic identity \u2014 piano parallax, oil-painting eye, pop-art Warhol grid.\n\nThe hardest part was color-matching Rive artboards to CSS backgrounds \u2014 took days of iteration. Want to hear about the page transitions, the font pairing decisions, or the technical challenges?",
    why: "I grew up drawing and making short films. Programming became my creative medium \u2014 you build systems that think and respond.\n\nI want to make software people remember. Not just functional, but with soul. That's why I obsess over hover animations, sound design, and transitions.\n\nWant to know how this philosophy shows up in my actual work?",
    teamwork: "At Audi, I worked with 8 engineers, PM, and UX in Agile sprints \u2014 we shipped two sprints ahead of schedule by front-loading design reviews.\n\nAt UbiWell, I led code reviews and wrote 200+ tests raising coverage to 92%. Production bugs dropped 80% over three months.\n\nWant specifics on my code review approach or how I handle cross-functional collaboration?",
    conflict: "At Mars, our team disagreed on REST vs GraphQL for the new API. Rather than debating abstractly, I built a weekend prototype comparing both with real benchmarks.\n\nGraphQL cut network requests by 60% \u2014 the data made the decision obvious. It became the team standard.\n\nI always try to resolve disagreements with evidence, not opinions. Want to hear about other technical decisions I've navigated?",
    failure: "At Audi, I deployed an ETL change that caused a 4-hour production data gap. Root cause: a timezone edge case I hadn't tested for.\n\nI wrote a post-mortem, added 15 integration tests for timezone boundaries, and built a data completeness check that runs before every pipeline swap.\n\nIt taught me that production is a different country from staging. Want to hear how this changed my testing approach?",
    leadership: "At UbiWell, I led the TDD adoption initiative. We started at 40% test coverage with frequent production regressions.\n\nI wrote the first 50 tests to establish patterns, then pair-programmed with each team member. Three months later: 92% coverage, 80% fewer bugs.\n\nThe key was leading by example, not mandating process. Interested in how I approach mentoring junior engineers?",
    contact: "Email: choi.coco@northeastern.edu\nPhone: (617) 762-8179\nLocation: Wellesley, MA\n\nGitHub: github.com/Cocochoiii\nLinkedIn: linkedin.com/in/coco-choi-5a16511a2",
    frontend: "React and TypeScript are my primary tools. I also work with Next.js for SSR/SSG, and SwiftUI for native iOS.\n\nFor animation: GSAP for transitions and Rive for interactive illustrations. This portfolio is a showcase of both.\n\nWant to know about my component architecture patterns or how I handle state management?",
    backend: "Python (Django, FastAPI) and Node.js (Express, GraphQL). I've built microservice architectures with Kafka event streaming and gRPC.\n\nAt UbiWell, my FastAPI services hit p95 under 200ms while processing 2.5M data points daily.\n\nInterested in my caching strategies, API design philosophy, or how I handle auth?",
    database: "I pick per use case: PostgreSQL for ACID, MongoDB for flexible schemas, Redis for caching (90% hit rate at Mars), TimescaleDB for time-series at Audi, Snowflake for analytics.\n\nAt Mars, I cut search latency 65% with MongoDB geospatial + compound indexes. Want the details on that optimization?",
    devops: "Docker and Kubernetes for containerization. GitHub Actions for CI/CD \u2014 at Audi we achieved 90% test coverage in the pipeline.\n\nI've written Terraform for AWS infrastructure and set up Prometheus/Grafana monitoring stacks.\n\nWant to hear about my approach to observability or deployment strategies?",
    testing: "I follow the testing pyramid: many unit tests, fewer integration, minimal E2E. At UbiWell I raised coverage from 40% to 92% with 200+ tests.\n\nMy approach: test contracts not implementation. Mock external services but test DB queries against real databases in CI.\n\nFor ML projects, I add data validation tests. Want specifics on how I test distributed systems?",
    fallback: "I'm Coco Choi \u2014 creative software developer at Northeastern. Worked at Audi, Mars, and UbiWell Lab across three countries.\n\nTry asking about a specific role, project, technical skill, or how I approach teamwork and problem-solving!",
  },
}

/* ═══════════════════════════════════════════════════════════
 *  EXPERIENCE CHAT — deep storytelling per role
 * ═══════════════════════════════════════════════════════════ */
export const EXP_CHAT = {
  questions: [
    { key: 'ubiwell',      label: 'UbiWell Lab overview' },
    { key: 'audi',         label: 'Audi Innovation overview' },
    { key: 'mars',         label: 'Mars Inc. overview' },
    { key: 'ubiwell_ios',  label: 'UbiWell iOS module?' },
    { key: 'ubiwell_kafka',label: 'UbiWell Kafka pipeline?' },
    { key: 'audi_etl',     label: 'Audi ETL pipeline?' },
    { key: 'audi_ml',      label: 'Audi predictive models?' },
    { key: 'mars_rt',      label: 'Mars real-time system?' },
    { key: 'scale',        label: 'How do you handle scale?' },
    { key: 'challenge',    label: 'Hardest technical problem?' },
    { key: 'growth',       label: 'What did each role teach you?' },
    { key: 'architecture', label: 'System design approach?' },
  ],
  responses: {
    ubiwell: "UbiWell is a healthcare research lab at Northeastern where I built the core data infrastructure.\n\nThe headline numbers: 2.5M data points/day, p95 under 200ms, 99.9% availability. But the real story is in the subsystems \u2014 the Kafka pipeline, the iOS ML module, the 100+ dashboards, and the report optimization.\n\nWhich subsystem would you like me to walk through?",
    ubiwell_ios: "The iOS module was my proudest work at UbiWell. It runs on-device ML via TensorFlow Lite \u2014 no cloud round-trip needed.\n\nIt processes 10,000+ daily sensor readings at 99.7% reliability, and cut cloud costs by $3K/month. Core Data handles offline persistence so it works in hospital dead zones.\n\nThe test suite: XCTest with 92% coverage. Want to know about the ML model architecture or the offline-first design?",
    ubiwell_kafka: "The Kafka pipeline handles 50K events per second with fault-tolerant consumers and dead letter queues for failed messages.\n\nThe key design: idempotent consumers with exactly-once semantics. Each event carries a correlation ID that threads through the entire system for distributed tracing.\n\nBefore Kafka, we lost about 15% of data during peak loads. After: zero data loss. Want to know about the consumer group topology or how we handle backpressure?",
    ubiwell_dash: "100+ React/TypeScript dashboards with D3.js and Plotly visualizations serving 1,000+ daily researchers.\n\nEach dashboard has role-based views \u2014 a PI sees aggregate trends while a research assistant sees individual data points. Real-time updates via WebSocket subscriptions.\n\nThe biggest optimization: report generation went from 8 hours to 1.2 hours through multi-tier caching and query batching. Curious about the caching architecture?",
    audi: "Audi Innovation in Beijing \u2014 connected vehicle data at enterprise scale. 500+ GB/day from 20,000+ IoT sensors.\n\nMy work spanned three areas: the ingestion pipeline (Kafka + Spring Boot), the ETL layer (Airflow + Spark), and the analytics warehouse (Snowflake + dbt). Plus 15+ PySpark predictive models.\n\nWhich layer interests you most?",
    audi_etl: "The ETL processed 500+ GB daily across 12 teams. Original batch time: 6 hours. I got it to 3.5.\n\nArchitecture: Kafka ingestion with horizontal sharding and round-robin load balancing (3x throughput, 75% fewer failures). Airflow orchestrates Spark Structured Streaming with parallelized Pandas/NumPy transforms.\n\nThe critical insight: most time was wasted on redundant shuffles. Repartitioning by sensor_id before joins eliminated 40% of shuffle bytes. Want to know about the Airflow DAG design or how we handle late-arriving data?",
    audi_snow: "The Snowflake warehouse uses dbt for transformation \u2014 60% SQL performance improvement through materialized views and incremental models.\n\nKey pattern: star schema with slowly-changing dimensions for vehicle metadata. Incremental models mean we only reprocess new data, not the entire history.\n\nThe query optimizer was tricky \u2014 Snowflake's auto-clustering works differently from traditional B-tree indexes. Want specifics on how I tuned the clustering keys?",
    audi_ml: "15+ PySpark models for predictive maintenance \u2014 the business impact was roughly $2M/year in customer retention (25% improvement).\n\nThe approach: gradient boosting for failure prediction, trained on historical sensor patterns. Feature engineering was 70% of the work \u2014 rolling window aggregations, sensor drift detection, cross-correlation features.\n\nThe hardest part wasn't the modeling. It was getting the data scientists and the data engineers to agree on feature definitions. Want details on the feature pipeline?",
    mars: "Mars Inc. in Hong Kong \u2014 React Native + GraphQL apps serving 5,000+ DAU with $300K Q1 revenue.\n\nThree technical pillars: the GraphQL API layer, the real-time messaging system, and the geospatial search optimization.\n\nWhich aspect would you like to explore?",
    mars_rt: "10K concurrent WebSocket connections using a three-layer architecture:\n\nSocket.IO for connection management, Redis pub/sub for cross-server broadcasting, RabbitMQ for guaranteed delivery of order events.\n\nI implemented both token bucket (API endpoints) and sliding window (WebSocket messages) rate limiting as custom data structures. During our 2x peak traffic event, zero dropped connections.\n\nWant to know about the connection pooling strategy or how we handle reconnection?",
    mars_db: "Cut MongoDB search latency by 65% through two optimizations:\n\n1. Geospatial indexes with 2dsphere for location-based queries \u2014 reduced full collection scans to index-only lookups\n2. Compound indexes on (category + price_range + location) for filtered searches\n\nRedis caching added a 90% hit rate layer on top. The cache invalidation strategy uses event sourcing \u2014 every data mutation publishes an event that triggers cache updates.\n\nInterested in the data modeling decisions or the cache invalidation patterns?",
    scale: "Each role taught me a different dimension:\n\nAudi: data volume (500GB/day) \u2014 horizontal sharding, Spark parallelism\nUbiWell: event throughput (50K/sec) \u2014 Kafka partitioning, idempotent consumers\nMars: connection concurrency (10K WebSockets) \u2014 stateless servers, Redis pub/sub\n\nThe common principle: profile first, optimize the actual bottleneck. At Audi I spent a full week profiling before writing any optimization code.\n\nWant to hear about a specific scaling challenge in detail?",
    challenge: "At UbiWell, report generation took 8 hours. Researchers were waiting overnight.\n\nI profiled and found three bottlenecks: redundant DB queries (same data fetched 47 times), unindexed joins, and serialized processing of independent sections.\n\nFix: multi-tier caching (L1 memory + L2 Redis), DataLoader-pattern query batching, and parallel processing. Result: 8h down to 1.2h \u2014 85% reduction.\n\nThat taught me that the best optimizations come from understanding data access patterns. Want details on the caching tiers?",
    growth: "Mars taught me shipping velocity \u2014 real users, real revenue, real pressure. Make pragmatic tradeoffs and ship incrementally.\n\nAudi taught me data rigor. Processing 500GB daily forces you to think about every byte. I became obsessive about profiling.\n\nUbiWell taught me research-grade reliability. Healthcare demands 99.9% uptime and 92% test coverage.\n\nThe through-line: each role raised my bar for what 'production-ready' means. Want to dig into any specific lesson?",
    architecture: "I think in layers: API gateway, service layer, data layer \u2014 with clear contracts between them.\n\nDatabase selection per use case: PostgreSQL for ACID, MongoDB for flexible documents, Redis for caching, TimescaleDB for time-series.\n\nCore principle: design for failure. Circuit breakers, graceful degradation, multi-tier caching. If a cache misses, the system still responds in under a second.\n\nWant me to walk through a specific system I've designed?",
    team: "At UbiWell I led code reviews and raised coverage to 92%. At Audi, our 8-person team shipped two sprints early using Agile.\n\nMy style: clear PR descriptions, thorough reviews, and documenting the 'why' behind non-obvious decisions. I believe engineering culture is a multiplier.\n\nCurious about my approach to cross-functional collaboration?",
    petparadise: "I care for 20+ rescue cats and dogs and needed better tools \u2014 so I built Pet Paradise from scratch.\n\nNext.js 14, TypeScript, MongoDB, Stripe. iOS companion in Swift/SwiftUI. 33 production deployments.\n\nWant to know about the payment system, the booking architecture, or the iOS app?",
    tools: "Daily: VS Code, PyCharm, Xcode. Docker for local services. Git with conventional commits.\n\nData: Jupyter for exploration, Airflow for orchestration, Grafana for monitoring.\n\nDesign: Rive for animations, Figma for wireframes. Right tool, not trendy tool.",
    testing: "Testing pyramid: many unit tests, fewer integration, minimal E2E. At UbiWell: 40% to 92% coverage with 200+ tests.\n\nI test contracts, not implementation. Mock external services but use real DBs in CI. For ML: data validation tests checking distribution shifts.\n\nWant to know how I test event-driven systems specifically?",
    devops: "Docker + K8s for containerization. GitHub Actions CI/CD \u2014 90% coverage gate at Audi.\n\nTerraform for AWS infra. Prometheus/Grafana for monitoring. The key is treating infrastructure as code and making deploys boring.\n\nAsk about my blue-green deployment strategy or monitoring approach.",
    fallback: "I've worked at UbiWell Lab, Audi Innovation, and Mars Inc. \u2014 each role shaped how I build production systems.\n\nTry asking about a specific company, a technical subsystem (Kafka, ETL, real-time, ML models), scaling challenges, or how I work in teams!",
  },
}

/* ═══════════════════════════════════════════════════════════
 *  PROJECTS CHAT — architecture deep-dives
 * ═══════════════════════════════════════════════════════════ */
export const PROJ_CHAT = {
  questions: [
    { key: 'petparadise',  label: 'Pet Paradise' },
    { key: 'media',        label: 'Media Recommender' },
    { key: 'medsync',      label: 'MedSync Pro' },
    { key: 'charging',     label: 'Audi E-Charging' },
    { key: 'iotplatform',  label: 'Audi IoT Platform' },
    { key: 'mobile',       label: 'MalHae Korean App' },
    { key: 'marsecom',     label: 'Mars E-Commerce' },
    { key: 'adserve',      label: 'AdServe Pro' },
    { key: 'favorite',     label: 'Your favorite project?' },
    { key: 'architecture', label: 'How do you design systems?' },
    { key: 'tradeoffs',    label: 'Hardest tradeoff?' },
    { key: 'testing',      label: 'Testing approach?' },
  ],
  responses: {
    petparadise: "Born from real need \u2014 I care for 20+ rescue animals and existing tools were terrible.\n\nWeb: Next.js 14, TypeScript, MongoDB, Stripe. JWT auth, real-time availability, dynamic pricing with 5 promo codes, admin dashboard with analytics.\niOS: Swift/SwiftUI with Face ID, push notifications, offline browsing, MapKit.\n\n33 production deployments on Vercel. Want to dig into the payment flow, the booking logic, or the iOS companion?",
    pet_payment: "Stripe integration with three checkout modes: full payment, 30% deposit, and 50% deposit.\n\nWebhook handlers process payment_intent.succeeded, checkout.session.completed, and charge.refunded events. Automated refund processing with partial refund support.\n\nPayment history tracking per user with receipt generation. The tricky part was handling webhook idempotency \u2014 Stripe can send the same event multiple times.\n\nWant to know about the pricing engine or the promo code system?",
    pet_ios: "The iOS companion adds features the web can't: Face ID/Touch ID login, push notifications for booking reminders, offline pet browsing, and native MapKit directions.\n\nArchitecture: MVVM with Observable Objects. UserDefaults for local persistence (favorites, offline data). MapKit for facility directions.\n\nIt's pure SwiftUI targeting iOS 17+. No CocoaPods, no SPM \u2014 zero external dependencies.\n\nCurious about the offline sync strategy or the push notification setup?",
    media: "The core problem: how do you recommend content to users with zero interaction history?\n\nI built a hybrid engine with 4 algorithms: Matrix Factorization (collaborative), BERT Content-Based (NLP), LSTM Sequential (time-aware), and Contrastive Learning (embedding similarity).\n\nThe hybrid model won: 0.85 Precision@10, 0.79 NDCG@10. A/B testing showed 35% engagement lift.\n\nWant to hear about the cold start solution, the ML pipeline, or the infrastructure?",
    media_ml: "The cold start solution uses BERT embeddings. For new users, we encode their profile text and find semantically similar existing users whose preferences we can transfer.\n\nFor new items, content embeddings from the title/description are compared against user taste vectors. This bootstraps recommendations until we have enough interaction data for collaborative filtering.\n\nThe LSTM model captures sequential patterns \u2014 what users watch after what. The contrastive learner uses Word2Vec to find items that are similar in embedding space.\n\nWant details on the training pipeline or how I evaluated these models?",
    media_infra: "Training on SageMaker with 4 GPUs cut training from 12h to 4h. The key was distributed data-parallel training with gradient accumulation.\n\nObservability: Prometheus/Grafana for system metrics, OpenTelemetry for distributed tracing, ELK stack for logs. Maintained 99.95% SLA (rolling 30-day).\n\nThe monitoring alone reduced compute costs by $8K/month by identifying underutilized GPU instances.\n\nInterested in the model serving architecture or the A/B testing framework?",
    medsync: "Healthcare analytics for 1,000+ daily users processing 2.5M+ data points.\n\nBackend: FastAPI with multi-tier cache (L1 memory LRU + L2 Redis) hitting p95 under 200ms. JWT auth, rate limiting, Prometheus metrics.\n\n8 React pages: real-time dashboard, patient management, alerts, analytics, reports.\n\nWant to explore the caching architecture, the real-time dashboard, or the alert system?",
    medsync_cache: "Two-tier caching was the key to sub-200ms latency:\n\nL1: In-memory LRU cache for hot data (patient vitals, active alerts). 5-second TTL.\nL2: Redis for warm data (historical trends, aggregations). 60-second TTL.\n\nCache hit rate: 85%+. On cache miss, the query falls back to PostgreSQL with connection pooling. The response still stays under 500ms even on full miss.\n\nThe invalidation strategy uses write-through \u2014 every mutation updates both cache tiers synchronously. Want to know about the connection pooling setup?",
    charging: "Premium EV charging app inspired by Tesla and Porsche experiences. React 18 + TypeScript, Zustand, TanStack Query, Framer Motion.\n\nBackend: Express.js + TypeScript with Socket.IO for live charging progress. JWT auth with refresh tokens.\n\nFeatures: real-time battery status, remote vehicle commands, trip planning with charging stop optimization, cost analytics.\n\nThe glassmorphism dark theme with Audi brand colors was designed to feel as premium as the car. Want details on the real-time architecture or the trip planner algorithm?",
    iotplatform: "Enterprise fleet management with real-time telemetry from thousands of vehicles.\n\nFastAPI + Kafka streaming + PostgreSQL/TimescaleDB + Celery workers. ML layer: Isolation Forest for anomaly detection, Gradient Boosting for predictive maintenance.\n\nFully containerized: Docker, K8s, Terraform for AWS. Prometheus/Grafana/Jaeger monitoring.\n\nThe hardest part: designing a data model for time-series queries across heterogeneous sensor types. Want to explore the ML models or the infrastructure?",
    mobile: "MalHae: K-pop-themed Korean learning app. 96 lessons, 328 vocabulary, 15 idol groups.\n\nZero third-party dependencies. The on-device AI (KoreanAnalyzer) does particle error detection, verb conjugation, politeness analysis, similarity scoring \u2014 all locally.\n\n15 idol groups with verified fan colors dynamically re-theme the entire app. 22 Swift files, 2,400 lines, 18 XCTest tests.\n\nWant to hear about the speech recognition, the NLP engine, or the dynamic theming system?",
    marsecom: "11,000+ lines of TypeScript. React 18 + Apollo Client + GraphQL + MongoDB.\n\nBackend: DataLoader prevents N+1 queries, circuit breakers for fault tolerance, RabbitMQ for async order processing. Multi-layer cache: LRU memory + Redis.\n\nThree user roles: customer, vendor, admin. Full checkout with inventory management.\n\nInterested in the GraphQL schema design, the caching strategy, or the order processing pipeline?",
    adserve: "Real-time ad relevance scoring in the browser using TensorFlow.js \u2014 no server round-trip for predictions.\n\nKafka handles impression/click event streaming. Stateless services on K8s with event sourcing for auditability.\n\nDesigned for millisecond-scale decisions: every ad request needs a prediction before the page renders.\n\nWant to know about the client-side ML architecture or the event pipeline?",
    favorite: "Pet Paradise is the most personal \u2014 my 20+ rescue animals depend on it.\n\nMedia Recommender was the most intellectually challenging \u2014 four ML algorithms, cold start solved, 35% engagement lift.\n\nMalHae is my craftsmanship showcase \u2014 zero dependencies, on-device NLP, dynamic theming. Pure native engineering.\n\nWhich one would you like me to go deeper on?",
    architecture: "I start from user experience and work backwards to infrastructure.\n\nDB selection per use case: PostgreSQL for ACID, MongoDB for flexibility, Redis for speed, TimescaleDB for time-series.\n\nCore principle: design for failure. Circuit breakers, graceful degradation, multi-tier caching.\n\nWant me to walk through a specific system architecture? I can detail Pet Paradise, the Media Recommender ML pipeline, or the Audi IoT platform.",
    tradeoffs: "On Media Recommender: BERT was 15% more accurate but 9x slower (45ms vs 5ms per prediction).\n\nSolution: precompute BERT embeddings offline, serve from Redis. Live inference only runs collaborative filtering. Gets most of BERT's accuracy at collaborative filtering's speed.\n\nThat pattern \u2014 expensive offline, cheap live \u2014 became my default for ML systems. Want to hear about other tradeoffs I've navigated?",
    testing: "Testing pyramid: many unit, fewer integration, minimal E2E.\n\nI test contracts not implementation. Mock external services, real DBs in CI.\n\nFor ML: data validation tests checking distribution shifts, missing features, prediction bounds. The Media Recommender flags when recommendation diversity drops below threshold.\n\nWant specifics on how I test event-driven or distributed systems?",
    scale: "Audi: 500GB/day \u2014 Spark parallelism, horizontal sharding\nUbiWell: 50K events/sec \u2014 Kafka partitioning, idempotent consumers\nMars: 10K WebSockets \u2014 stateless servers, Redis pub/sub\n\nCommon principle: measure the actual bottleneck before optimizing.\n\nAsk about any specific scaling story.",
    database: "I pick per use case: PostgreSQL for transactions, MongoDB for flexible schemas, Redis for sub-ms reads, TimescaleDB for time-series, Snowflake for analytics warehousing.\n\nAt Mars: geospatial + compound indexes cut latency 65%. At Audi: Snowflake clustering keys improved query performance 60%.\n\nWant details on a specific database decision?",
    fallback: "I've shipped 8+ projects across web, mobile, ML, and data engineering.\n\nTry asking about a specific project by name, the architecture decisions behind it, ML model details, scaling challenges, testing strategies, or database choices!",
  },
}