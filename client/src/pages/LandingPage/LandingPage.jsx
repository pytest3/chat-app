import React from "react";
import LoginButton from "../../components/LoginButton";
import SignupButton from "../../components/SignupButton";
import styles from "./LandingPage.module.css";
export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <h1>Real-time chat app</h1>
      <div className={styles.actions}>
        <LoginButton>Login</LoginButton>
        <SignupButton>Sign up</SignupButton>
      </div>
    </div>
  );
}
