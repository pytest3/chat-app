import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton(props) {
  const { loginWithRedirect } = useAuth0();

  async function handleClick() {
    loginWithRedirect({
      appState: {
        returnTo: "/login",
      },
    });
  }

  return <button {...props} onClick={handleClick}></button>;
}
