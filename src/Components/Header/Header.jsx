import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <path
          d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "bell") {
    return (
      <svg {...common}>
        <path
          d="M6.5 9.5a5.5 5.5 0 1 1 11 0v3.2l1.2 2.1a1 1 0 0 1-.87 1.5H5.17a1 1 0 0 1-.87-1.5l1.2-2.1V9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 18a2.5 2.5 0 0 0 5 0"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "profile") {
    return (
      <svg {...common}>
        <path
          d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M5 20a7 7 0 0 1 14 0"
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
  if (name === "theme") {
    return (
      <svg {...common}>
        <path
          d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "logout") {
    return (
      <svg {...common}>
        <path
          d="M14 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M10 12h10M17 7l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "chevron") {
    return (
      <svg {...common}>
        <path
          d="m9 6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}

function Header({ onChangePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            <Icon name="search" />
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
          <Icon name="bell" />
        </button>

        <div className={styles.profileWrap} ref={menuRef}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <div className={styles.avatar} aria-hidden="true">
              NS
            </div>
          </button>

          {menuOpen && (
            <div className={styles.profileMenu}>
              <div className={styles.menuCardTop}>
                <div className={styles.menuAvatar}>NS</div>
                <div className={styles.menuIdentity}>
                  <div className={styles.menuName}>Nisha Sharma</div>
                  <div className={styles.menuEmail}>nisha.demo@example.com</div>
                </div>
              </div>

              <button type="button" className={styles.menuItem}>
                <span className={styles.menuItemLeft}>
                  <Icon name="profile" />
                  Profile
                </span>
              </button>

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => {
                  setMenuOpen(false);
                  onChangePage?.("settings");
                }}
              >
                <span className={styles.menuItemLeft}>
                  <Icon name="settings" />
                  Account settings
                </span>
              </button>

              <button type="button" className={styles.menuItem}>
                <span className={styles.menuItemLeft}>
                  <Icon name="theme" />
                  Theme
                </span>
                <span className={styles.menuItemRight}>
                  <Icon name="chevron" />
                </span>
              </button>

              <div className={styles.menuDivider} />
              <button type="button" className={styles.menuItem}>
                <span className={styles.menuItemLeft}>
                  <Icon name="logout" />
                  Log out
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
