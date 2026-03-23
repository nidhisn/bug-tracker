import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import styles from "./Kanban.module.css";

const BOARD_COLUMNS = [
  { key: "todo", title: "To-Do", tone: "todo" },
  { key: "inProgress", title: "In Progress", tone: "progress" },
  { key: "review", title: "In Review", tone: "review" },
  { key: "done", title: "Completed", tone: "done" },
];

function groupByStatus(bugs) {
  const columns = {
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  };

  bugs.forEach((bug) => {
    const status = String(bug.Status || "").toLowerCase();
    if (status === "in progress" || status === "in_progress") {
      columns.inProgress.push(bug);
    } else if (status === "in review" || status === "review") {
      columns.review.push(bug);
    } else if (status === "closed" || status === "done") {
      columns.done.push(bug);
    } else {
      columns.todo.push(bug);
    }
  });

  return columns;
}

function getPriorityTone(priorityRaw) {
  const priority = String(priorityRaw || "").toLowerCase();
  if (priority === "high" || priority === "critical") {
    return "high";
  }
  if (priority === "medium") {
    return "medium";
  }
  return "low";
}

function getProgress(statusRaw) {
  const status = String(statusRaw || "").toLowerCase();
  if (status === "closed" || status === "done") {
    return 100;
  }
  if (status === "in review" || status === "review") {
    return 76;
  }
  if (status === "in progress" || status === "in_progress") {
    return 48;
  }
  return 8;
}

function getCardSummary(bug) {
  return (
    bug.Actual_Result ||
    bug.Expected_Result ||
    bug.Steps_to_Reproduce ||
    "Keep this bug moving with clear ownership and the next step documented."
  );
}

function getAvatarSeeds(bug) {
  return [bug.Assigned_To, bug.Reported_By, bug.Module]
    .filter(Boolean)
    .slice(0, 3);
}

function getInitials(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function icon(name) {
  if (name === "board") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5h6v6H4zM14 5h6v4h-6zM14 13h6v6h-6zM4 15h6v4H4z" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (name === "list") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m13 3-2 6H6l5 4-2 8 7-9h4l-5-4 2-5Z" />
      </svg>
    );
  }
  if (name === "link") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13M14 11a5 5 0 0 1 0 7l-1.5 1.5a5 5 0 0 1-7-7L7 11" />
      </svg>
    );
  }
  if (name === "filter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h10M18 7h2M10 17H4M20 17h-6M14 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM8 17a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
      </svg>
    );
  }
  if (name === "download") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v10M8 10l4 4 4-4M5 19h14" />
      </svg>
    );
  }
  if (name === "plus") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  }
  if (name === "menu") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12h.01M12 12h.01M18 12h.01" />
      </svg>
    );
  }
  if (name === "message") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3 1.2-4.2A3 3 0 0 1 4 15V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
      </svg>
    );
  }
  if (name === "attachment") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m14 7-5.2 5.2a3 3 0 1 0 4.2 4.2L18 11.4a5 5 0 0 0-7.1-7.1L5.7 9.5" />
      </svg>
    );
  }
  if (name === "status") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 6v6l4 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      </svg>
    );
  }
  return null;
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
    const priority = bug.Priority || "Low";
    const module = bug.Module || "General";
    const progress = getProgress(bug.Status);
    const avatarSeeds = getAvatarSeeds(bug);
    const attachmentCount = bug.Expected_Result ? 1 : 0;
    const commentCount = String(bug.Steps_to_Reproduce || "").trim() ? 2 : 0;

    return (
      <article key={bug.Bug_ID || index} className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.pillRow}>
            <span
              className={`${styles.tag} ${styles[`priority_${getPriorityTone(priority)}`]}`}
            >
              {priority}
            </span>
            <span className={`${styles.tag} ${styles.moduleTag}`}>{module}</span>
          </div>
          <button type="button" className={styles.iconGhost}>
            {icon("menu")}
          </button>
        </div>

        <h3 className={styles.cardTitle}>{bug.Title || "Untitled bug"}</h3>
        <p className={styles.cardSummary}>{getCardSummary(bug)}</p>

        <div className={styles.progressLabelRow}>
          <span className={styles.progressLabel}>
            {icon("status")} Progress
          </span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.avatarGroup}>
            {avatarSeeds.length > 0 ? (
              avatarSeeds.map((seed, avatarIndex) => (
                <span
                  key={`${seed}-${avatarIndex}`}
                  className={`${styles.avatar} ${styles[`avatar_${avatarIndex + 1}`]}`}
                  title={seed}
                >
                  {getInitials(seed)}
                </span>
              ))
            ) : (
              <span className={`${styles.avatar} ${styles.avatar_1}`}>U</span>
            )}
          </div>

          <div className={styles.metrics}>
            <span className={styles.metric}>
              {icon("attachment")} {attachmentCount}
            </span>
            <span className={styles.metric}>
              {icon("message")} {commentCount}
            </span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.surface}>
        <div className={styles.toolbar}>
          <div className={styles.viewTabs}>
            <div className={styles.viewTabActive}>{icon("board")} Kanban</div>
          </div>
        </div>

        <div className={styles.board}>
          {BOARD_COLUMNS.map((column) => (
            <section key={column.key} className={styles.column}>
              <div className={styles.columnHeader}>
                <div className={styles.columnHeading}>
                  <span
                    className={`${styles.columnAccent} ${styles[`accent_${column.tone}`]}`}
                  />
                  <span className={styles.columnTitle}>{column.title}</span>
                  <span className={styles.columnCount}>
                    {columns[column.key].length}
                  </span>
                </div>
                <button type="button" className={styles.columnAdd}>
                  {icon("plus")}
                </button>
              </div>

              <div className={styles.columnBody}>
                {columns[column.key].map(renderCard)}
                <button type="button" className={styles.addTask}>
                  {icon("plus")} Add Task
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Kanban;
