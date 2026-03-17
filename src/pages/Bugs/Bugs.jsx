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
  const [filters, setFilters] = useState({
    search: "",
    priority: "",
    assignee: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const afterTab = filterByTab(bugs, tab);

  const filteredBugs = afterTab.filter((bug) => {
    const search = filters.search.trim().toLowerCase();
    if (search) {
      const haystack = `${bug.Bug_ID || ""} ${bug.Title || ""}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    if (filters.priority) {
      if (String(bug.Priority || "").toLowerCase() !== filters.priority)
        return false;
    }

    if (filters.assignee) {
      if (String(bug.Assigned_To || "").toLowerCase() !== filters.assignee)
        return false;
    }

    return true;
  });

  const priorities = Array.from(
    new Set(
      bugs
        .map((b) => (b.Priority ? String(b.Priority).trim() : ""))
        .filter(Boolean),
    ),
  );
  const assignees = Array.from(
    new Set(
      bugs
        .map((b) => (b.Assigned_To ? String(b.Assigned_To).trim() : ""))
        .filter(Boolean),
    ),
  );

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
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setShowFilters((v) => !v)}
          >
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
        {showFilters && (
          <div className={styles.filtersRow}>
            <input
              type="text"
              className={styles.filterSearch}
              placeholder="Search by title or ID..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
            />

            <select
              className={styles.filterSelect}
              value={filters.priority}
              onChange={(e) =>
                setFilters((f) => ({ ...f, priority: e.target.value }))
              }
            >
              <option value="">All priorities</option>
              {priorities.map((p) => (
                <option key={p} value={p.toLowerCase()}>
                  {p}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={filters.assignee}
              onChange={(e) =>
                setFilters((f) => ({ ...f, assignee: e.target.value }))
              }
            >
              <option value="">All assignees</option>
              {assignees.map((a) => (
                <option key={a} value={a.toLowerCase()}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        )}

        <BugTable bugs={filteredBugs} />
      </div>
    </div>
  );
}

export default Bugs;

