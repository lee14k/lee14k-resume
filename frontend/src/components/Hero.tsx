import { stickers } from "../assets/stickers";
import { profile } from "../content/profile";
import styles from "./Hero.module.css";

const colorClass = {
  pink: styles.pink,
  teal: styles.teal,
  orange: styles.orange,
} as const;

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <p className={`${styles.kicker} fade-up`}>
            {profile.location} · shipping fullstack products
          </p>
          <p className={`${styles.intro} fade-up fade-up-delay-1`}>
            Hi, I&apos;m {profile.shortName}, and I&apos;m a
          </p>
          <h1 className={`${styles.roles} fade-up fade-up-delay-2`}>
            {profile.roles.map((role) => (
              <span key={role.label} className={colorClass[role.color]}>
                {role.label}
              </span>
            ))}
          </h1>
          <p className={`${styles.specialty} fade-up fade-up-delay-3`}>{profile.specialty}</p>
          <p className={styles.tagline}>{profile.tagline}</p>
          <div className={styles.actions}>
            <a className="btn btn--pink" href="#contact">
              Get in touch
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
          <dl className={styles.stats}>
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.visual}>
          <img
            className={styles.sticker}
            src={stickers.kaileeThumbs}
            alt=""
            aria-hidden="true"
            width={280}
            height={386}
          />
        </div>
      </div>
    </section>
  );
}
