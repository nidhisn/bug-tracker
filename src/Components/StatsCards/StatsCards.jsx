import styles from "./StatsCards.module.css";

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "total") {
    return (
      <svg {...common}>
        <path
          d="M6 7h12M6 12h12M6 17h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "resolved") {
    return (
      <svg {...common}>
        <path
          d="M20 7 10 17l-5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "pending") {
    return (
      <svg {...common}>
        <path
          d="M12 8v5l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  if (name === "overdue") {
    return (
      <svg {...common}>
        <path
          d="M12 9v4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 17h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M10.3 4.2a2 2 0 0 1 3.4 0l8.1 13.7A2 2 0 0 1 20.1 21H3.9a2 2 0 0 1-1.7-3.1l8.1-13.7Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}

function StatsCards({ bugs }) {
  const total = bugs.length;
  const pending = bugs.filter(
    (b) => String(b.Status || "").toLowerCase() !== "closed",
  ).length;
  const resolved = total - pending;
  const overdue = bugs.filter(
    (b) => String(b.Priority || "").toLowerCase() === "critical",
  ).length;

  const cards = [
    {
      label: "Total Bugs",
      value: total,
      icon: "total",
      tone: "purple",
      delta: "+12.5%",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: "resolved",
      tone: "green",
      delta: "+18.2%",
    },
    {
      label: "Pending",
      value: pending,
      icon: "pending",
      tone: "amber",
      delta: "-2.4%",
    },
    {
      label: "Overdue",
      value: overdue,
      icon: "overdue",
      tone: "red",
      delta: "+4.1%",
    },
  ];

  return (
    <div className={styles.cards}>
      {cards.map((c) => (
        <div key={c.label} className={styles.card}>
          <div className={styles.cardTop}>
            <div>
              <div className={styles.label}>{c.label}</div>
              <div className={styles.value}>{c.value}</div>
            </div>
            <div className={`${styles.iconBox} ${styles[`tone_${c.tone}`]}`}>
              <Icon name={c.icon} />
            </div>
          </div>
          <div className={styles.deltaRow}>
            <span
              className={
                c.delta.startsWith("-") ? styles.deltaDown : styles.deltaUp
              }
            >
              {c.delta}
            </span>
            <span className={styles.deltaText}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
