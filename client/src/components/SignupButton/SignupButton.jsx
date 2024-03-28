import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignupButton(props) {
  const { loginWithRedirect } = useAuth0();

  async function handleClick() {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  return <button {...props} onClick={handleClick}></button>;
}
