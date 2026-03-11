import { useEffect, useState } from "react";
import { fetchBugs } from "../../services/sheetService";
import Filters from "../../Components/Filters/Filters";
import BugTable from "../../Components/Table/BugTable";
import styles from "./Bugs.module.css";

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

function Bugs() {
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
      <div className={styles.title}>All Bugs</div>
      <Filters bugs={bugs} filters={filters} onChange={setFilters} />
      <BugTable bugs={filteredBugs} />
    </div>
  );
}

export default Bugs;

