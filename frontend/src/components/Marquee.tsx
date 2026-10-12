import { useState } from "react";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  text: string;
  tone?: "pinkLime" | "orangeTeal";
};

/** Two strips of tape crossing at opposite angles, running in opposite directions. Tap a strip to pause it. */
export function Marquee({ text, tone = "pinkLime" }: MarqueeProps) {
  const [paused, setPaused] = useState([false, false]);
  const line = `${text} · `.repeat(8);

  function toggle(band: number) {
    setPaused((current) => current.map((value, i) => (i === band ? !value : value)));
  }

  return (
    <div className={`${styles.marquee} ${styles[tone]}`} aria-hidden="true">
      {paused.map((isPaused, band) => (
        <div
          key={band}
          className={`${styles.band} ${isPaused ? styles.paused : ""}`}
          onClick={() => toggle(band)}
        >
          <div className={styles.track}>
            <span>{line}</span>
            <span>{line}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
