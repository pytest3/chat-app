import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function useAllUsers() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    async function getUsers() {
      const accessToken = await getAccessTokenSilently();
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();

        console.log("claire", data);
        setUsers(data);
      } catch (e) {
        console.log(e.message);
      }
    }
    getUsers();
  }, []);

  return users;
}
