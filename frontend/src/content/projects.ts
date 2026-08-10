export type Project = {
  id: string;
  title: string;
  year?: string;
  tags: string[];
  summary: string;
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "pokemon-scanner",
    title: "Pokémon card scanner",
    year: "2025–",
    tags: ["Python", "ML", "FastAPI", "ONNX"],
    summary:
      "Side project: pack and binder scans with OCR plus a trained strip-embedding matcher. Training pipeline, Railway services, and deploy gates for real-world handheld photos.",
    href: "https://github.com/lee14k/pokemon-card-scanner",
    featured: true,
  },
  {
    id: "clever-benefits",
    title: "Clever Benefits portal",
    year: "2026–",
    tags: ["React", "TypeScript", "PostgreSQL", "Redis"],
    summary:
      "Multi-tenant insurance portal consolidation — co-lead architecture and delivery with Redis/BullMQ job processing and stakeholder-driven scoping.",
    featured: true,
  },
  {
    id: "visible",
    title: "VISIBLE",
    year: "2025–",
    tags: ["React Native", "Rails", "Mobile"],
    summary:
      "Consumer mobile app for 1500+ users — roadmap ownership through store releases, including messaging, deep links, and spam prevention.",
    featured: true,
  },
  {
    id: "bluetread",
    title: "Bluetread scheduling",
    year: "2025–26",
    tags: ["Angular", ".NET", "MSSQL"],
    summary:
      "Enterprise scheduling for 12+ tenants. Frontend rewrite filtering (−20% latency) and cross-tenant sync redesign (−25% time, −30% sync errors).",
  },
  {
    id: "sentry-payments",
    title: "Sentry payment platform",
    year: "2024–26",
    tags: ["C#", "Vue", "Integrations"],
    summary:
      "Co-led modernization of a flagship payments app (50K+ lines VB→C#/Vue) and kept PayPal / JP Morgan Chase flows healthy in production.",
  },
  {
    id: "sentry-workday",
    title: "Workday financial controls",
    year: "2024–26",
    tags: ["Workday", "AtScale", "Snowflake"],
    summary:
      "Automated Workday Adaptive Planning / HCM integrations across 300K+ rows — >$100K annual savings for finance via real-time metrics.",
  },
  {
    id: "orange-cat-platforms",
    title: "Orange Cat reservation platforms",
    year: "2022–24",
    tags: ["Next.js", "React", "AWS", "PostgreSQL"],
    summary:
      "Founded Orange Cat Media and shipped fullstack booking systems on AWS generating $130K+ combined annual revenue for hospitality clients.",
  },
];
