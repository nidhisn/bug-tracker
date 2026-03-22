import { useEffect, useState } from "react";
import { getCounts, getSeverity, getTrend } from "../../services/dashboardApi";
import StatsCards from "../../components/StatsCards/StatsCards";
import styles from "./Dashboard.module.css";

function linePath(values, w, h, pad) {
  if (!values.length) {
    return "";
  }
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
  const [counts, setCounts] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [trend, setTrend] = useState([]);
  const [range, setRange] = useState("last7");

  useEffect(() => {
    getCounts()
      .then((res) => setCounts(res.data))
      .catch(console.error);

    getSeverity()
      .then((res) => setSeverity(res.data))
      .catch(console.error);

    getTrend()
      .then((res) => setTrend(res.data))
      .catch(console.error);
  }, []);

  const severityCounts = {
    High: severity?.high || 0,
    Medium: severity?.medium || 0,
    Low: severity?.low || 0,
  };
  const severityMax = Math.max(1, ...Object.values(severityCounts));

  const trendNew = trend.map((t) => t.created || 0);
  const trendResolved = trend.map((t) => t.resolved || 0);
  const days = trend.map((t) =>
    new Date(t.day).toLocaleDateString("en-US", { weekday: "short" }),
  );
  const w = 720;
  const h = 230;
  const pad = 26;

  const allY = [...trendNew, ...trendResolved];
  const chartMax = allY.length ? Math.max(...allY) : 1;
  const chartMin = allY.length ? Math.min(...allY) : 0;
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const t = tickCount - 1 - i;
    const v =
      chartMin + (t * (chartMax - chartMin)) / Math.max(1, tickCount - 1);
    return Math.round(v);
  });
  const x = (i) =>
    days.length <= 1 ? w / 2 : pad + (i * (w - pad * 2)) / (days.length - 1);
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

      <StatsCards bugs={counts || []} />

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
