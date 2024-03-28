import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import socket from "../socket";

export default function useFetchConversationList() {
  const { getAccessTokenSilently } = useAuth0();
  const [conversationList, setConversationList] = React.useState([]);
  const [status, setStatus] = React.useState({
    isLoading: false,
    isError: false,
  });
  console.log("ConversationList hook rendered");
  React.useEffect(() => {
    async function getConversations() {
      try {
        setStatus((status) => {
          return { ...status, isLoading: true, isError: false };
        });
        const token = await getAccessTokenSilently();
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/conversations/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        socket.emit("initialConversations", data);
        setStatus((status) => {
          return { ...status, isLoading: false };
        });
        setConversationList(data);
      } catch (e) {
        console.log(e, e.message);
        setStatus((status) => {
          return { ...status, isError: true };
        });
      }
    }
    getConversations();
  }, []);

  return { conversationList, setConversationList, status };
}
