import styles from "./Sidebar.module.css";

function Sidebar({ currentPage, onChangePage }) {
  const makeItem = (key, label) => {
    const isActive = currentPage === key;
    const className = isActive ? styles.navItemActive : styles.navItem;
    return (
      <li key={key} className={className} onClick={() => onChangePage(key)}>
        {label}
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Bug Tracker</div>

      <div className={styles.navSectionTitle}>Pages</div>
      <ul className={styles.navList}>
        {makeItem("dashboard", "Dashboard")}
        {makeItem("bugs", "All Bugs")}
        {makeItem("my-bugs", "My Bugs")}
      </ul>
    </aside>
  );
}

export default Sidebar;

