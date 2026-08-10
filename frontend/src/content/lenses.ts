export type Lens = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export const lenses: Lens[] = [
  {
    id: "builder",
    number: "01",
    title: "The builder",
    body: "I ship production systems end to end — multi-tenant insurance portals, enterprise scheduling, consumer mobile apps, and reservation platforms — owning architecture through delivery.",
  },
  {
    id: "range",
    number: "02",
    title: "The range",
    body: "Founder work, agency clients, and large carriers in the same year. Same bar: clear APIs, careful data, and interfaces people can trust when money or schedules are on the line.",
  },
  {
    id: "research",
    number: "03",
    title: "The research path",
    body: "Medical laboratory science first, then software engineering, now an MS in Computer Science at Georgia Tech with involvement in the Design Intelligence Lab — measuring twice, shipping once, explaining the why.",
  },
];
