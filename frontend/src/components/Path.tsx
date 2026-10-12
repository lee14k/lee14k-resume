import { stickers } from "../assets/stickers";
import { pathEntries } from "../content/path";
import styles from "./Path.module.css";
import { Sticker } from "./Sticker";

function formatRange(start: string, end?: string) {
  const pretty = (value: string) =>
    value === "present" ? "now" : value.length === 7 ? value : value;
  return end ? `${pretty(start)}–${pretty(end)}` : pretty(start);
}

export function Path() {
  return (
    <section className={`section ${styles.section}`} id="path">
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <p className="section__eyebrow">Path</p>
            <h2 className="section__title">Roles, schools, and turning points.</h2>
            <p className="section__lede">
              A flexible timeline — employment, education, and pivots as first-class entries.
            </p>
          </div>
          <Sticker
            className={styles.sticker}
            src={stickers.globe}
            width={180}
            height={192}
            tilt={-5}
            dot="teal"
          />
        </div>
        <ol className={styles.list}>
          {pathEntries.map((entry) => (
            <li key={entry.id} className={styles.item}>
              <div className={styles.meta}>
                <time>{formatRange(entry.start, entry.end)}</time>
                <span className={styles.kind} data-kind={entry.kind}>
                  {entry.kind}
                </span>
              </div>
              <div>
                <h3>
                  {entry.href ? (
                    <a href={entry.href} target="_blank" rel="noreferrer">
                      {entry.title}
                    </a>
                  ) : (
                    entry.title
                  )}
                  {entry.org ? <span className={styles.org}> · {entry.org}</span> : null}
                </h3>
                <p>{entry.summary}</p>
                {entry.badges?.length ? (
                  <div className={styles.badges}>
                    {entry.badges.map((badge) => (
                      <span className="badge" key={badge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
