import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import StatsCards from "../../components/StatsCards/StatsCards";
import styles from "./Dashboard.module.css";

function linePath(values, w, h, pad) {
  const maxY = Math.max(...values);
  const minY = Math.min(...values);
  const x = (i) => pad + (i * (w - pad * 2)) / (values.length - 1);
  const y = (v) =>
    pad + ((maxY - v) * (h - pad * 2)) / Math.max(1, maxY - minY);
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`)
    .join(" ");
}

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [range, setRange] = useState("last7");

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const filteredBugs = bugs;

  const severityCounts = (() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    for (const b of filteredBugs) {
      const p = String(b.Priority || "").toLowerCase();
      if (p === "high") counts.High += 1;
      else if (p === "medium") counts.Medium += 1;
      else if (p === "low") counts.Low += 1;
    }
    return counts;
  })();
  const severityMax = Math.max(1, ...Object.values(severityCounts));

  const trendNew = [12, 18, 15, 21, 28, 17, 10];
  const trendResolved = [8, 11, 20, 18, 24, 15, 8];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const w = 720;
  const h = 230;
  const pad = 26;

  const allY = [...trendNew, ...trendResolved];
  const chartMax = Math.max(...allY);
  const chartMin = Math.min(...allY);
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const t = tickCount - 1 - i;
    const v =
      chartMin + (t * (chartMax - chartMin)) / Math.max(1, tickCount - 1);
    return Math.round(v);
  });
  const x = (i) => pad + (i * (w - pad * 2)) / (days.length - 1);
  const y = (v) =>
    pad + ((chartMax - v) * (h - pad * 2)) / Math.max(1, chartMax - chartMin);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>Bug dashboard</h1>
          <p className={styles.headerSubtitle}>
            Monitor bug volume, resolution trend, and severity at a glance.
          </p>
        </div>

        <div className={styles.headerActions}>
          <select
            className={styles.rangeSelect}
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
          </select>
          <button type="button" className={styles.generateButton}>
            Generate report
          </button>
        </div>
      </div>

      <StatsCards bugs={filteredBugs} />

      <div className={styles.grid2}>
        <section className={styles.section}>
          <div className={styles.chartTitleRow}>
            <div className={styles.chartTitle}>Bug Resolution Trend</div>
          </div>
          <div className={styles.chartBox}>
            <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`}>
              {ticks.map((t) => (
                <g key={t}>
                  <line
                    x1={pad}
                    x2={w - pad}
                    y1={y(t)}
                    y2={y(t)}
                    stroke="#ebecf0"
                    strokeDasharray="3 4"
                  />
                  <text x={6} y={y(t) + 4} fontSize="11" fill="#97a0af">
                    {t}
                  </text>
                </g>
              ))}

              <path
                d={linePath(trendNew, w, h, pad)}
                stroke="#635bff"
                strokeWidth="3"
                fill="none"
              />
              <path
                d={linePath(trendResolved, w, h, pad)}
                stroke="#10b981"
                strokeWidth="3"
                fill="none"
              />

              {days.map((d, i) => (
                <text
                  key={d}
                  x={x(i)}
                  y={h - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#97a0af"
                >
                  {d}
                </text>
              ))}
            </svg>
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.dotPurple} /> New Bugs
            </div>
            <div className={styles.legendItem}>
              <span className={styles.dotGreen} /> Resolved
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.chartTitleRow}>
            <div className={styles.chartTitle}>Bugs by Severity</div>
          </div>
          <div className={styles.barList}>
            {Object.entries(severityCounts).map(([label, value]) => (
              <div key={label} className={styles.barRow}>
                <div className={styles.barLabel}>{label}</div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${Math.round((value / severityMax) * 100)}%`,
                    }}
                  />
                </div>
                <div className={styles.barValue}>{value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
