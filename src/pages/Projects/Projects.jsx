import styles from "./Projects.module.css";

const PROJECTS = [
  {
    name: "Bug Tracker Web",
    key: "BT-WEB",
    status: "Active",
    owner: "Frontend Team",
    description: "React dashboard for viewing and tracking bugs from Google Sheets.",
  },
  {
    name: "Bug Tracker API",
    key: "BT-API",
    status: "Planned",
    owner: "Backend Team",
    description: "Spring Boot service to create, update and sync bugs with the sheet.",
  },
];

function Projects() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.pageTitle}>Projects</div>
          <p className={styles.pageSubtitle}>
            High-level view of products connected to this bug tracker.
          </p>
        </div>
        <button type="button" className={styles.primaryButton}>
          + New Project
        </button>
      </div>

      <div className={styles.cards}>
        {PROJECTS.map((p) => (
          <div key={p.key} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.projectName}>{p.name}</div>
                <div className={styles.projectKey}>{p.key}</div>
              </div>
              <span className={styles.badge}>{p.status}</span>
            </div>
            <p className={styles.description}>{p.description}</p>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Owner</span>
              <span className={styles.metaValue}>{p.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

