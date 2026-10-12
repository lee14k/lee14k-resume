import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./Sticker.module.css";

type Ink = "pink" | "teal" | "orange" | "lime";

type StickerProps = {
  src: string;
  width: number;
  height: number;
  /** Resting rotation in degrees. Each tap re-sticks it at the opposite angle. */
  tilt: number;
  /** Color of the halftone dot patch printed behind the sticker. */
  dot: Ink;
  /** Sizing from the parent section. */
  className?: string;
};

type Bit = { id: number; dx: number; dy: number; spin: number; ink: Ink; round: boolean };

const BIT_INKS: Ink[] = ["pink", "teal", "orange", "lime"];
const BIT_COUNT = 8;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Sticker({ src, width, height, tilt: restingTilt, dot, className }: StickerProps) {
  const [tilt, setTilt] = useState(restingTilt);
  const [bits, setBits] = useState<Bit[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);
  const nextBitId = useRef(0);

  function restick() {
    const from = tilt;
    const to = -tilt;
    setTilt(to);

    const img = imgRef.current;
    if (!img || prefersReducedMotion()) return;

    img.getAnimations().forEach((animation) => animation.cancel());
    img.animate(
      [
        { transform: `rotate(${from}deg) scale(1)` },
        { transform: `rotate(${from}deg) scale(0.9, 0.84)`, offset: 0.22 },
        { transform: `rotate(${to * 0.4}deg) translateY(-6%) scale(1.07)`, offset: 0.58 },
        { transform: `rotate(${to}deg) scale(1)` },
      ],
      { duration: 600, easing: "cubic-bezier(0.3, 1.2, 0.4, 1)" },
    );

    const reach = img.clientWidth * 0.55;
    const burst = Array.from({ length: BIT_COUNT }, (_, i): Bit => {
      const angle = (i / BIT_COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const distance = reach * (0.85 + Math.random() * 0.45);
      return {
        id: nextBitId.current++,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        spin: Math.random() * 360 - 180,
        ink: BIT_INKS[i % BIT_INKS.length],
        round: i % 3 === 0,
      };
    });
    setBits((current) => [...current, ...burst]);
  }

  function removeBit(id: number) {
    setBits((current) => current.filter((bit) => bit.id !== id));
  }

  return (
    <span className={`${styles.sticker} ${styles[dot]} ${className ?? ""}`}>
      <img
        ref={imgRef}
        className={styles.img}
        src={src}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        draggable={false}
        style={{ "--tilt": `${tilt}deg` } as CSSProperties}
        onClick={restick}
      />
      {bits.map((bit) => (
        <i
          key={bit.id}
          className={`${styles.bit} ${styles[bit.ink]} ${bit.round ? styles.round : ""}`}
          style={
            {
              "--dx": `${bit.dx}px`,
              "--dy": `${bit.dy}px`,
              "--spin": `${bit.spin}deg`,
            } as CSSProperties
          }
          onAnimationEnd={() => removeBit(bit.id)}
        />
      ))}
    </span>
  );
}
