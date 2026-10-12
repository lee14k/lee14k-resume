import { useState } from "react";
import { stickers } from "../assets/stickers";
import { projects } from "../content/projects";
import styles from "./Projects.module.css";
import { Sticker } from "./Sticker";

const filters = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "side", label: "Side" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function Projects() {
  const [active, setActive] = useState<FilterId>("all");
  const visible =
    active === "all" ? projects : projects.filter((p) => p.kind === active);

  return (
    <section className={`section ${styles.section}`} id="work">
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <p className="section__eyebrow">Projects · selected</p>
            <h2 className="section__title">Portals, packs, and production systems.</h2>
            <p className="section__lede">
              Multi-tenant insurance, mobile products, enterprise scheduling, and a Pokémon scanning
              side quest.
            </p>
          </div>
          <Sticker
            className={styles.sticker}
            src={stickers.computer}
            width={140}
            height={146}
            tilt={4}
            dot="orange"
          />
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={active === filter.id}
              className={active === filter.id ? styles.filterActive : styles.filter}
              onClick={() => setActive(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className={styles.list}>
          {visible.map((project) => (
            <article key={project.id} id={`project-${project.id}`} className={styles.item}>
              <div className={styles.meta}>
                {project.year ? <span>{project.year}</span> : null}
                {project.featured ? <span className={styles.featured}>Featured</span> : null}
              </div>
              <div className={styles.body}>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
