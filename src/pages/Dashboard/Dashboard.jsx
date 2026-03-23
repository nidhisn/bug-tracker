import { useEffect, useMemo, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import StatsCards from "../../components/StatsCards/StatsCards";
import styles from "./Dashboard.module.css";

function linePath(values, w, h, pad) {
  if (!values.length) {
    return "";
  }
  if (values.length === 1) {
    const x = w / 2;
    const y = h / 2;
    return `M ${x} ${y} L ${x} ${y}`;
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

function parseBugDate(bug) {
  const candidates = [
    bug.Created_At,
    bug.createdAt,
    bug.created_at,
    bug.CreatedAt,
    bug.Date,
    bug.Created_On,
    bug.Reported_On,
    bug.timestamp,
  ];

  for (const value of candidates) {
    if (!value) {
      continue;
    }
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function isResolvedStatus(status) {
  const normalized = String(status || "").toLowerCase();
  return normalized === "closed" || normalized === "done";
}

function isPendingStatus(status) {
  return !isResolvedStatus(status);
}

function percentageChange(current, previous) {
  if (previous === 0 && current === 0) {
    return "0%";
  }
  if (previous === 0) {
    return "+100%";
  }

  const delta = ((current - previous) / previous) * 100;
  const rounded = Math.round(delta * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

function getRangeDays(range) {
  if (range === "today") {
    return 1;
  }
  if (range === "last30") {
    return 30;
  }
  return 7;
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function buildDaySeries(days) {
  const today = startOfDay(new Date());
  return Array.from({ length: days }, (_, index) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (days - index - 1));
    return day;
  });
}

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [range, setRange] = useState("last7");

  useEffect(() => {
    fetchBugs().then(setBugs).catch(console.error);
  }, []);

  const dashboardData = useMemo(() => {
    const days = getRangeDays(range);
    const currentDays = buildDaySeries(days);
    const currentStart = currentDays[0];

    const previousEnd = new Date(currentStart);
    previousEnd.setDate(previousEnd.getDate() - 1);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - (days - 1));
    previousStart.setHours(0, 0, 0, 0);

    const severityCounts = { High: 0, Medium: 0, Low: 0 };
    const trendBuckets = currentDays.map((day) => ({
      day: day.toISOString(),
      created: 0,
      resolved: 0,
    }));

    let totalCurrent = 0;
    let totalPrevious = 0;
    let resolvedCurrent = 0;
    let resolvedPrevious = 0;
    let pendingCurrent = 0;
    let pendingPrevious = 0;
    let overdueCurrent = 0;
    let overduePrevious = 0;
    let totalOverall = 0;
    let resolvedOverall = 0;
    let pendingOverall = 0;
    let overdueOverall = 0;

    const now = new Date();

    bugs.forEach((bug) => {
      const createdDate = parseBugDate(bug);
      const priority = String(bug.Priority || "").toLowerCase();
      const status = String(bug.Status || "");
      const isResolved = isResolvedStatus(status);
      const isPending = isPendingStatus(status);

      totalOverall += 1;
      if (isResolved) {
        resolvedOverall += 1;
      }
      if (isPending) {
        pendingOverall += 1;
      }

      if (priority === "high" || priority === "critical") {
        severityCounts.High += 1;
      } else if (priority === "medium") {
        severityCounts.Medium += 1;
      } else {
        severityCounts.Low += 1;
      }

      if (isPending && priority === "critical") {
        overdueOverall += 1;
      }

      if (!createdDate) {
        return;
      }

      const createdDay = startOfDay(createdDate);

      if (createdDay >= currentStart) {
        totalCurrent += 1;
        if (isResolved) {
          resolvedCurrent += 1;
        }
        if (isPending) {
          pendingCurrent += 1;
        }
      } else if (createdDay >= previousStart && createdDay <= previousEnd) {
        totalPrevious += 1;
        if (isResolved) {
          resolvedPrevious += 1;
        }
        if (isPending) {
          pendingPrevious += 1;
        }
      }

      const ageInDays = Math.floor(
        (startOfDay(now).getTime() - createdDay.getTime()) / 86400000,
      );
      const isOverdue = isPending && ageInDays > 7;

      if (isOverdue && createdDay >= currentStart) {
        overdueCurrent += 1;
      } else if (
        isOverdue &&
        createdDay >= previousStart &&
        createdDay <= previousEnd
      ) {
        overduePrevious += 1;
      }

      const trendIndex = currentDays.findIndex(
        (day) => day.getTime() === createdDay.getTime(),
      );
      if (trendIndex >= 0) {
        trendBuckets[trendIndex].created += 1;
        if (isResolved) {
          trendBuckets[trendIndex].resolved += 1;
        }
      }
    });

    return {
      summary: {
        total: totalOverall,
        resolved: resolvedOverall,
        pending: pendingOverall,
        overdue: overdueOverall,
        totalDelta: percentageChange(totalCurrent, totalPrevious),
        resolvedDelta: percentageChange(resolvedCurrent, resolvedPrevious),
        pendingDelta: percentageChange(pendingCurrent, pendingPrevious),
        overdueDelta: percentageChange(overdueCurrent, overduePrevious),
      },
      severityCounts,
      trend: trendBuckets,
    };
  }, [bugs, range]);

  const severityMax = Math.max(
    1,
    ...Object.values(dashboardData.severityCounts),
  );

  const trendNew = dashboardData.trend.map((t) => t.created || 0);
  const trendResolved = dashboardData.trend.map((t) => t.resolved || 0);
  const days = dashboardData.trend.map((t) =>
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

      <StatsCards summary={dashboardData.summary} />

      <div className={styles.grid2}>
        <section className={styles.section}>
          <div className={styles.chartTitleRow}>
            <div className={styles.chartTitle}>Bug Resolution Trend</div>
          </div>
          <div className={styles.chartBox}>
            <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`}>
              {ticks.map((t, index) => (
                <g key={`${t}-${index}`}>
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
                  key={`${d}-${i}`}
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
            {Object.entries(dashboardData.severityCounts).map(
              ([label, value]) => (
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
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
