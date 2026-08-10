import { profile } from "../content/profile";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#path", label: "Path" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.side} href="#about">
          About
        </a>
        <a className={styles.brand} href="#top">
          {profile.name.toUpperCase()}
        </a>
        <div className={styles.sideRight}>
          <a href="#contact">Contact</a>
          <a className={styles.resume} href={profile.resumeHref} download>
            Resume ↓
          </a>
        </div>
      </div>
      <nav className={`wrap ${styles.mobile}`} aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
