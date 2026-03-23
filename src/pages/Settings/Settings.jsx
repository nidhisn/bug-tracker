import styles from "./Settings.module.css";

function Settings() {
  return (
    <div className={styles.page}>
      <div className={styles.emptyState}>
        <div className={styles.badge}>Account</div>
        <h1 className={styles.title}>Account settings</h1>
        <p className={styles.text}>
          Settings are now accessed from the profile menu in the top-right
          corner.
        </p>
      </div>
    </div>
  );
}

export default Settings;
