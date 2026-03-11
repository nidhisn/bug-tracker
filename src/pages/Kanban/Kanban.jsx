import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import styles from "./Kanban.module.css";

function groupByStatus(bugs) {
  const columns = {
    backlog: [],
    inProgress: [],
    done: [],
  };

  bugs.forEach((bug) => {
    const status = String(bug.Status || "").toLowerCase();
    if (status === "in progress") {
      columns.inProgress.push(bug);
    } else if (status === "closed" || status === "done") {
      columns.done.push(bug);
    } else {
      columns.backlog.push(bug);
    }
  });

  return columns;
}

function Kanban() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const columns = groupByStatus(bugs);

  const renderCard = (bug, index) => {
    const priority = bug.Priority || "Unspecified";
    const assignee = bug.Assigned_To || "Unassigned";

    return (
      <div key={bug.Bug_ID || index} className={styles.card}>
        <div className={styles.cardTitle}>{bug.Title || "Untitled bug"}</div>
        <div className={styles.cardMetaRow}>
          <span className={styles.cardKey}>{bug.Bug_ID || "ISS-" + (index + 1)}</span>
          <span className={styles.priority}>{priority}</span>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.module}>{bug.Module || "General"}</span>
          <span className={styles.assignee}>{assignee}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.pageTitle}>Kanban Board</div>
          <p className={styles.pageSubtitle}>
            Visual overview of bugs by status.
          </p>
        </div>
      </div>

      <div className={styles.board}>
        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>Backlog / Open</span>
            <span className={styles.columnCount}>{columns.backlog.length}</span>
          </div>
          <div className={styles.columnBody}>
            {columns.backlog.map(renderCard)}
          </div>
        </section>

        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>In Progress</span>
            <span className={styles.columnCount}>{columns.inProgress.length}</span>
          </div>
          <div className={styles.columnBody}>
            {columns.inProgress.map(renderCard)}
          </div>
        </section>

        <section className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>Done</span>
            <span className={styles.columnCount}>{columns.done.length}</span>
          </div>
          <div className={styles.columnBody}>
            {columns.done.map(renderCard)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Kanban;

