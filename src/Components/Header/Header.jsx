import styles from "./Header.module.css";

function Header({ onOpenCreate }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>BT</div>
        <div className={styles.appText}>
          <div className={styles.appName}>Bug Tracker</div>
          <div className={styles.appSubtitle}>Simple issue dashboard</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <select className={styles.projectsSelect} defaultValue="projects">
          <option value="projects">Projects</option>
          <option value="all">All Projects</option>
        </select>
        <button type="button" className={styles.navLink}>
          Filters
        </button>
        <button type="button" className={styles.navLink}>
          Dashboard
        </button>
        <button type="button" className={styles.navLink}>
          People
        </button>
        <button
          type="button"
          className={styles.createButton}
          onClick={onOpenCreate}
        >
          Create
        </button>
      </nav>

      <div className={styles.right}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search"
        />
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Settings"
        >
          ⚙
        </button>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  );
}

export default Header;

