import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useSendUserToServer() {
  const { getAccessTokenSilently, user, isLoading } = useAuth0();
  const [createdUser, setCreatedUser] = React.useState();
  const isSentRef = React.useRef(false);

  React.useEffect(() => {
    async function sendUserToBackend() {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/create`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.username,
              email: user.email,
              auth0_id: user.sub,
            }),
          }
        );

        const [createdUser, isNewlyCreated] = await res.json();
        setCreatedUser(createdUser);
      } catch (error) {
        console.log(error, error.message);
      }
    }

    if (user && !isLoading && !isSentRef.current) {
      isSentRef.current = true;
      sendUserToBackend();
    }
  }, [user, isLoading, getAccessTokenSilently]);

  return createdUser;
}
