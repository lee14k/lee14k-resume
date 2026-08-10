export type RoleStackItem = {
  label: string;
  color: "pink" | "teal" | "orange";
};

export const profile = {
  name: "Kailee Hamre",
  shortName: "Kailee",
  location: "Stevens Point, WI",
  tagline:
    "Senior fullstack engineer shipping production web and mobile platforms — with a lab-science origin story and an OMSCS research path.",
  specialty:
    "TypeScript, React, React Native, .NET, Python, and cloud systems — from multi-tenant portals to consumer apps and ML side projects.",
  lookingFor:
    "Happy to talk about collaboration, research-adjacent engineering, or interesting product problems. Reach out anytime.",
  email: "kailee.hamre@gmail.com",
  github: "https://github.com/lee14k",
  githubUsername: "lee14k",
  resumeHref: "/Kailee_Hamre_Resume.pdf",
  roles: [
    { label: "DEVELOPER", color: "pink" },
    { label: "DESIGNER", color: "teal" },
    { label: "CAT PERSON", color: "orange" },
  ] as RoleStackItem[],
  stats: [
    { value: "4+", label: "Years shipping" },
    { value: "OMSCS", label: "Georgia Tech" },
    { value: "MLS→SE", label: "Career pivot" },
    { value: "1", label: "Published paper" },
  ],
  featuredProjectIds: ["pokemon-scanner", "clever-benefits", "visible"],
};
