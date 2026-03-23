import styles from "./BugTable.module.css";

const STATUS_OPTIONS = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function mapStatus(statusRaw) {
  const status = String(statusRaw || "").toLowerCase();
  if (status === "in progress" || status === "in_progress") {
    return { label: "In Progress", key: "inprogress" };
  }
  if (status === "closed" || status === "done") {
    return { label: "Done", key: "done" };
  }
  if (status === "open") {
    return { label: "Open", key: "open" };
  }
  return { label: statusRaw || "-", key: "default" };
}

function mapPriority(priorityRaw) {
  const p = String(priorityRaw || "").toLowerCase();
  if (p === "critical") return { label: "Critical", key: "critical" };
  if (p === "high") return { label: "High", key: "high" };
  if (p === "medium") return { label: "Medium", key: "medium" };
  if (p === "low") return { label: "Low", key: "low" };
  return { label: priorityRaw || "-", key: "default" };
}

function normalizeStatusValue(statusRaw) {
  const status = String(statusRaw || "").toLowerCase();
  if (status === "in progress" || status === "in_progress") {
    return "IN_PROGRESS";
  }
  if (status === "closed" || status === "done") {
    return "CLOSED";
  }
  if (status === "open") {
    return "OPEN";
  }
  return "OPEN";
}

function BugTable({ bugs, canEditStatus = false, onStatusChange }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles["bug-table"]}>
        <thead>
          <tr>
            <th className={styles.colTitle}>Bug</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Reported By</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length === 0 ? (
            <tr>
              <td colSpan="7" className={styles.emptyCell}>
                No bugs found.
              </td>
            </tr>
          ) : (
            bugs.map((bug, index) => {
              const status = mapStatus(bug.Status);
              const priority = mapPriority(bug.Priority);

              return (
                <tr key={bug.id || bug.Id || bug.Bug_ID || index}>
                  <td className={styles.titleCell}>
                    <div className={styles.issueTitle}>
                      {bug.Title || "Untitled"}
                    </div>
                    <div className={styles.issueKey}>
                      {bug.Bug_ID || bug.id || `ISS-${index + 1}`}
                    </div>
                  </td>
                  <td>{bug.Module || "General"}</td>
                  <td>
                    <span
                      className={`${styles.priorityText} ${
                        styles[`priority_${priority.key}`] || ""
                      }`}
                    >
                      {priority.label}
                    </span>
                  </td>
                  <td>
                    {canEditStatus ? (
                      <select
                        className={styles.statusSelect}
                        value={normalizeStatusValue(bug.Status)}
                        onChange={(e) => onStatusChange?.(bug, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`${styles.statusBadge} ${
                          styles[`status_${status.key}`] || ""
                        }`}
                      >
                        {status.label}
                      </span>
                    )}
                  </td>
                  <td>{bug.Assigned_To || "Unassigned"}</td>
                  <td>{bug.Reported_By || "-"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BugTable;
