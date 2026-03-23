import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import { updateBugStatus } from "../../api/bugService";
import BugTable from "../../components/Table/BugTable";
import BugFilter from "../../components/BugFilter/BugFilter";
import styles from "./Bugs.module.css";

const CURRENT_DEVELOPER = "Me";
const FILTER_LABELS = {
  module: "Module",
  priority: "Priority",
  status: "Status",
  assignedTo: "Assigned To",
};

function Bugs({ onNewBug, refreshKey = 0 }) {
  const [bugs, setBugs] = useState([]);
  const [activeView, setActiveView] = useState("all");

  // ✅ applied filters (used for filtering table)
  const [appliedFilters, setAppliedFilters] = useState({
    module: "",
    priority: "",
    status: "",
    assignedTo: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const activeFilterEntries = Object.entries(appliedFilters).filter(
    ([, value]) => String(value || "").trim() !== "",
  );

  useEffect(() => {
    fetchBugs().then(setBugs).catch(console.error);
  }, [refreshKey]);

  // ✅ filter logic
  const filteredBugs = bugs.filter((bug) => {
    if (
      appliedFilters.module &&
      String(bug.Module || "").toLowerCase() !==
        appliedFilters.module.toLowerCase()
    ) {
      return false;
    }

    if (
      appliedFilters.priority &&
      String(bug.Priority || "").toLowerCase() !==
        appliedFilters.priority.toLowerCase()
    ) {
      return false;
    }

    if (
      appliedFilters.status &&
      String(bug.Status || "").toLowerCase() !==
        appliedFilters.status.toLowerCase()
    ) {
      return false;
    }

    if (
      appliedFilters.assignedTo &&
      String(bug.Assigned_To || "").toLowerCase() !==
        appliedFilters.assignedTo.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  const myBugs = filteredBugs.filter(
    (bug) =>
      String(bug.Assigned_To || "").toLowerCase() ===
      CURRENT_DEVELOPER.toLowerCase(),
  );

  const visibleBugs = activeView === "my" ? myBugs : filteredBugs;

  const handleStatusChange = async (bug, nextStatus) => {
    const bugId = bug.id || bug.Id || bug.Bug_ID;
    if (!bugId) {
      return;
    }

    const previousStatus = bug.Status;

    setBugs((currentBugs) =>
      currentBugs.map((currentBug) =>
        (currentBug.id || currentBug.Id || currentBug.Bug_ID) === bugId
          ? { ...currentBug, Status: nextStatus }
          : currentBug,
      ),
    );

    try {
      await updateBugStatus(bugId, nextStatus);
    } catch (error) {
      setBugs((currentBugs) =>
        currentBugs.map((currentBug) =>
          (currentBug.id || currentBug.Id || currentBug.Bug_ID) === bugId
            ? { ...currentBug, Status: previousStatus }
            : currentBug,
        ),
      );
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleRemoveFilter = (filterKey) => {
    setAppliedFilters((currentFilters) => ({
      ...currentFilters,
      [filterKey]: "",
    }));
  };

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
            className={styles.secondaryButton}
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Close Filter" : "Filter"}
          </button>

          <button className={styles.primaryButton} onClick={onNewBug}>
            + New Bug
          </button>
        </div>
      </div>

      <div className={styles.tabs} aria-label="Bug views">
        <button
          type="button"
          className={
            activeView === "all" ? styles.tabButtonActive : styles.tabButton
          }
          onClick={() => setActiveView("all")}
        >
          All Bugs
        </button>
        <button
          type="button"
          className={
            activeView === "my" ? styles.tabButtonActive : styles.tabButton
          }
          onClick={() => setActiveView("my")}
        >
          My Bugs
        </button>
      </div>

      {activeView === "my" && (
        <p className={styles.viewHint}>
          You can change status only for bugs assigned to "{CURRENT_DEVELOPER}".
        </p>
      )}

      {activeFilterEntries.length > 0 && (
        <div className={styles.activeFilters} aria-label="Applied filters">
          {activeFilterEntries.map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={styles.filterChip}
              onClick={() => handleRemoveFilter(key)}
            >
              <span className={styles.filterChipText}>
                {FILTER_LABELS[key]}: {value}
              </span>
              <span className={styles.filterChipClose}>x</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.card}>
        {showFilters && (
          <div className={styles.filterOverlay}>
            <BugFilter
              filters={appliedFilters}
              onApply={(filters) => setAppliedFilters(filters)}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        <BugTable
          bugs={visibleBugs}
          canEditStatus={activeView === "my"}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default Bugs;
