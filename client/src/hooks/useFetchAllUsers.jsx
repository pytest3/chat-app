import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useFetchAllUsers() {
  const { getAccessTokenSilently } = useAuth0();
  const [allUsers, setAllUsers] = React.useState([]);
  const [status, setStatus] = React.useState({
    isLoading: false,
    isError: false,
  });
  React.useEffect(() => {
    async function getConversations() {
      try {
        setStatus((status) => {
          return { ...status, isLoading: true, isError: false };
        });
        const token = await getAccessTokenSilently();
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStatus((status) => {
          return { ...status, isLoading: false };
        });
        setAllUsers(data);
      } catch (e) {
        console.log(e, e.message);
        setStatus((status) => {
          return { ...status, isError: true };
        });
      }
    }
    getConversations();
  }, [getAccessTokenSilently]);

  return { allUsers, setAllUsers, status };
}
