import React from "react";
import styles from "./UserCard.module.css";
import UserAvatar from "../UserAvatar";

export default function UserCard({ name, currentUserName, ...rest }) {
  console.log({ name });
  return (
    <div {...rest} className={styles.card}>
      <UserAvatar>{name}</UserAvatar>
      {name === currentUserName ? `${name} (yourself)` : name}
    </div>
  );
}
