import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function SessionPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [session, setSession] = React.useState();

  React.useEffect(() => {
    async function getSession() {
      try {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/session`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        setSession(data);
      } catch (e) {
        console.log(e);
      }
    }
    getSession();
  }, []);

  return <div>{JSON.stringify(session, null, 4)}</div>;
}
