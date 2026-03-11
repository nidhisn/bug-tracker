import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import BugTable from "../../components/Table/BugTable";
import styles from "./MyBugs.module.css";

// For now, we use a hard-coded developer name.
const CURRENT_DEVELOPER = "Me";

function MyBugs() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const myBugs = bugs.filter(
    (b) => String(b.Assigned_To || "").toLowerCase() === CURRENT_DEVELOPER.toLowerCase(),
  );

  return (
    <div className={styles.page}>
      <div className={styles.title}>My Bugs</div>
      <div className={styles.caption}>
        Showing bugs where Assigned_To equals "{CURRENT_DEVELOPER}". You can later wire
        this to the real logged-in user.
      </div>
      <BugTable bugs={myBugs} />
    </div>
  );
}

export default MyBugs;

