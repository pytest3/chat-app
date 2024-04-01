import React from "react";
import { Link, useParams } from "react-router-dom";
import NewMessageForm from "../NewMessageForm";
import LoadingSpinner from "../LoadingSpinner";
import useFetchServerConversationData from "../../hooks/useFetchServerConversationData";
import socket from "../../socket";
import useGetSelectedUser from "../../hooks/useGetSelectedUser";
import { SocketContext } from "../SocketContextProvider/SocketContextProvider";
import { ChevronLeft } from "lucide-react";
import styles from "./conversation.module.css";
import { CurrentUserContext } from "../CurrentUserContextProvider";

const Conversation = React.memo(function Conversation() {
  let { convoId } = useParams();
  const { serverMessagesWithDetails } = useFetchServerConversationData(convoId);
  const [messages, setMessages] = React.useState([]);
  const selectedUser = useGetSelectedUser();
  const { onlineUsers } = React.useContext(SocketContext);
  const currentUser = React.useContext(CurrentUserContext);

  const shownMessages = messages.map((message) => {
    if (message.fromSelf === true && message.toUser === selectedUser.username)
      return (
        <div
          key={crypto.randomUUID()}
          style={{ textAlign: "right" }}
          className="message-ribbon"
        >
          {message.text}
        </div>
      );
    if (
      message.fromSelf === false &&
      message.fromUser === selectedUser.username &&
      message.fromUser !== currentUser.username
    )
      return (
        <div
          key={crypto.randomUUID()}
          style={{ textAlign: "left" }}
          className="message-ribbon"
        >
          {message.text}
        </div>
      );
  });

  // register 'on private conversation' socketIO handler
  React.useEffect(() => {
    function handler({ text, from }) {
      const fromUserName = onlineUsers.find(
        (i) => i.socketId === from
      ).username;
      const newMessage = {
        fromUser: fromUserName,
        text,
        fromSelf: false,
      };
      setMessages((currMessages) => [...currMessages, newMessage]);
    }
    socket.on("private conversation", handler);
    return () => socket.off("private conversation", handler);
  }, [onlineUsers, serverMessagesWithDetails]);

  // load server messages into messages array upon connection
  React.useEffect(() => {
    if (!serverMessagesWithDetails) return;
    setMessages(serverMessagesWithDetails);
  }, [serverMessagesWithDetails]);

  // Store room id in local storage
  React.useEffect(() => {
    function handler(roomId) {
      window.localStorage.setItem("roomId", roomId);
    }
    socket.on("roomId", handler);
    return () => socket.off("roomId", handler);
  }, []);

  if (
    !serverMessagesWithDetails ||
    !selectedUser ||
    !onlineUsers ||
    !currentUser
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/login/home">
          <ChevronLeft />
        </Link>
        <h3>{selectedUser.username}</h3>
      </nav>
      {/* <div>{JSON.stringify(messages, null, 4)}</div> */}
      <NewMessageForm messages={messages} setMessages={setMessages} />
      {shownMessages}
    </div>
  );
});

export default Conversation;
