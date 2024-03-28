import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "../components/CurrentUserContextProvider";
import useGetSelectedUser from "./useGetSelectedUser";

export default function useFetchServerConversationData(convoId) {
  const { getAccessTokenSilently } = useAuth0();
  const [conversationMetaData, setConversationMetaData] = React.useState();
  const [serverMessages, setServerMessages] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);
  const selectedUser = useGetSelectedUser();

  // fetch db conversation data
  React.useEffect(() => {
    async function getConversationMetaData() {
      const accessToken = await getAccessTokenSilently();
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/conversations/${convoId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();

        setConversationMetaData(data[0]);
        const messageData = data[0].messages;
        setServerMessages(messageData);
      } catch (e) {
        console.log(e.message);
      }
    }
    getConversationMetaData();
  }, [getAccessTokenSilently, convoId]);

  // const serverMessagesWithDetailsWithDetails = React.useMemo(() => {
  //   return serverMessagesWithDetails.map((msg) => {
  //     if (msg.userId === currentUser.dbId) {
  //       return { ...msg, fromSelf: true, toUser: selectedUser.username };
  //     } else {
  //       return { ...msg, fromSelf: false, fromUser: selectedUser.username };
  //     }
  //   });
  // }, [serverMessagesWithDetails, currentUser, selectedUser]);

  const serverMessagesWithDetails = React.useMemo(() => {
    return serverMessages.map((msg) => {
      if (msg.userId === currentUser.dbId) {
        return { ...msg, fromSelf: true, toUser: selectedUser.username };
      } else {
        return { ...msg, fromSelf: false, fromUser: selectedUser.username };
      }
    });
  }, [serverMessages, currentUser, selectedUser]);

  return {
    conversationMetaData,
    serverMessagesWithDetails,
  };
}
