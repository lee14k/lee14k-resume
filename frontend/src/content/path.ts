export type PathKind = "role" | "education" | "project" | "pivot" | "research";

export type PathEntry = {
  id: string;
  kind: PathKind;
  start: string;
  end?: string;
  title: string;
  org?: string;
  summary: string;
  badges?: string[];
  href?: string;
};

export const pathEntries: PathEntry[] = [
  {
    id: "clever",
    kind: "role",
    start: "2026",
    end: "present",
    title: "Software Engineer II",
    org: "Clever Benefits",
    summary:
      "Co-lead full-stack consolidation of a multi-tenant web app for multiple insurance providers — React and TypeScript on PostgreSQL with Redis and BullMQ. Own large features end-to-end and partner directly with business stakeholders without dedicated PM.",
    badges: ["React", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    id: "visible",
    kind: "role",
    start: "2025",
    end: "present",
    title: "Software Engineer",
    org: "VISIBLE",
    summary:
      "React Native (TypeScript) mobile app with Ruby on Rails backend serving 1500+ active users. Own the product roadmap through App Store and Play Store delivery — deep linking, spam prevention, real-time messaging, and more.",
    badges: ["React Native", "Rails", "Mobile"],
  },
  {
    id: "gatech-ms",
    kind: "education",
    start: "2026",
    end: "2029",
    title: "M.S. Computer Science (in progress)",
    org: "Georgia Institute of Technology",
    summary:
      "OMSCS track while continuing to ship production software. Research involvement with the Design Intelligence Lab (DI Lab) — computational design, AI, and learning technology.",
    badges: ["OMSCS", "DI Lab"],
    href: "https://dilab.gatech.edu/",
  },
  {
    id: "dilab",
    kind: "research",
    start: "2026",
    end: "present",
    title: "Research involvement",
    org: "Design Intelligence Lab, Georgia Tech",
    summary:
      "Engaged with DI Lab work at the intersection of AI, cognitive science, and learning technology — the same lab behind projects like Jill Watson and AI-for-education research.",
    badges: ["Research", "AI + learning"],
    href: "https://dilab.gatech.edu/",
  },
  {
    id: "bluetread",
    kind: "role",
    start: "2025",
    end: "2026",
    title: "Software Engineer",
    org: "Bluetread",
    summary:
      "Full-stack scheduling platform for 12+ enterprise tenants (Angular, C#/.NET, MSSQL). Owned core filtering in a frontend rewrite (−20% latency) and a data sync redesign (−25% sync time, −30% client sync errors).",
    badges: ["Angular", ".NET", "MSSQL"],
  },
  {
    id: "sentry",
    kind: "role",
    start: "2024-05",
    end: "2026-03",
    title: "Software Developer",
    org: "Sentry Insurance",
    summary:
      "Workday Adaptive Planning / HCM integrations replacing manual analysis across 300K+ rows; >$100K annual finance savings via AtScale metrics. Co-led VB→C#/Vue payment app modernization (50K+ lines) and production triage for PayPal and JP Morgan Chase.",
    badges: ["C#", "Vue", "Workday", "Snowflake"],
  },
  {
    id: "orange-cat",
    kind: "role",
    start: "2022-01",
    end: "2024",
    title: "Founder & Software Engineer",
    org: "Orange Cat Media",
    summary:
      "Architected and deployed full-stack reservation platforms (React, Next.js, Node, C#, Prisma, PostgreSQL, AWS) generating $130K+ combined annual revenue for clients.",
    badges: ["Founder", "Next.js", "AWS"],
  },
  {
    id: "pokemon-scanner",
    kind: "project",
    start: "2025",
    end: "present",
    title: "Pokémon card scanner",
    org: "Side project",
    summary:
      "Pack and binder scanning pipeline with OCR plus a learned visual matcher (embeddings / ONNX), training tooling, and Railway-deployed services — identifying cards from handheld photos.",
    badges: ["Python", "ML", "FastAPI"],
    href: "https://github.com/lee14k/pokemon-card-scanner",
  },
  {
    id: "wgu",
    kind: "education",
    start: "2022",
    end: "2025",
    title: "B.S. Software Engineering",
    org: "Western Governors University",
    summary: "Formalized engineering fundamentals while founding Orange Cat and shipping client platforms.",
  },
  {
    id: "pivot-mls-se",
    kind: "pivot",
    start: "2020",
    end: "2022",
    title: "Lab bench → software engineering",
    summary:
      "Moved from medical laboratory science into fullstack product work, carrying experimental rigor into shipping software.",
    badges: ["Career pivot"],
  },
  {
    id: "mtu",
    kind: "education",
    start: "2018",
    end: "2020",
    title: "B.S. Medical Laboratory Science",
    org: "Michigan Technological University",
    summary:
      "Published: The use of non-model Drosophila species to study natural variation in TOR pathway signaling (Steenwinkel, Hamre, Werner, 2022, PLOS ONE).",
    badges: ["Published research"],
  },
];
