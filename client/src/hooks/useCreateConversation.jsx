import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { generateConversationId } from "../helpers";
import { CurrentUserContext } from "../components/CurrentUserContextProvider";

export default function useCreateConversation() {
  const currentUser = React.useContext(CurrentUserContext);
  const { getAccessTokenSilently } = useAuth0();
  const [status, setStatus] = React.useState({
    isLoading: false,
    isError: false,
  });

  console.log("useCreateConversation ran");

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
            convoName: generateConversationId(
              selectedPerson.sub,
              currentUser.sub
            ),
            convoId: generateConversationId(
              selectedPerson.sub,
              currentUser.sub
            ),
          }),
        }
      );
      const { convoId } = await res.json();
      setStatus({ ...status, isLoading: false });
      return convoId;
    } catch (e) {
      console.log(e.message);
      setStatus({ ...status, isError: true });
    }
  }

  return { createConversation, status };
}
