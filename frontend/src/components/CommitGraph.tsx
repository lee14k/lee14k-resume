import { useEffect, useMemo, useState } from "react";
import { profile } from "../content/profile";
import styles from "./CommitGraph.module.css";

type ContributionDay = { date: string; count: number };

type ContributionsResponse = {
  username: string;
  days: ContributionDay[];
  total: number;
  daysWithPush: number;
  syncedAt: number;
  years?: number;
};

function levelForCount(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export function CommitGraph() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/contributions");
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.detail ?? `Request failed (${response.status})`);
        }
        const json = (await response.json()) as ContributionsResponse;
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load contributions");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!data?.days.length) return [] as ContributionDay[][];
    const sorted = [...data.days].sort((a, b) => a.date.localeCompare(b.date));
    const first = new Date(`${sorted[0].date}T00:00:00Z`);
    const pad = first.getUTCDay();
    const padded: ContributionDay[] = [
      ...Array.from({ length: pad }, (_, i) => ({
        date: `pad-${i}`,
        count: -1,
      })),
      ...sorted,
    ];
    const result: ContributionDay[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      result.push(padded.slice(i, i + 7));
    }
    return result;
  }, [data]);

  const syncedLabel = data
    ? new Date(data.syncedAt * 1000).toISOString().slice(0, 10)
    : null;

  return (
    <section className={`section ${styles.section}`} id="commits">
      <div className="wrap">
        <p className="section__eyebrow">GitHub · {profile.githubUsername}</p>
        <h2 className="section__title">Commits as a public paper trail.</h2>
        <p className="section__lede">
          Every square is a day of contributions. Real data from GitHub, fetched on the server and
          cached daily.
        </p>

        <div className={styles.meta}>
          <div>
            <strong>{loading ? "—" : (data?.total.toLocaleString() ?? "—")}</strong>
            <span>contributions</span>
          </div>
          <div>
            <strong>{loading ? "—" : (data?.daysWithPush.toLocaleString() ?? "—")}</strong>
            <span>days with a push</span>
          </div>
        </div>

        <div className={styles.panel}>
          {loading && <p className={styles.status}>Loading contribution graph…</p>}
          {error && (
            <p className={styles.status}>
              Couldn’t load live contributions ({error}). Start the API with a{" "}
              <code>GITHUB_TOKEN</code> to populate this graph.
            </p>
          )}
          {!loading && !error && data && (
            <div className={styles.scroll}>
              <div className={styles.graph} style={{ gridTemplateColumns: `repeat(${weeks.length}, 11px)` }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className={styles.week}>
                    {week.map((day) =>
                      day.count < 0 ? (
                        <span key={day.date} className={styles.cellPad} />
                      ) : (
                        <span
                          key={day.date}
                          className={styles.cell}
                          data-level={levelForCount(day.count)}
                          title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className={styles.footnote}>
          {syncedLabel
            ? `Last synced ${syncedLabel}.`
            : "Sync pending."}{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/{profile.githubUsername}
          </a>
        </p>
      </div>
    </section>
  );
}
