import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.spinner} src="/spinner.svg" />
    </div>
  );
}
