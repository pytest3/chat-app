import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import useSendUserToServer from "../../hooks/useSendUserToServer";

export const CurrentUserContext = React.createContext();

export default function CurrentUserContextProvider() {
  const { user, isLoading } = useAuth0();

  const createdUser = useSendUserToServer();

  const currentUser = React.useMemo(() => {
    const { email, sub, username } = user;
    return { email, sub, username, dbId: createdUser?.id };
  }, [user, createdUser?.id]);

  if (isLoading || !user || !createdUser) {
    return;
  }

  console.log("current user 3,", user);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Outlet />
    </CurrentUserContext.Provider>
  );
}
