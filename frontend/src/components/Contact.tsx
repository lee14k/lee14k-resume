import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../content/profile";
import styles from "./Contact.module.css";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio note from ${name || "someone"}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  return (
    <section className={`section ${styles.section}`} id="contact">
      <div className="wrap">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">Let’s talk.</h2>
        <p className="section__lede">{profile.lookingFor}</p>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required />
            </label>
            <button className="btn btn--orange" type="submit">
              Submit
            </button>
            {status === "opened" ? (
              <p className={styles.note}>Opening your email client…</p>
            ) : (
              <p className={styles.note}>
                Or email directly:{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
          </form>

          <aside className={styles.aside}>
            <p>{profile.location} · remote friendly</p>
            <a className="btn" href={profile.resumeHref} download>
              Download resume ↓
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
