import styles from "./AddBugForm.module.css";

function AddBugForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // For now just log; real implementation will write to the sheet.
    // eslint-disable-next-line no-console
    console.log("AddBugForm submitted (not wired to backend yet)");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Title</label>
        <input className={styles.input} name="Title" placeholder="Bug title" />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Module</label>
        <input className={styles.input} name="Module" placeholder="Module" />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Priority</label>
        <select className={styles.select} name="Priority" defaultValue="">
          <option value="" disabled>
            Select priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Status</label>
        <select className={styles.select} name="Status" defaultValue="">
          <option value="" disabled>
            Select status
          </option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Assigned To</label>
        <input
          className={styles.input}
          name="Assigned_To"
          placeholder="Developer name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Reported By</label>
        <input
          className={styles.input}
          name="Reported_By"
          placeholder="Tester name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Steps to Reproduce</label>
        <textarea
          className={styles.textarea}
          name="Steps_to_Reproduce"
          placeholder="Step 1, Step 2..."
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Expected Result</label>
        <textarea
          className={styles.textarea}
          name="Expected_Result"
          placeholder="What should happen?"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Actual Result</label>
        <textarea
          className={styles.textarea}
          name="Actual_Result"
          placeholder="What actually happens?"
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          Save (UI only)
        </button>
      </div>

      <div className={styles.note}>
        This form is currently UI-only. Backend calls to write into the Google
        Sheet can be wired later.
      </div>
    </form>
  );
}

export default AddBugForm;
