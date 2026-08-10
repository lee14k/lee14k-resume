import { useMemo, useState } from "react";
import { stickers } from "../assets/stickers";
import { projects } from "../content/projects";
import styles from "./Projects.module.css";

export function Projects() {
  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [active, setActive] = useState("All");
  const visible =
    active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <p className="section__eyebrow">Projects · selected</p>
            <h2 className="section__title">Portals, packs, and production systems.</h2>
            <p className="section__lede">
              Multi-tenant insurance, mobile products, enterprise scheduling, and a Pokémon scanning side quest.
            </p>
          </div>
          <img
            className={styles.sticker}
            src={stickers.computer}
            alt=""
            aria-hidden="true"
            width={160}
            height={158}
          />
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter projects">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={active === tag}
              className={active === tag ? styles.filterActive : styles.filter}
              onClick={() => setActive(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.map((project) => (
            <article key={project.id} id={`project-${project.id}`} className={styles.card}>
              <div className={styles.cardTop}>
                {project.year ? <span>{project.year}</span> : <span />}
                {project.featured ? <span className={styles.featured}>Featured</span> : null}
              </div>
              <h3>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.title} ↗
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p>{project.summary}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span className="badge" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
