import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SocketContext } from "../components/SocketContextProvider/SocketContextProvider";
import { generateConversationId } from "../helpers";

export default function useCreateConversation() {
  const { user } = React.useContext(SocketContext);
  const { getAccessTokenSilently } = useAuth0();
  const [status, setStatus] = React.useState({
    isLoading: false,
    isError: false,
  });

  console.log("useCreateConversation ran, user:", user.sub);

  async function createConversation(selectedPerson) {
    try {
      setStatus({ ...status, isLoading: true, isError: false });
      const token = await getAccessTokenSilently();
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/conversations/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: selectedPerson.username,
            convoName: generateConversationId(selectedPerson.sub, user.sub),
            convoId: generateConversationId(selectedPerson.sub, user.sub),
          }),
        }
      );
      const { convoId } = await res.json();
      // socket.emit("conversation", {
      //   id: convoId,
      //   name: conversationName || participants[0].name,
      //   participants,
      //   to: participantId, // socket id
      // });
      setStatus({ ...status, isLoading: false });
      return convoId;
    } catch (e) {
      console.log(e.message);
      setStatus({ ...status, isError: true });
    }
  }

  return { createConversation, status };
}
