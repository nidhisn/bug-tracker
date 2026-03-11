import styles from "./BugTable.module.css";

function mapStatus(statusRaw) {
  const status = String(statusRaw || "").toLowerCase();
  if (status === "in progress")
    return { label: "In Progress", key: "inprogress" };
  if (status === "closed" || status === "done")
    return { label: "Done", key: "done" };
  if (status === "open") return { label: "Open", key: "open" };
  return { label: statusRaw || "—", key: "default" };
}

function mapPriority(priorityRaw) {
  const p = String(priorityRaw || "").toLowerCase();
  if (p === "critical") return { label: "Critical", key: "critical" };
  if (p === "high") return { label: "High", key: "high" };
  if (p === "medium") return { label: "Medium", key: "medium" };
  if (p === "low") return { label: "Low", key: "low" };
  return { label: priorityRaw || "—", key: "default" };
}

function BugTable({ bugs }) {
  return (
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
              Loading bugs...
            </td>
          </tr>
        ) : (
          bugs.map((bug, index) => {
            const status = mapStatus(bug.Status);
            const priority = mapPriority(bug.Priority);

            return (
              <tr key={bug.Bug_ID || index}>
                <td className={styles.titleCell}>
                  <div className={styles.issueTitle}>
                    {bug.Title || "Untitled"}
                  </div>
                  <div className={styles.issueKey}>
                    {bug.Bug_ID || `ISS-${index + 1}`}
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
                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status_${status.key}`] || ""
                    }`}
                  >
                    {status.label}
                  </span>
                </td>
                <td>{bug.Assigned_To || "Unassigned"}</td>
                <td>{bug.Reported_By || "—"}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default BugTable;
