import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            🔍
          </span>
          <input
            className={styles.search}
            type="search"
            placeholder="Search bugs, projects..."
          />
        </div>
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.iconButton} aria-label="Alerts">
          🔔
        </button>
        <button type="button" className={styles.iconButton} aria-label="Help">
          ?
        </button>

        <div className={styles.user}>
          <div className={styles.avatar} aria-hidden="true">
            U
          </div>
          <div className={styles.userText}>
            <div className={styles.userName}>User</div>
            <div className={styles.userRole}>Developer</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;