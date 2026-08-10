import { profile } from "../content/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className={styles.muted}>{profile.location}</p>
        </div>
        <div className={styles.links}>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
