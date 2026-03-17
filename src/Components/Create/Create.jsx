import { useState } from "react";
import { addBug } from "../../services/sheetService";
import styles from "./Create.module.css";

function Create({ open, onClose }) {
  const priorityOptions = ["Low", "Medium", "High"];
  const statusOptions = ["Open", "In Progress", "Closed"];
  const environmentOptions = ["dev", "qa", "prod"];

  const [form, setForm] = useState({
    Bug_ID: "",
    Title: "",
    Module: "",
    Priority: "",
    Status: "",
    Assigned_To: "",
    Environment: "",
    Build_Version: "",
    Steps_to_Reproduce: "",
    Expected_Result: "",
    Actual_Result: "",
    Reported_By: "",
    Comments: "",
  });

  if (!open) return null;

  const onChange = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBug(form);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>Create Bug</div>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          {/* Bug ID */}
          <div className={styles.field}>
            <label className={styles.label}>Bug ID</label>
            <input
              className={styles.control}
              value={form.Bug_ID}
              onChange={onChange("Bug_ID")}
              placeholder="BG_01"
            />
          </div>

          {/* Module */}
          <div className={styles.field}>
            <label className={styles.label}>Module</label>
            <input
              className={styles.control}
              value={form.Module}
              onChange={onChange("Module")}
              placeholder="Login / Dashboard"
            />
          </div>

          {/* Priority */}
          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <select
              className={styles.control}
              value={form.Priority}
              onChange={onChange("Priority")}
            >
              <option value="">Select</option>
              {priorityOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.control}
              value={form.Status}
              onChange={onChange("Status")}
            >
              <option value="">Select</option>
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Assigned To */}
          <div className={styles.field}>
            <label className={styles.label}>Assigned To</label>
            <input
              className={styles.control}
              value={form.Assigned_To}
              onChange={onChange("Assigned_To")}
              placeholder="Developer"
            />
          </div>

          {/* Environment */}
          <div className={styles.field}>
            <label className={styles.label}>Environment</label>
            <select
              className={styles.control}
              value={form.Environment}
              onChange={onChange("Environment")}
            >
              <option value="">Select</option>
              {environmentOptions.map((env) => (
                <option key={env}>{env}</option>
              ))}
            </select>
          </div>

          {/* Build Version */}
          <div className={styles.field}>
            <label className={styles.label}>Build Version</label>
            <input
              className={styles.control}
              value={form.Build_Version}
              onChange={onChange("Build_Version")}
              placeholder="1.0.0"
            />
          </div>

          {/* Reported By */}
          <div className={styles.field}>
            <label className={styles.label}>Reported By</label>
            <input
              className={styles.control}
              value={form.Reported_By}
              onChange={onChange("Reported_By")}
              placeholder="Tester name"
            />
          </div>

          {/* Title */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.control}
              value={form.Title}
              onChange={onChange("Title")}
              placeholder="Short bug title"
              required
            />
          </div>

          {/* Steps */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>Steps to Reproduce</label>
            <textarea
              className={styles.textarea}
              value={form.Steps_to_Reproduce}
              onChange={onChange("Steps_to_Reproduce")}
            />
          </div>

          {/* Expected */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>Expected Result</label>
            <textarea
              className={styles.textarea}
              value={form.Expected_Result}
              onChange={onChange("Expected_Result")}
            />
          </div>

          {/* Actual */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>Actual Result</label>
            <textarea
              className={styles.textarea}
              value={form.Actual_Result}
              onChange={onChange("Actual_Result")}
            />
          </div>

          {/* Comments */}
          <div className={styles.fieldFull}>
            <label className={styles.label}>Comments</label>
            <textarea
              className={styles.textarea}
              value={form.Comments}
              onChange={onChange("Comments")}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className={styles.primary}>
              Create Bug
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
