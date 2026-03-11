import styles from "./Sidebar.module.css";

function Icon({ name, className }) {
  const common = {
    className,
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "dashboard") {
    return (
      <svg {...common}>
        <path
          d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "issues") {
    return (
      <svg {...common}>
        <path
          d="M7 7h10M7 12h10M7 17h10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M4.5 7h.01M4.5 12h.01M4.5 17h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "kanban") {
    return (
      <svg {...common}>
        <path
          d="M5 5h14v14H5V5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 8v8M15 8v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "projects") {
    return (
      <svg {...common}>
        <path
          d="M5 19V9M12 19V5M19 19v-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "team") {
    return (
      <svg {...common}>
        <path
          d="M16 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M4 20a7 7 0 0 1 16 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "settings") {
    return (
      <svg {...common}>
        <path
          d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M19.4 15a8.2 8.2 0 0 0 .1-6l-2 1.2a6.1 6.1 0 0 0-1.3-1.3l1.2-2a8.2 8.2 0 0 0-6-.1l.2 2.3c-.5.1-1 .3-1.4.6L8.2 8.6l-2-1.2a8.2 8.2 0 0 0-.1 6l2.3-.2c.1.5.3 1 .6 1.4L6.6 15.8l-1.2 2a8.2 8.2 0 0 0 6 .1l-.2-2.3c.5-.1 1-.3 1.4-.6l1.8 1.7 2 1.2a8.2 8.2 0 0 0 3-3Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}

function Sidebar({ currentPage, onChangePage }) {
  const makeItem = (key, label, icon, enabled = true) => {
    const isActive = currentPage === key;
    const className = isActive ? styles.navItemActive : styles.navItem;
    return (
      <li
        key={key}
        className={enabled ? className : styles.navItemDisabled}
        onClick={() => enabled && onChangePage(key)}
      >
        <Icon name={icon} className={styles.icon} />
        <span>{label}</span>
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>BT</div>
        <div className={styles.brandName}>BugTracker</div>
      </div>

      <ul className={styles.navList}>
        {makeItem("dashboard", "Dashboard", "dashboard")}
        {makeItem("bugs", "Bugs", "issues")}
        {makeItem("kanban", "Kanban Board", "kanban")}
        {makeItem("projects", "Projects", "projects")}
        {makeItem("team", "Team", "team")}
        {makeItem("settings", "Settings", "settings", false)}
      </ul>
    </aside>
  );
}

export default Sidebar;
