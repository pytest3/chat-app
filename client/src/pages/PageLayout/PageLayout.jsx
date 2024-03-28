import React from "react";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import styles from "./PageLayout.module.css";

export default function PageLayout() {
  console.log("PageLayout component rendered");
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="profile">Profile</Link>
        <Link to="/login/home">Home</Link>
        <LogoutButton />
      </nav>
      <Outlet />
    </div>
  );
}
