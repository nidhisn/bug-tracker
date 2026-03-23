import { useState } from "react";
import styles from "./CreateProject.module.css";

const INITIAL_FORM = {
  name: "",
  key: "",
  status: "Active",
  owner: "",
  description: "",
};

function CreateProject({ open, onClose, onSave }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSaving, setIsSaving] = useState(false);

  if (!open) {
    return null;
  }

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await onSave({
        name: form.name.trim(),
        key: form.key.trim().toUpperCase(),
        status: form.status,
        owner: form.owner.trim(),
        description: form.description.trim(),
      });

      setForm(INITIAL_FORM);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    onClose();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Create Project</h2>
            <p className={styles.subtitle}>
              Add a new project and show it instantly on the Projects page.
            </p>
          </div>
          <button type="button" className={styles.close} onClick={handleClose}>
            x
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Project Name</label>
            <input
              className={styles.control}
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Bug Tracker Mobile"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Project Key</label>
            <input
              className={styles.control}
              value={form.key}
              onChange={handleChange("key")}
              placeholder="BT-MOB"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.control}
              value={form.status}
              onChange={handleChange("status")}
            >
              <option value="Active">Active</option>
              <option value="Planned">Planned</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Owner</label>
            <input
              className={styles.control}
              value={form.owner}
              onChange={handleChange("owner")}
              placeholder="Frontend Team"
              required
            />
          </div>

          <div className={styles.fieldFull}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Short summary about the project and what the team is building."
              required
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondary}
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primary} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
