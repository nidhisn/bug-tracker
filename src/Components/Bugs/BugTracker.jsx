import { useEffect, useState } from "react";
import BugTable from "../Table/BugTable";
import styles from "./BugTracker.module.css";

function BugTracker() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1Ud2vm97__ZEqmTQvdYzCOTNj3kGgjoxzJsZucSALThQ/Bugs",
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        setBugs(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles["bug-tracker-page"]}>
      <header className={styles["bug-tracker-header"]}>
        <h1 className={styles["bug-tracker-title"]}>Bug Tracker</h1>
        <p className={styles["bug-tracker-subtitle"]}>
          Read-only view of issues reported in the QA Google Sheet.
        </p>
      </header>

      <main className={styles["bug-tracker-main"]}>
        <section className={styles["bug-tracker-card"]}>
          <div className={styles["bug-tracker-card-header"]}>
            <h2 className={styles["bug-tracker-card-title"]}>Reported Bugs</h2>
            <span className={styles["bug-count-badge"]}>
              {bugs.length === 0 ? "Loading..." : `${bugs.length} bugs`}
            </span>
          </div>
          <div className={styles["bug-table-wrapper"]}>
            <BugTable bugs={bugs} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default BugTracker;
