import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import StatsCards from "../../Components/StatsCards/StatsCards";
import Filters from "../../Components/Filters/Filters";
import BugTable from "../../Components/Table/BugTable";
import AddBugForm from "../../Components/AddBugForm/AddBugForm";
import styles from "./Dashboard.module.css";

function applyFilters(bugs, filters) {
  return bugs.filter((bug) => {
    const search = (filters.search || "").toLowerCase();
    if (search) {
      const haystack = `${bug.Bug_ID || ""} ${bug.Title || ""}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }

    if (filters.status && String(bug.Status || "") !== filters.status) {
      return false;
    }
    if (filters.priority && String(bug.Priority || "") !== filters.priority) {
      return false;
    }
    if (filters.assignee && String(bug.Assigned_To || "") !== filters.assignee) {
      return false;
    }
    return true;
  });
}

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchBugs()
      .then(setBugs)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const filteredBugs = applyFilters(bugs, filters);

  return (
    <div className={styles.page}>
      <StatsCards bugs={filteredBugs} />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Bugs</div>
          <div className={styles.sectionCaption}>
            Filter and explore the latest issues.
          </div>
        </div>
        <Filters bugs={bugs} filters={filters} onChange={setFilters} />
        <BugTable bugs={filteredBugs} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Quick Add (UI only)</div>
          <div className={styles.sectionCaption}>
            Design of the add form; backend wiring comes next.
          </div>
        </div>
        <AddBugForm />
      </section>
    </div>
  );
}

export default Dashboard;

