import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import socket from "../../socket";
import { useParams } from "react-router-dom";
import useGetSelectedUser from "../../hooks/useGetSelectedUser";
import styles from "./NewMessageForm.module.css";
import { Send } from "lucide-react";

export default function NewMessageForm({ messages, setMessages, ...props }) {
  const [text, setText] = React.useState("");
  const { getAccessTokenSilently } = useAuth0();
  const selectedUser = useGetSelectedUser();
  let { convoId } = useParams();
  console.log("NewMessageForm component rendered");

  async function sendMessageToServer(message, convoId) {
    try {
      const accessToken = await getAccessTokenSilently();
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId: convoId,
            text: message,
          }),
        }
      );
      const sentMessage = await res.json();
      console.log("sentMessage", sentMessage);
    } catch (e) {
      console.log(e, e.message);
    }
  }

  function handleInput(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("private conversation", {
      text,
      to: selectedUser.socketId,
      roomId: convoId,
    });
    sendMessageToServer(text, convoId);
    setMessages([
      ...messages,
      {
        toUser: selectedUser.username,
        text,
        fromSelf: true,
        id: crypto.randomUUID(),
      },
    ]);
    setText("");
  }

  return (
    <form {...props} onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="message"></label>
      <input
        type="text"
        name="message"
        id="message"
        value={text}
        onChange={handleInput}
      />
      <button className={styles.sendArrow}>
        <Send />
      </button>
    </form>
  );
}
