import { useEffect, useMemo, useRef, useState } from "react";
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

type YearBoard = {
  year: number;
  weeks: ContributionDay[][];
  total: number;
  daysWithPush: number;
};

function levelForCount(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

function buildWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (!days.length) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const first = new Date(`${sorted[0].date}T00:00:00Z`);
  const pad = first.getUTCDay();
  const padded: ContributionDay[] = [
    ...Array.from({ length: pad }, (_, i) => ({
      date: `pad-${sorted[0].date}-${i}`,
      count: -1,
    })),
    ...sorted,
  ];
  const result: ContributionDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const chunk = padded.slice(i, i + 7);
    while (chunk.length < 7) {
      chunk.push({ date: `trail-${i}-${chunk.length}`, count: -1 });
    }
    result.push(chunk);
  }
  return result;
}

function buildYearBoards(days: ContributionDay[]): YearBoard[] {
  const byYear = new Map<number, ContributionDay[]>();
  for (const day of days) {
    const year = Number(day.date.slice(0, 4));
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(day);
  }

  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, yearDays]) => {
      const filled = new Map(yearDays.map((d) => [d.date, d.count]));
      const start = new Date(Date.UTC(year, 0, 1));
      const end = new Date(Date.UTC(year, 11, 31));
      const today = new Date();
      const last =
        year === today.getUTCFullYear()
          ? new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
          : end;

      const sequential: ContributionDay[] = [];
      for (let cursor = new Date(start); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
        const iso = cursor.toISOString().slice(0, 10);
        sequential.push({ date: iso, count: filled.get(iso) ?? 0 });
      }

      return {
        year,
        weeks: buildWeeks(sequential),
        total: sequential.reduce((sum, d) => sum + d.count, 0),
        daysWithPush: sequential.filter((d) => d.count > 0).length,
      };
    });
}

function WeekGrid({
  weeks,
  className,
  cellClassName,
  padClassName,
  weekClassName,
}: {
  weeks: ContributionDay[][];
  className: string;
  cellClassName: string;
  padClassName: string;
  weekClassName: string;
}) {
  return (
    <div
      className={className}
      style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
    >
      {weeks.map((week, wi) => (
        <div key={wi} className={weekClassName}>
          {week.map((day) =>
            day.count < 0 ? (
              <span key={day.date} className={padClassName} />
            ) : (
              <span
                key={day.date}
                className={cellClassName}
                data-level={levelForCount(day.count)}
                title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export function CommitGraph() {
  const [data, setData] = useState<ContributionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);

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

  const weeks = useMemo(() => (data ? buildWeeks(data.days) : []), [data]);
  const yearBoards = useMemo(() => (data ? buildYearBoards(data.days) : []), [data]);

  useEffect(() => {
    const node = calendarRef.current;
    if (!node || !weeks.length) return;
    node.scrollLeft = node.scrollWidth;
  }, [weeks]);

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
            <>
              <p className={styles.panelLabel}>All years</p>
              <p className={styles.scrollHint}>Swipe to explore · starts on the latest weeks</p>
              <div className={styles.scroll} ref={calendarRef}>
                <div
                  className={styles.graph}
                  style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--cell))` }}
                  role="img"
                  aria-label={`GitHub contribution calendar for ${data.username}`}
                >
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

              <div className={styles.yearBlock}>
                <p className={styles.panelLabel}>Year by year</p>
                <p className={styles.yearHint}>
                  Same GitHub grid as above — one calendar per year, newest first.
                </p>
                <ul className={styles.yearList}>
                  {yearBoards.map((board) => (
                    <li key={board.year} className={styles.yearRow}>
                      <div className={styles.yearMeta}>
                        <span className={styles.yearLabel}>{board.year}</span>
                        <div className={styles.yearStats}>
                          <strong>{board.total.toLocaleString()}</strong>
                          <span>{board.daysWithPush} days</span>
                        </div>
                      </div>
                      <div
                        className={styles.yearBoard}
                        role="img"
                        aria-label={`${board.year}: ${board.total} contributions across ${board.daysWithPush} active days`}
                      >
                        <WeekGrid
                          weeks={board.weeks}
                          className={styles.yearGraph}
                          weekClassName={styles.yearWeek}
                          cellClassName={styles.yearCell}
                          padClassName={styles.yearPad}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
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
