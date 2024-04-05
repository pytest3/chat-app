import React from "react";
import styles from "./UserAvatar.module.css";

export default function UserAvatar({ children }) {
  return <div className={styles.userAvatar}>{Array.from(children)[0]}</div>;
}
