import { stickers } from "../assets/stickers";
import { lenses } from "../content/lenses";
import styles from "./Lenses.module.css";

export function Lenses() {
  return (
    <section className="section" id="about">
      <div className={`wrap ${styles.layout}`}>
        <div>
          <p className="section__eyebrow">About</p>
          <h2 className="section__title">Three ways to read the work.</h2>
          <p className="section__lede">
            Not a founder/exit scoreboard — a path through labs, products, and platforms.
          </p>
          <ol className={styles.list}>
            {lenses.map((lens) => (
              <li key={lens.id} className={styles.item}>
                <span className={styles.number}>{lens.number}</span>
                <div>
                  <h3>{lens.title}</h3>
                  <p>{lens.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <img
          className={styles.sticker}
          src={stickers.kitty}
          alt=""
          aria-hidden="true"
          width={220}
          height={185}
        />
      </div>
    </section>
  );
}
