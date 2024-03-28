import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";
import socket from "../../socket";
import useFetchConversationList from "../../hooks/useFetchConversationList";

const ConversationList = React.memo(function ConversationList() {
  const { conversationList, setConversationList, status } =
    useFetchConversationList();

  console.log("ConversationList component rendered");

  React.useEffect(() => {
    function handler(convo) {
      setConversationList((conversationList) => [...conversationList, convo]);
    }
    socket.on("conversation", handler);
    return () => socket.off("conversation", handler);
  }, []);

  if (status.isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (status.isError) {
    return <div>Error fetching user conversation list</div>;
  }

  return (
    <div>
      <h2>User Conversations</h2>
      <ul>
        {conversationList.length > 0 ? (
          conversationList.map((i) => {
            return (
              <li key={i.id}>
                <Link to={`/conversation/${i.id}`}>{i.name}</Link>
              </li>
            );
          })
        ) : (
          <div>Start a conversation!</div>
        )}
      </ul>
    </div>
  );
});

export default ConversationList;
