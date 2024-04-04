import { withAuthenticationRequired } from "@auth0/auth0-react";

import { Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

export default function AuthenticationGuard() {
  function wrapper({ children }) {
    return <Outlet>{children}</Outlet>;
  }
  const GuardedWrapper = withAuthenticationRequired(wrapper, {
    onRedirecting: () => <LoadingSpinner />,
  });

  return <GuardedWrapper />;
}
