import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../content/profile";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          message: String(form.get("message") ?? ""),
          company: String(form.get("company") ?? ""),
        }),
      });
      if (!response.ok) {
        setError(
          response.status === 429
            ? "That’s a lot of messages — try again in a bit."
            : "Something went wrong sending that.",
        );
        setStatus("error");
        return;
      }
      formEl.reset();
      setStatus("sent");
    } catch {
      setError("Couldn’t reach the server.");
      setStatus("error");
    }
  }

  return (
    <section className={`section ${styles.section}`} id="contact">
      <div className="wrap">
        <p className="section__eyebrow">Contact</p>
        <h2 className="section__title">Let’s talk.</h2>
        <p className="section__lede">{profile.lookingFor}</p>

        <div className={styles.grid}>
          {status === "sent" ? (
            <div className={styles.form} role="status">
              <p className={styles.success}>Thanks — your message is on its way. I’ll get back to you soon.</p>
              <button className="btn btn--ghost" type="button" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <label>
                Name
                <input name="name" autoComplete="name" maxLength={100} required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" maxLength={254} required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} maxLength={5000} required />
              </label>
              <label className={styles.honeypot} aria-hidden="true">
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <button className="btn btn--orange" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" ? (
                <p className={styles.note} role="alert">
                  {error} You can email me directly at{" "}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
              ) : (
                <p className={styles.note}>
                  Or email directly: <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
              )}
            </form>
          )}

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
