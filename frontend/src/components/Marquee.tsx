import styles from "./Marquee.module.css";

type MarqueeProps = {
  text: string;
  tone?: "lime" | "pink" | "white";
};

export function Marquee({ text, tone = "lime" }: MarqueeProps) {
  const chunk = `${text} · `;
  const line = chunk.repeat(12);

  return (
    <div className={`${styles.marquee} ${styles[tone]}`} aria-hidden="true">
      <div className={styles.track}>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}
