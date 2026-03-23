import React, { useEffect, useState } from "react";
import styles from "./BugFilter.module.css";

const DEFAULT_FILTERS = {
  module: "",
  priority: "",
  status: "",
  assignedTo: "",
};

const BugFilter = ({ filters: initialFilters = DEFAULT_FILTERS, onApply, onClose }) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  useEffect(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...initialFilters,
    });
  }, [initialFilters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    const resetValues = { ...DEFAULT_FILTERS };
    setFilters(resetValues);
    onApply(resetValues);
    onClose?.();
  };

  const handleApply = () => {
    onApply(filters);
    onClose?.();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filter</h3>

      {/* Module */}
      <div className={styles.field}>
        <label>Module</label>
        <select name="module" value={filters.module} onChange={handleChange}>
          <option value="">All Modules</option>
          <option value="UI">UI</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
        </select>
      </div>

      {/* Priority */}
      <div className={styles.field}>
        <label>Priority</label>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {/* Status */}
      <div className={styles.field}>
        <label>Status</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* Assigned To */}
      <div className={styles.field}>
        <label>Assigned To</label>
        <input
          type="text"
          name="assignedTo"
          placeholder="Enter name..."
          value={filters.assignedTo}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <button className={styles.reset} onClick={handleReset}>
          Reset all
        </button>
        <button className={styles.apply} onClick={handleApply}>
          Apply now
        </button>
      </div>
    </div>
  );
};

export default BugFilter;
