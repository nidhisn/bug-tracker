import styles from "./BugTable.module.css";

function BugTable({ bugs }) {
  return (
    <table className={styles["bug-table"]}>
      <thead>
        <tr>
          <th>Bug ID</th>
          <th>Title</th>
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
            <td colSpan="7">Loading bugs...</td>
          </tr>
        ) : (
          bugs.map((bug, index) => (
            <tr key={bug.Bug_ID || index}>
              <td>{bug.Bug_ID}</td>
              <td>{bug.Title}</td>
              <td>{bug.Module}</td>
              <td>{bug.Priority}</td>
              <td>{bug.Status}</td>
              <td>{bug.Assigned_To}</td>
              <td>{bug.Reported_By}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default BugTable;
