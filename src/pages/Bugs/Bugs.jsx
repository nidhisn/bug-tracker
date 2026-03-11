import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import BugTable from "../../components/Table/BugTable";
import styles from "./Bugs.module.css";

function filterByTab(bugs, tab) {
  if (tab === "all") return bugs;
  return bugs.filter((bug) => {
    const status = String(bug.Status || "").toLowerCase();
    if (tab === "open") return status === "open";
    if (tab === "in-progress") return status === "in progress";
    if (tab === "done") return status === "closed" || status === "done";
    return true;
  });
}

function Bugs({ onNewBug }) {
  const [bugs, setBugs] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const filteredBugs = filterByTab(bugs, tab);

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.pageTitle}>Bugs</div>
          <p className={styles.pageSubtitle}>
            Manage and track all project bugs.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryButton}>
            Filter
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onNewBug}
          >
            + New Bug
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        {[
          { id: "all", label: "All" },
          { id: "open", label: "Open" },
          { id: "in-progress", label: "In Progress" },
          { id: "done", label: "Done" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            className={
              tab === t.id ? styles.tabButtonActive : styles.tabButton
            }
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <BugTable bugs={filteredBugs} />
      </div>
    </div>
  );
}

export default Bugs;

