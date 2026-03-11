import { useMemo, useState } from "react";
import styles from "./Create.module.css";

function Create({ open, onClose }) {
  const projectOptions = useMemo(() => ["Bug Tracker"], []);
  const workTypeOptions = useMemo(() => ["Bug", "Task", "Story"], []);
  const statusOptions = useMemo(() => ["Open", "In Progress", "Closed"], []);

  const [form, setForm] = useState({
    project: "",
    workType: "",
    status: "",
    summary: "",
    description: "",
    assignee: "",
  });

  if (!open) return null;

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // UI-only for now (no sheet write yet)
    // eslint-disable-next-line no-console
    console.log("Create issue:", form);
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>Create</div>
          <button type="button" className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>
              Project <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.control}
              value={form.project}
              onChange={onChange("project")}
              required
            >
              <option value="" disabled>
                Select a project
              </option>
              {projectOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Work type <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.control}
              value={form.workType}
              onChange={onChange("workType")}
              required
            >
              <option value="" disabled>
                Select work type
              </option>
              {workTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Status <span className={styles.req}>*</span>
            </label>
            <select
              className={styles.control}
              value={form.status}
              onChange={onChange("status")}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldFull}>
            <label className={styles.label}>
              Summary <span className={styles.req}>*</span>
            </label>
            <input
              className={styles.control}
              value={form.summary}
              onChange={onChange("summary")}
              placeholder="Short summary of the issue"
              required
            />
          </div>

          <div className={styles.fieldFull}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={onChange("description")}
              placeholder="Add details, steps to reproduce, expected vs actual..."
            />
          </div>

          <div className={styles.fieldFull}>
            <label className={styles.label}>Assignee</label>
            <input
              className={styles.control}
              value={form.assignee}
              onChange={onChange("assignee")}
              placeholder="Developer name"
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.primary}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

