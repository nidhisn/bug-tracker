import styles from "./Team.module.css";

const MEMBERS = [
  {
    name: "Alex Morgan",
    role: "Product Manager",
    initials: "AM",
    focus: "Prioritises bugs and clarifies requirements.",
  },
  {
    name: "Sarah Lee",
    role: "QA Engineer",
    initials: "SL",
    focus: "Finds bugs, maintains the Google Sheet, and verifies fixes.",
  },
  {
    name: "Mike Tan",
    role: "Backend Developer",
    initials: "MT",
    focus: "Works on APIs and data sync for bug tracking.",
  },
  {
    name: "You",
    role: "Frontend Developer",
    initials: "YO",
    focus: "Builds this React dashboard and improves UX.",
  },
];

function Team() {
  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.pageTitle}>Team</div>
          <p className={styles.pageSubtitle}>
            People who use this bug tracker day to day.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {MEMBERS.map((m) => (
          <div key={m.name} className={styles.row}>
            <div className={styles.person}>
              <div className={styles.avatar}>{m.initials}</div>
              <div className={styles.personText}>
                <div className={styles.name}>{m.name}</div>
                <div className={styles.role}>{m.role}</div>
              </div>
            </div>
            <div className={styles.focus}>{m.focus}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;

