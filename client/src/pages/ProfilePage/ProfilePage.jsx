import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Circle } from "lucide-react";
import styles from "./ProfilePage.module.css";
import { CurrentUserContext } from "../../components/CurrentUserContextProvider";

export default function ProfilePage() {
  const { user } = useAuth0();

  return (
    <div>
      <h2 className={styles.header}>Profile Page</h2>
      {/* <div>
        <h3>User sub</h3>
        <span>{user?.sub}</span>
      </div> */}
      <div className={styles.profileInfo}>
        <div>
          <h3>Name</h3>
          <span>{user?.username}</span>
        </div>
        <div>
          <h3>Email</h3>
          <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
}
