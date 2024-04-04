import React from "react";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import styles from "./PageLayout.module.css";
import { Home, PersonStanding } from "lucide-react";

export default function PageLayout() {
  console.log("PageLayout component rendered");
  return (
    <div className={styles.wrapper}>
      <Outlet />
      <nav className={styles.nav}>
        <Link to="profile">
          <PersonStanding className={styles.icon} />
        </Link>
        <Link to="/login/home">
          <Home className={styles.icon} />
        </Link>
        <LogoutButton />
      </nav>
    </div>
  );
}
