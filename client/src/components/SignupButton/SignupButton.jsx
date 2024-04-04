import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./SignupButton.module.css";

export default function SignupButton(props) {
  const { loginWithRedirect } = useAuth0();

  async function handleClick() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  return (
    <button {...props} onClick={handleClick} className={styles.button}></button>
  );
}
