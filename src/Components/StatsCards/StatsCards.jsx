import styles from "./StatsCards.module.css";

function StatsCards({ bugs }) {
  const total = bugs.length;
  const open = bugs.filter(
    (b) => String(b.Status || "").toLowerCase() !== "closed",
  ).length;
  const closed = total - open;
  const highPriority = bugs.filter(
    (b) => String(b.Priority || "").toLowerCase() === "high",
  ).length;

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.label}>Total Bugs</div>
        <div className={styles.value}>{total}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Open Bugs</div>
        <div className={styles.value}>{open}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>Closed Bugs</div>
        <div className={styles.value}>{closed}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}>High Priority</div>
        <div className={styles.value}>{highPriority}</div>
        <span className={styles.pill}>Priority = High</span>
      </div>
    </div>
  );
}

export default StatsCards;

