import styles from "./Filters.module.css";

function uniqueOptions(items, key) {
  const set = new Set(
    items
      .map((i) => (i[key] ? String(i[key]).trim() : ""))
      .filter((v) => v && v.length > 0),
  );
  return Array.from(set).sort();
}

function Filters({ bugs, filters, onChange }) {
  const statusOptions = uniqueOptions(bugs, "Status");
  const priorityOptions = uniqueOptions(bugs, "Priority");
  const assigneeOptions = uniqueOptions(bugs, "Assigned_To");

  const handleChange = (key) => (event) => {
    onChange({ ...filters, [key]: event.target.value });
  };

  return (
    <div className={styles.filters}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search by title or Bug ID..."
        value={filters.search || ""}
        onChange={handleChange("search")}
      />

      <select
        className={styles.select}
        value={filters.status || ""}
        onChange={handleChange("status")}
      >
        <option value="">All Statuses</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.priority || ""}
        onChange={handleChange("priority")}
      >
        <option value="">All Priorities</option>
        {priorityOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.assignee || ""}
        onChange={handleChange("assignee")}
      >
        <option value="">All Assignees</option>
        {assigneeOptions.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;

