import React from "react";
import LoginButton from "../../components/LoginButton";
import SignupButton from "../../components/SignupButton";

export default function LandingPage() {
  return (
    <div>
      <h1>Chat app</h1>
      <img src="./chat-app.jpeg"></img>
      <LoginButton>Login</LoginButton>
      <SignupButton>Sign up</SignupButton>
    </div>
  );
}
