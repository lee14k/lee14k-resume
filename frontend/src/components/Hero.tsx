import type { CSSProperties, MouseEvent } from "react";
import { stickers } from "../assets/stickers";
import { profile } from "../content/profile";
import styles from "./Hero.module.css";
import { Sticker } from "./Sticker";

const colorClass = {
  pink: styles.pink,
  teal: styles.teal,
  orange: styles.orange,
} as const;

/** Tap the headline to run the print-in again (no-op under reduced motion: no animations exist). */
function reprint(event: MouseEvent<HTMLHeadingElement>) {
  const heading = event.currentTarget;
  for (const animation of heading.getAnimations({ subtree: true })) {
    if (animation.effect instanceof KeyframeEffect && animation.effect.target !== heading) {
      animation.currentTime = 0;
      animation.play();
    }
  }
}

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
          <h1 className={`${styles.roles} fade-up fade-up-delay-2`} onClick={reprint}>
            {profile.roles.map((role, i) => (
              <span
                key={role.label}
                className={`${styles.role} ${colorClass[role.color]}`}
                data-text={role.label}
                style={{ "--n": i } as CSSProperties}
              >
                <span className={styles.ink}>{role.label}</span>
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
          <Sticker
            className={styles.sticker}
            src={stickers.kaileeThumbs}
            width={280}
            height={406}
            tilt={-3}
            dot="lime"
          />
        </div>
      </div>
    </section>
  );
}
